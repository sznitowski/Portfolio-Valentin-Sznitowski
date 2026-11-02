import React from "react";
import { Container } from "@/components/ui/Container";
import { UserCheck, ShieldCheck, ArrowRight, MessageSquare } from "lucide-react";
import { businessData } from "@/data/business";
import { Button } from "@/components/ui/Button";

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-mi" className="py-20 sm:py-28 border-b border-[#1E293B]/60 relative">
      <Container>
        <div className="max-w-4xl mx-auto rounded-2xl border border-[#1E293B] bg-gradient-to-b from-[#111827] to-[#0D131F] p-7 sm:p-12 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
                  Perfil Profesional
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">Trato directo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Quién soy y cómo trabajo
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#131B2A] border border-slate-700 text-[#60A5FA] font-bold text-xs">
                VS
              </span>
              <div className="text-xs">
                <span className="font-semibold text-white block">{businessData.name}</span>
                <span className="text-slate-400 text-[11px]">Desarrollador de Software</span>
              </div>
            </div>
          </div>

          {/* 3 párrafos cortos respondiendo: ¿Quién soy? ¿Qué hago? ¿Por qué puedo resolver este problema? */}
          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            <p>
              Soy desarrollador de software enfocado en construir herramientas prácticas para empresas, pymes y profesionales independientes que necesitan vender, ordenar su administración y operar con agilidad.
            </p>
            <p>
              Mi trabajo consiste en reemplazar procesos manuales y planillas dispersas por sistemas web a medida: paneles de control internos, cotizadores comerciales, portales de autogestión y automatizaciones que conectan tus plataformas para que la información no se cargue dos veces.
            </p>
            <p>
              Trabajo con trato técnico directo, sin intermediarios de agencia. Priorizo código propio, tiempos razonables de entrega y soluciones estables que resuelvan la operativa concreta de tu negocio sin atarte a suscripciones abusivas.
            </p>
          </div>

          {/* Sellos de confianza y CTA directo */}
          <div className="pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono-tech">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Código 100% propio sin comisiones</span>
              </span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-sky-400 font-medium">
                <UserCheck className="w-4 h-4" />
                <span>Comunicación directa y continua</span>
              </span>
            </div>

            <Button
              href={businessData.whatsapp.url}
              isExternal
              variant="outline"
              size="sm"
              icon={<MessageSquare className="w-3.5 h-3.5 text-[#60A5FA]" />}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              <span>Contame tu proyecto</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
