import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "live" | "accent" | "tech";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
  icon,
}) => {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors";

  const variants = {
    default:
      "bg-[#1A1D22] text-[#9CA3AF] border border-[#242830]",
    live:
      "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25",
    accent:
      "bg-[#D97706]/10 text-[#F59E0B] border border-[#D97706]/25",
    tech:
      "bg-[#121417] text-[#9CA3AF] border border-[#242830] font-mono-tech text-[11px]",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {variant === "live" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-pulse-live absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
        </span>
      )}
      {icon && variant !== "live" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
