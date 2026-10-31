import React from "react";
import { Users, Target, ArrowRight } from "lucide-react";
import { SolutionUseCase } from "@/data/solutions/catalog";

interface SolutionUseCasesProps {
  useCases: SolutionUseCase[];
  accentColor: "sky" | "amber" | "emerald" | "indigo";
}

export function SolutionUseCases({ useCases, accentColor }: SolutionUseCasesProps) {
  const accentBadge = {
    sky: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  }[accentColor];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--accent-primary)] border-b border-[var(--border-subtle)] pb-3">
        <Target className="w-4 h-4" />
        <span>Casos de Uso & Sectores Específicos</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {useCases.map((uc, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-2.5 flex flex-col justify-between"
          >
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase border mb-2 ${accentBadge}`}>
                {uc.target}
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {uc.scenario}
              </p>
            </div>

            <div className="text-[10px] font-mono-tech text-[var(--text-muted)] flex items-center gap-1 pt-2 border-t border-[var(--border-subtle)]">
              <span>Flujo adaptado</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
