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
      "bg-[#131B2A] text-[#94A3B8] border border-[#1E293B]",
    live:
      "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25",
    accent:
      "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/25",
    tech:
      "bg-[#111827] text-[#94A3B8] border border-[#1E293B] font-mono-tech text-[11px]",
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
