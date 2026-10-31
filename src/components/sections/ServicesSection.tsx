import React from "react";
import {
  Check,
  ArrowRight,
  Code2,
  Wrench,
  Network,
  Clock,
  Bot,
  ShieldCheck,
} from "lucide-react";
import { servicesData, ServiceOffering } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { businessData } from "@/data/business";
import { Button } from "@/components/ui/Button";

const iconsMap: Record<string, React.ReactNode> = {
  "desarrollo-software": <Code2 className="w-5 h-5 text-blue-400" />,
  "mantenimiento-evolucion": <Wrench className="w-5 h-5 text-amber-400" />,
  "integraciones-sistemas": <Network className="w-5 h-5 text-cyan-400" />,
  "automatizacion-procesos": <Clock className="w-5 h-5 text-emerald-400" />,
  "inteligencia-artificial": <Bot className="w-5 h-5 text-indigo-400" />,
  "seguridad-fortalecimiento": <ShieldCheck className="w-5 h-5 text-rose-400" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-20 sm:py-28 border-b border-[#1E293B]/60 relative">
      <Container>
        {/* Encabezado Editorial */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
              Servicios Profesionales
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Modalidad por proyecto o acompañamiento continuo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] mt-2">
            Servicios adaptados a lo que tu negocio necesita
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
            Trabajo tanto en el desarrollo de soluciones nuevas desde cero como en el mantenimiento, mejora y automatización de sistemas que ya tenés funcionando.
          </p>
        </div>

        {/* Grilla de 6 Grupos de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
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

                {/* Título y Pitch comercial */}
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-[#60A5FA] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {service.commercialPitch}
                  </p>
                </div>

                {/* Alcance del servicio */}
                <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800/80 text-xs text-slate-400">
                  <span className="text-[10px] font-mono-tech uppercase text-slate-500 block mb-0.5 font-semibold">
                    Alcance del trabajo:
                  </span>
                  <span className="text-slate-300 font-medium leading-relaxed block">
                    {service.scopeSummary}
                  </span>
                </div>

                {/* Entregables */}
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 font-semibold block">
                    Qué resolvemos:
                  </span>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA directo */}
              <div className="pt-6 mt-6 border-t border-[#1E293B]">
                <Button
                  href={businessData.whatsapp.url}
                  isExternal
                  variant="outline"
                  size="sm"
                  className="w-full justify-center group/btn text-xs"
                >
                  <span>Consultar por este servicio</span>
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
