import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight, CheckCircle2, MessageSquare, Layers, ShieldCheck, Palette, Smartphone, Sliders } from "lucide-react";
import { featuredProject } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

export const ShowcaseSection: React.FC = () => {
  return (
    <section id="proyecto" className="py-20 sm:py-28 border-b border-[#242830]/60 relative">
      <Container>
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-[#D97706] font-semibold">
                Proyecto Insignia
              </span>
              <Badge variant="live">Demo en vivo en Netlify</Badge>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F3F4F6] mt-2">
              Custom Commerce: Catálogo & Cotizador a Medida
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] mt-2 leading-relaxed">
              Plataforma comercial para negocios que comercializan productos estándar y fabricados a medida, transformando conversaciones de chat en pedidos calificados listos para producir.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              href={featuredProject.demoUrl}
              isExternal
              variant="primary"
              size="md"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Probar demo pública
            </Button>
            <Button
              href={featuredProject.caseStudyUrl}
              variant="secondary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Ver caso completo
            </Button>
          </div>
        </div>

        {/* Gran Contenedor Showcase */}
        <div className="rounded-2xl border border-[#242830] bg-[#121417] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl relative">
          {/* Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#D97706]/15 via-[#10B981]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Columna Izquierda: Información Editorial y Capacidades */}
            <div className="lg:col-span-7 space-y-6">
              {/* Contexto de la Instancia Demostrativa */}
              <div className="rounded-xl bg-[#1A1D22] border border-[#242830] p-4 sm:p-5 text-xs sm:text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#F3F4F6] text-sm sm:text-base">
                    Caso real de aplicación: {featuredProject.clientContext.businessName}
                  </span>
                  <span className="text-[#D97706] font-mono-tech text-xs bg-[#D97706]/10 px-2 py-0.5 rounded border border-[#D97706]/20">
                    Muebles & Carpintería
                  </span>
                </div>
                <p className="text-[#9CA3AF] leading-relaxed text-xs sm:text-sm">
                  {featuredProject.clientContext.description}
                </p>
              </div>

              {/* El problema y la solución comercial */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                  Diseñado para eliminar el cuello de botella de cotizar a mano por mensaje
                </h3>
                <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                  En lugar de pasar horas explicando opciones de maderas, medidas y precios por mensaje directo, el comprador navega las fotos del catálogo, elige sus dimensiones exactas y envía a WhatsApp el presupuesto estructurado con un solo click.
                </p>
              </div>

              {/* Capacidades Clave en Grilla */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A0B0D]/70 border border-[#242830]">
                  <Layers className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold text-[#F3F4F6] block text-sm">Catálogo Administrable</span>
                    <span className="text-[#9CA3AF] mt-0.5 block leading-relaxed">Categorías, stock simbólico, estados y fotos reales.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A0B0D]/70 border border-[#242830]">
                  <Sliders className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold text-[#F3F4F6] block text-sm">Campos Personalizados</span>
                    <span className="text-[#9CA3AF] mt-0.5 block leading-relaxed">Medidas (largo, ancho), maderas y acabados dinámicos.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A0B0D]/70 border border-[#242830]">
                  <MessageSquare className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold text-[#F3F4F6] block text-sm">Integración a WhatsApp</span>
                    <span className="text-[#9CA3AF] mt-0.5 block leading-relaxed">Mensaje automático con el requerimiento técnico completo.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A0B0D]/70 border border-[#242830]">
                  <Palette className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold text-[#F3F4F6] block text-sm">Identidad Propia</span>
                    <span className="text-[#9CA3AF] mt-0.5 block leading-relaxed">Branding, colores y tipografía adaptados a cada negocio.</span>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Button
                  href={featuredProject.demoUrl}
                  isExternal
                  variant="primary"
                  size="lg"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Probar demo pública
                </Button>
                <Link
                  href={featuredProject.caseStudyUrl}
                  className="text-sm font-medium text-[#F3F4F6] hover:text-[#D97706] flex items-center gap-1.5 transition-colors py-2"
                >
                  <span>Leer estudio de caso completo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Visual con Fotos Reales del Catálogo */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Preview Visual de Productos Reales de la Demo */}
              <div className="rounded-xl bg-[#0A0B0D] border border-[#242830] p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#242830]">
                  <span className="text-xs font-semibold text-[#F3F4F6]">
                    Productos Reales en la Demo
                  </span>
                  <span className="text-[11px] font-mono-tech text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded">
                    Taller Roble & Veta
                  </span>
                </div>

                {/* Grilla visual de 2 productos destacados */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#121417] border border-[#242830] overflow-hidden group/item">
                    <div className="relative aspect-[4/3] w-full bg-[#1A1D22]">
                      <Image
                        src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80"
                        alt="Aparador nórdico ranurado"
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-300 group-hover/item:scale-105"
                      />
                    </div>
                    <div className="p-2.5">
                      <span className="text-[11px] font-bold text-[#F3F4F6] block truncate">
                        Aparador &quot;Nativo&quot;
                      </span>
                      <span className="text-[10px] text-[#D97706] font-semibold block mt-0.5">
                        Desde $740.000
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#121417] border border-[#242830] overflow-hidden group/item">
                    <div className="relative aspect-[4/3] w-full bg-[#1A1D22]">
                      <Image
                        src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
                        alt="Isla central de cocina a medida"
                        fill
                        sizes="200px"
                        className="object-cover transition-transform duration-300 group-hover/item:scale-105"
                      />
                    </div>
                    <div className="p-2.5">
                      <span className="text-[11px] font-bold text-[#F3F4F6] block truncate">
                        Isla Central Cocina
                      </span>
                      <span className="text-[10px] text-[#10B981] font-semibold block mt-0.5">
                        A Cotizar / Plano
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ficha técnica compacta */}
                <div className="pt-2 border-t border-[#242830]/80 space-y-2 text-xs">
                  <div className="flex justify-between text-[#9CA3AF]">
                    <span>Frontend:</span>
                    <span className="text-[#F3F4F6] font-medium">Next.js 15 (App Router)</span>
                  </div>
                  <div className="flex justify-between text-[#9CA3AF]">
                    <span>Backend Real:</span>
                    <span className="text-[#F3F4F6] font-medium">NestJS + PostgreSQL</span>
                  </div>
                  <div className="flex justify-between text-[#9CA3AF]">
                    <span>Despliegue:</span>
                    <span className="text-[#10B981] font-medium">Single-Tenant independiente</span>
                  </div>
                </div>

                {/* Banner de Acceso a Demo */}
                <div className="pt-2">
                  <a
                    href={featuredProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-3 rounded-lg bg-[#1A1D22] border border-[#D97706]/40 hover:border-[#D97706] hover:bg-[#22262C] transition-all flex items-center justify-between text-xs group/demo"
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#D97706]" />
                      <div className="flex flex-col text-left">
                        <span className="font-semibold text-[#F3F4F6] group-hover/demo:text-white">
                          Abrir catálogo interactivo en vivo
                        </span>
                        <span className="text-[11px] text-[#9CA3AF]">
                          custom-commerce.netlify.app
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#D97706]" />
                  </a>
                </div>
              </div>

              {/* Garantía de independencia */}
              <div className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#9CA3AF]">
                <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Cada cliente cuenta con base de datos y dominio propio sin pagar comisiones por venta.</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
