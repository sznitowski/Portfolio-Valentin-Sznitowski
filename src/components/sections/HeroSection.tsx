import React from "react";
import { ArrowDown, MessageSquare } from "lucide-react";
import { businessData } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/sections/HeroVisual";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden border-b border-[#242830]/60">
      {/* Background subtle radial gradient */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[480px] bg-gradient-to-tr from-[#D97706]/10 to-transparent blur-3xl pointer-events-none -z-10"
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

          {/* Headline comercial contundente */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F3F4F6] leading-[1.12]">
            Desarrollo plataformas web y catálogos a medida para negocios que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FBBF24]">
              necesitan vender mejor.
            </span>
          </h1>

          {/* Subheadline comercial enfocado al cliente */}
          <p className="text-base sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-normal">
            Soluciones digitales pensadas para comercios, talleres y pymes: productos con opciones a medida, cotizaciones directas a WhatsApp y paneles de gestión propios. Sin comisiones por venta ni ataduras a plantillas rígidas.
          </p>

          {/* CTAs duales */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2">
            <Button
              href="#proyecto"
              size="lg"
              variant="primary"
              icon={<ArrowDown className="w-4 h-4" />}
              className="w-full sm:w-auto font-semibold"
            >
              Ver proyecto destacado
            </Button>
            <Button
              href={businessData.whatsapp.url}
              isExternal
              size="lg"
              variant="secondary"
              icon={<MessageSquare className="w-4 h-4 text-[#10B981]" />}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Contame tu proyecto
            </Button>
          </div>

          {/* Sellos de confianza */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#9CA3AF]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Casos reales en producción
            </span>
            <span className="hidden sm:inline text-[#242830]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
              Código propio y sin comisiones
            </span>
            <span className="hidden sm:inline text-[#242830]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F3F4F6]" />
              Atención directa sin intermediarios
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
