import React from "react";
import { processData } from "@/data/process";
import { Container } from "@/components/ui/Container";

export const ProcessSection: React.FC = () => {
  return (
    <section id="proceso" className="py-20 sm:py-28 border-b border-[#1E293B]/60 relative">
      <Container>
        {/* Encabezado Editorial */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
              Metodología de Trabajo
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Paso a paso sin intermediarios</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] mt-2">
            Cómo trabajamos juntos
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
            Tanto si necesitás construir una solución desde cero como mejorar un sistema existente, seguimos un proceso transparente con etapas y entregables claros.
          </p>
        </div>

        {/* 4 Pasos Simétricos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processData.map((step, idx) => (
            <div
              key={step.step}
              className="rounded-2xl border border-[#1E293B] bg-[#111827] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-slate-700 hover:bg-[#131B2A] group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono-tech text-[#60A5FA]">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 bg-[#0B0F17] px-2.5 py-0.5 rounded-full border border-slate-800">
                    Paso {idx + 1} de 4
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#60A5FA] transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <span className="text-xs text-[#60A5FA] font-medium block mt-1">
                    {step.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E293B] text-xs space-y-1">
                <span className="text-[10px] uppercase font-mono-tech text-emerald-400 font-semibold block">
                  Objetivo concreto:
                </span>
                <span className="text-slate-300 font-medium leading-relaxed block">
                  {step.keyOutcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
