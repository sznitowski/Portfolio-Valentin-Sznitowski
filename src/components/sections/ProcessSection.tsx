import React from "react";
import { processData } from "@/data/process";
import { Container } from "@/components/ui/Container";

export const ProcessSection: React.FC = () => {
  return (
    <section id="proceso" className="py-20 sm:py-28 border-b border-[#242830]/60 relative">
      <Container>
        {/* Encabezado */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <span className="text-xs font-mono-tech uppercase tracking-wider text-[#D97706] font-semibold">
            Metodología de Trabajo
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F3F4F6] mt-2">
            Un proceso claro, predecible y sin sorpresas
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
            De la primera conversación al lanzamiento en producción. Cada etapa tiene objetivos concretos para que siempre sepas en qué estado está tu proyecto.
          </p>
        </div>

        {/* Grilla Progresiva Editorial (Evitando timeline vertical genérico) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processData.map((step, idx) => (
            <div
              key={step.step}
              className={`rounded-xl border border-[#242830] bg-[#121417] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#3A404A] hover:bg-[#15181D] ${
                idx === 4 ? "md:col-span-2 lg:col-span-2 bg-gradient-to-r from-[#121417] to-[#1A1D22]/80 border-[#D97706]/30" : ""
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono-tech text-[#D97706]">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#9CA3AF] bg-[#1A1D22] px-2.5 py-0.5 rounded border border-[#242830]">
                    Paso {idx + 1} de 5
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#F3F4F6] tracking-tight">
                    {step.title}
                  </h3>
                  <span className="text-xs text-[#D97706] font-medium block mt-0.5">
                    {step.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed pt-1">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#242830] flex items-center gap-2 text-xs">
                <span className="text-[#10B981] font-semibold shrink-0">Entregable:</span>
                <span className="text-[#F3F4F6] truncate">{step.keyOutcome}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
