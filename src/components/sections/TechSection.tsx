import React from "react";
import { techCapabilities } from "@/data/tech";
import { Container } from "@/components/ui/Container";
import { Shield } from "lucide-react";

export const TechSection: React.FC = () => {
  return (
    <section id="capacidades" className="py-16 sm:py-20 border-b border-[#242830]/60 relative">
      <Container>
        <div className="rounded-xl border border-[#242830] bg-[#121417]/80 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#242830]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#D97706] font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Respaldo Técnico</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F3F4F6] mt-1.5">
                Tecnología moderna como garantía de velocidad y estabilidad
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-md leading-relaxed">
              La tecnología está al servicio del negocio. Selecciono herramientas sólidas para que tu web cargue al instante, no se caiga y sea fácil de mantener.
            </p>
          </div>

          {/* Grilla sobria de áreas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {techCapabilities.map((area) => (
              <div key={area.area} className="space-y-3">
                <span className="text-[11px] font-mono-tech text-[#9CA3AF] uppercase tracking-wider block">
                  {area.area}
                </span>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {area.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono-tech bg-[#1A1D22] border border-[#242830] text-[#F3F4F6] px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
