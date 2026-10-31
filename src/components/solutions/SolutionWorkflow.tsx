import React from "react";
import {
  FileText,
  FileCheck,
  Camera,
  PenTool,
  Receipt,
  CheckSquare,
  Calendar,
  MapPin,
  Truck,
  Clock,
  Activity,
  Scan,
  MinusCircle,
  AlertTriangle,
  CheckCircle,
  Zap,
} from "lucide-react";
import { SolutionStep } from "@/data/solutions/catalog";

interface SolutionWorkflowProps {
  workflow: SolutionStep[];
  accentColor: "sky" | "amber" | "emerald" | "indigo";
}

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  FileCheck,
  Camera,
  PenTool,
  Receipt,
  CheckSquare,
  Calendar,
  MapPin,
  Truck,
  Clock,
  Activity,
  Scan,
  MinusCircle,
  AlertTriangle,
  CheckCircle,
};

export function SolutionWorkflow({ workflow, accentColor }: SolutionWorkflowProps) {
  const accentBorder = {
    sky: "border-sky-500/30 text-sky-400 bg-sky-500/10",
    emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    indigo: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
    amber: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  }[accentColor];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--accent-primary)]">
          <Zap className="w-4 h-4" />
          <span>Flujo de Trabajo Operativo (Paso a Paso)</span>
        </div>
        <span className="text-[11px] font-mono-tech text-[var(--text-muted)]">
          Diseñado para resolverse en segundos sin fricción
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {workflow.map((step) => {
          const IconComponent = ICON_MAP[step.iconName] || FileText;
          return (
            <div
              key={step.step}
              className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--border-strong)] transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tech font-bold text-[var(--text-muted)]">
                  Paso 0{step.step}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${accentBorder}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)]">
                  {step.title}
                </h4>
                <div className="text-[11px] font-mono-tech text-[var(--accent-primary)] font-semibold mt-0.5">
                  {step.subtitle}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
