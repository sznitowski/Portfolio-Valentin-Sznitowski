import React from "react";
import { TrendingUp } from "lucide-react";
import { SolutionBenefit } from "@/data/solutions/catalog";

interface SolutionBenefitsProps {
  benefits: SolutionBenefit[];
  accentColor: "sky" | "amber" | "emerald" | "indigo";
}

export function SolutionBenefits({ benefits, accentColor }: SolutionBenefitsProps) {
  const accentStat = {
    sky: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  }[accentColor];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--accent-primary)]">
          <TrendingUp className="w-4 h-4" />
          <span>Objetivos de Diseño & Beneficios Operativos</span>
        </div>
        <span className="text-[10px] font-mono-tech text-[var(--text-muted)]">
          Estimaciones conceptuales de arquitectura
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-3 flex flex-col justify-between"
          >
            <div>
              {benefit.stat && (
                <div className="mb-2">
                  <span className={`text-[10px] font-mono-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded border inline-block ${accentStat}`}>
                    {benefit.stat}
                  </span>
                </div>
              )}
              <h4 className="text-sm font-bold text-[var(--text-primary)]">
                {benefit.title}
              </h4>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
