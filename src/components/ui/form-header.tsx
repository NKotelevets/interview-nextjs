import type { ReactNode } from "react";

interface FormHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

export function FormHeader({ icon, title, subtitle }: FormHeaderProps) {
  return (
    <div className="text-center mb-8 animate-fade-in-up">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6 border border-accent/20">
        {icon}
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </div>
  );
}

