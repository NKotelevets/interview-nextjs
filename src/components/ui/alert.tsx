import type { ReactNode } from "react";
import { AlertIcon, CheckIcon } from "./icons";

interface AlertProps {
  children: ReactNode;
  variant?: "error" | "success";
}

export function Alert({ children, variant = "error" }: AlertProps) {
  const variants = {
    error: {
      container: "bg-error/10 border-error/20 text-error",
      icon: <AlertIcon className="w-5 h-5 flex-shrink-0" />,
    },
    success: {
      container: "bg-success/10 border-success/20 text-success",
      icon: <CheckIcon className="w-5 h-5 flex-shrink-0" />,
    },
  };

  const { container, icon } = variants[variant];

  return (
    <div className={`flex items-center gap-2 p-3 border rounded-xl text-sm ${container}`}>
      {icon}
      {children}
    </div>
  );
}

