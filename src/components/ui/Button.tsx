"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-0 outline-none";

    const variants = {
      primary:
        "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)]",
      secondary:
        "bg-transparent text-slate-100 border border-violet-500/40 hover:border-violet-500/80 hover:bg-violet-500/10",
      ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
      danger:
        "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(220,38,38,0.4)]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
