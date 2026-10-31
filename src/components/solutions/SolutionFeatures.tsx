import React from "react";
import { CheckCircle2, Cpu } from "lucide-react";
import { SolutionFeature } from "@/data/solutions/catalog";

interface SolutionFeaturesProps {
  features: SolutionFeature[];
  accentColor: "sky" | "amber" | "emerald" | "indigo";
}

export function SolutionFeatures({ features, accentColor }: SolutionFeaturesProps) {
  const accentIcon = {
    sky: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  }[accentColor];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--accent-primary)] border-b border-[var(--border-subtle)] pb-3">
        <Cpu className="w-4 h-4" />
        <span>Capacidades Técnicas & Funcionales</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-start gap-3.5"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${accentIcon}`}>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">
                {feat.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                {feat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
