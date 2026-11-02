import React from "react";
import {
  Check,
  ArrowRight,
  Code2,
  Wrench,
  Network,
  Clock,
  Bot,
  Layers,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { businessData } from "@/data/business";
import { Button } from "@/components/ui/Button";

const iconsMap: Record<string, React.ReactNode> = {
  "software-a-medida": <Code2 className="w-5 h-5 text-blue-400" />,
  "sistemas-web-portales": <Layers className="w-5 h-5 text-cyan-400" />,
  "automatizacion-integraciones": <Network className="w-5 h-5 text-emerald-400" />,
  "modernizacion-mantenimiento": <Wrench className="w-5 h-5 text-amber-400" />,
  "ia-aplicada": <Bot className="w-5 h-5 text-indigo-400" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-20 sm:py-28 border-b border-[#1E293B]/60 relative">
      <Container>
        {/* Encabezado Editorial */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
              Servicios Profesionales
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Modalidad por proyecto o acompañamiento</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] mt-2">
            Servicios adaptados a lo que tu negocio necesita
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
            Trabajo en el desarrollo de herramientas nuevas desde cero y en la mejora o automatización de sistemas que ya tenés funcionando.
          </p>
        </div>

        {/* Grilla de Servicios Simplificada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-[#1E293B] bg-[#111827] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-slate-700 hover:bg-[#131B2A] group"
            >
              <div className="space-y-4">
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B0F17] border border-slate-800">
                      {iconsMap[service.id]}
                    </div>
                    <span className="text-xs font-mono-tech text-slate-400 font-semibold">
                      {service.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono-tech text-[#60A5FA] bg-[#3B82F6]/10 px-2.5 py-0.5 rounded-full border border-[#3B82F6]/25 font-semibold">
                    {service.badge}
                  </span>
                </div>

                {/* Título y Pitch comercial (1 frase clara) */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-[#60A5FA] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {service.commercialPitch}
                  </p>
                </div>

                {/* 2-3 Ejemplos concretos */}
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 font-semibold block">
                    Ejemplos de aplicación:
                  </span>
                  <ul className="space-y-2">
                    {service.examples.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA directo estandarizado */}
              <div className="pt-5 mt-6 border-t border-[#1E293B]">
                <Button
                  href={businessData.whatsapp.url}
                  isExternal
                  variant="outline"
                  size="sm"
                  className="w-full justify-center group/btn text-xs"
                >
                  <span>Contame tu proyecto</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all text-[#60A5FA]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
