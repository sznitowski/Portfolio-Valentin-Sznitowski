import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { servicesData } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { businessData } from "@/data/business";
import { Button } from "@/components/ui/Button";

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-20 sm:py-28 border-b border-[#242830]/60 relative">
      <Container>
        {/* Encabezado */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <span className="text-xs font-mono-tech uppercase tracking-wider text-[#D97706] font-semibold">
            Capacidades Comerciales
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F3F4F6] mt-2">
            Servicios adaptados a las necesidades de tu negocio
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
            Sin paquetes cerrados ni plantillas genéricas. Desarrollo soluciones específicas según el modelo de venta y la operativa de cada comercio o empresa.
          </p>
        </div>

        {/* 3 Grupos de Servicios */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="rounded-xl border border-[#242830] bg-[#121417] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#3A404A] hover:bg-[#15181D]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-[#D97706] bg-[#D97706]/10 px-2.5 py-0.5 rounded border border-[#D97706]/20 font-semibold">
                    {service.badge}
                  </span>
                  <span className="text-xs font-mono-tech text-[#6B7280]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F3F4F6] tracking-tight">
                  {service.title}
                </h3>

                <p className="text-xs font-medium text-[#D97706]">
                  {service.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed pt-1">
                  {service.businessValue}
                </p>

                {/* Entregables */}
                <div className="pt-4 border-t border-[#242830] space-y-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F3F4F6] block">
                    Qué incluye:
                  </span>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#9CA3AF]">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  href={businessData.whatsapp.url}
                  isExternal
                  variant="outline"
                  size="sm"
                  className="w-full justify-center group"
                >
                  <span>Consultar por este servicio</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
