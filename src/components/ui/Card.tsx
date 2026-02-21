import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  style?: CSSProperties;
}

export default function Card({ children, className, hover = false, glow = false, style }: CardProps) {
  return (
    <div
      style={style}
      className={cn(
        "glass-card rounded-2xl p-6",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40",
        glow && "hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
