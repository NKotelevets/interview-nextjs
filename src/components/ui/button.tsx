import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SpinnerIcon } from "./icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  isLoading,
  loadingText = "Loading...",
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "btn-shine bg-accent hover:bg-accent/90 text-white",
    secondary: "bg-surface-hover hover:bg-border text-foreground border border-border",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`w-full py-3.5 px-4 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <SpinnerIcon className="w-5 h-5 spinner" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

