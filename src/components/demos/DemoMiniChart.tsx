import React from "react";

interface BarChartItem {
  label: string;
  value: number;
  secondaryValue?: number;
  highlight?: boolean;
}

interface DemoBarChartProps {
  data: BarChartItem[];
  title?: string;
  height?: number;
  colorScheme?: "cyan" | "blue" | "emerald";
  valueFormatter?: (val: number) => string;
}

export const DemoBarChart: React.FC<DemoBarChartProps> = ({
  data,
  title,
  height = 140,
  colorScheme = "cyan",
  valueFormatter = (val) => `$${val.toLocaleString()}`,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const colors = {
    cyan: {
      bar: "bg-cyan-500/80 hover:bg-cyan-400",
      barHighlight: "bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]",
      line: "border-cyan-500/30",
    },
    blue: {
      bar: "bg-blue-500/80 hover:bg-blue-400",
      barHighlight: "bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.4)]",
      line: "border-blue-500/30",
    },
    emerald: {
      bar: "bg-emerald-500/80 hover:bg-emerald-400",
      barHighlight: "bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]",
      line: "border-emerald-500/30",
    },
  }[colorScheme];

  return (
    <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5 space-y-4">
      {title && (
        <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono-tech">
            {title}
          </span>
          <span className="text-[11px] text-slate-500">Datos sintéticos en memoria</span>
        </div>
      )}

      <div
        className="flex items-end gap-2 sm:gap-4 pt-4 px-1"
        style={{ height: `${height}px` }}
        role="img"
        aria-label={`Gráfico de barras: ${title || "Distribución de volumen"}`}
      >
        {data.map((item, idx) => {
          const heightPercent = Math.round((item.value / maxValue) * 100);

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-end h-full gap-2 group/bar relative"
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-8 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-white text-[10px] font-mono-tech px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                {valueFormatter(item.value)}
              </div>

              {/* Bar */}
              <div className="w-full bg-slate-800/60 rounded-t overflow-hidden flex flex-col justify-end h-full">
                <div
                  className={`w-full transition-all duration-300 rounded-t ${
                    item.highlight ? colors.barHighlight : colors.bar
                  }`}
                  style={{ height: `${Math.max(heightPercent, 6)}%` }}
                />
              </div>

              {/* Label */}
              <span className="text-[10px] sm:text-xs font-mono-tech text-slate-400 group-hover/bar:text-slate-200 transition-colors truncate max-w-full">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
