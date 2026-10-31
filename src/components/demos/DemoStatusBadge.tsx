import React from "react";

export type BadgeTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "purple";

interface DemoStatusBadgeProps {
  label: string;
  tone?: BadgeTone;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const toneStyles: Record<BadgeTone, { bg: string; text: string; border: string; dotColor: string }> = {
  success: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/25",
    dotColor: "bg-emerald-400",
  },
  warning: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/25",
    dotColor: "bg-amber-400",
  },
  danger: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/25",
    dotColor: "bg-rose-400",
  },
  info: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-500/25",
    dotColor: "bg-sky-400",
  },
  neutral: {
    bg: "bg-slate-500/10",
    text: "text-slate-300",
    border: "border-slate-500/25",
    dotColor: "bg-slate-400",
  },
  purple: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/25",
    dotColor: "bg-indigo-400",
  },
};

export const DemoStatusBadge: React.FC<DemoStatusBadgeProps> = ({
  label,
  tone = "neutral",
  size = "sm",
  className = "",
  dot = true,
}) => {
  const currentTone = toneStyles[tone] || toneStyles.neutral;
  const sizeClasses = size === "sm" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${currentTone.bg} ${currentTone.text} ${currentTone.border} ${sizeClasses} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentTone.dotColor}`}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
};
