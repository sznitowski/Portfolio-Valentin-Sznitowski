import React from "react";

interface DemoKpiCardProps {
  label: string;
  value: string | number;
  caption?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  icon?: React.ReactNode;
  themeColor?: "cyan" | "blue" | "emerald" | "slate";
}

const themeStyles = {
  cyan: {
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    glow: "from-cyan-500/10",
    iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
  },
  blue: {
    border: "border-blue-500/20 hover:border-blue-500/40",
    glow: "from-blue-500/10",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  },
  emerald: {
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    glow: "from-emerald-500/10",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  },
  slate: {
    border: "border-slate-700/40 hover:border-slate-600",
    glow: "from-slate-500/5",
    iconBg: "bg-slate-800 text-slate-300 border-slate-700",
  },
};

export const DemoKpiCard: React.FC<DemoKpiCardProps> = ({
  label,
  value,
  caption,
  trend,
  icon,
  themeColor = "cyan",
}) => {
  const currentTheme = themeStyles[themeColor] || themeStyles.cyan;

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#111827] border ${currentTheme.border} p-5 transition-all duration-200 shadow-sm`}
    >
      {/* Background radial gradient */}
      <div
        className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${currentTheme.glow} to-transparent blur-2xl pointer-events-none`}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-400 tracking-wide block">
            {label}
          </span>
          <div className="text-2xl font-bold tracking-tight text-white font-mono-tech">
            {value}
          </div>
        </div>

        {icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${currentTheme.iconBg}`}
          >
            {icon}
          </div>
        )}
      </div>

      {(caption || trend) && (
        <div className="mt-3.5 flex items-center gap-2 text-xs pt-2.5 border-t border-slate-800/80">
          {trend && (
            <span
              className={`inline-flex items-center font-medium font-mono-tech px-1.5 py-0.5 rounded text-[11px] ${
                trend.isNeutral
                  ? "bg-slate-800 text-slate-400"
                  : trend.isPositive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-rose-500/10 text-rose-400"
              }`}
            >
              {trend.value}
            </span>
          )}
          {caption && <span className="text-slate-400 truncate">{caption}</span>}
        </div>
      )}
    </div>
  );
};
