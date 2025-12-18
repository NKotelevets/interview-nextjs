import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-surface border border-border rounded-2xl p-8 shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

