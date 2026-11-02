import React from "react";
import { ArrowDown, MessageSquare } from "lucide-react";
import { businessData } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/sections/HeroVisual";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden border-b border-[#1E293B]/60">
      {/* Background subtle radial gradient */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[480px] bg-gradient-to-tr from-[#3B82F6]/15 via-[#6366F1]/10 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Status Badge */}
          <div className="reveal-hero">
            <Badge variant="live">
              Disponible para proyectos comerciales & desarrollo a medida
            </Badge>
          </div>

          {/* Headline comercial amplio */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.12]">
            Desarrollo software y soluciones web para negocios que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#818CF8]">
              necesitan vender, automatizar y operar mejor.
            </span>
          </h1>

          {/* Subheadline comercial enfocado al cliente (35 palabras) */}
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-normal">
            Ayudo a empresas a reemplazar planillas y tareas manuales con herramientas a medida: paneles internos, portales de clientes, automatizaciones e integraciones para que tu negocio opere con más agilidad y menos errores.
          </p>

          {/* CTAs duales estandarizados */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2">
            <Button
              href={businessData.whatsapp.url}
              isExternal
              size="lg"
              variant="primary"
              icon={<MessageSquare className="w-4 h-4 text-white" />}
              iconPosition="left"
              className="w-full sm:w-auto font-semibold"
            >
              Contame tu proyecto
            </Button>
            <Button
              href="/soluciones"
              size="lg"
              variant="secondary"
              icon={<ArrowDown className="w-4 h-4 text-[#60A5FA]" />}
              className="w-full sm:w-auto"
            >
              Ver soluciones
            </Button>
          </div>

          {/* Sellos de confianza */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Demos y prototipos navegables
            </span>
            <span className="hidden sm:inline text-[#1E293B]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              Proyectos nuevos y sistemas existentes
            </span>
            <span className="hidden sm:inline text-[#1E293B]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F8FAFC]" />
              Código propio y sin comisiones
            </span>
          </div>
        </div>

        {/* Visual Hero Component */}
        <div className="mt-12 sm:mt-16">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
};
