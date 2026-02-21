import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "blue" | "cyan" | "green" | "orange" | "red";
  className?: string;
}

export default function Badge({ children, variant = "purple", className }: BadgeProps) {
  const variants = {
    purple: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    blue: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    orange: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    red: "bg-red-500/15 text-red-300 border-red-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
