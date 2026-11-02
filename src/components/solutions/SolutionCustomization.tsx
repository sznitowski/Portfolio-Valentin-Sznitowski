import React from "react";
import { Settings, Layers, Code2, Database } from "lucide-react";

interface SolutionCustomizationProps {
  options: string[];
  techStack: string[];
  accentColor: "sky" | "amber" | "emerald" | "indigo";
}

export function SolutionCustomization({
  options,
  techStack,
  accentColor,
}: SolutionCustomizationProps) {
  const accentBorder = {
    sky: "border-sky-500/30 text-sky-400",
    emerald: "border-emerald-500/30 text-emerald-400",
    indigo: "border-indigo-500/30 text-indigo-400",
    amber: "border-amber-500/30 text-amber-400",
  }[accentColor];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--accent-primary)] border-b border-[var(--border-subtle)] pb-3">
        <Settings className="w-4 h-4" />
        <span>Opciones de Adaptación para tu Empresa</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customization Options */}
        <div className="p-6 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] uppercase font-mono-tech">
            <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>¿Cómo se adapta a tu negocio?</span>
          </div>
          <ul className="space-y-3 text-xs text-[var(--text-secondary)]">
            {options.map((opt, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-current ${accentBorder}`} />
                <span className="leading-relaxed">{opt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conceptual Tech Stack */}
        <div className="p-6 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] uppercase font-mono-tech">
            <Code2 className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Base Tecnológica Recomendada</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Arquitectura moderna orientada a la velocidad de carga, funcionamiento offline en dispositivos móviles y propiedad 100% independiente del código para tu empresa.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-mono-tech text-[11px]">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
