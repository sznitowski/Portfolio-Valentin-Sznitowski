import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Smartphone,
  Layers,
} from "lucide-react";
import { featuredProject } from "@/data/projects";
import { businessData } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Case Study: Custom Commerce | Valentín Sznitowski",
  description:
    "Estudio de caso sobre Custom Commerce: plataforma web comercial con catálogo interactivo, medidas personalizadas y presupuestos dinámicos para comercios y talleres.",
  openGraph: {
    title: "Case Study: Custom Commerce | Valentín Sznitowski",
    description:
      "Cómo digitalizamos el catálogo y la cotización a medida para un taller de carpintería y fabricación artesanal.",
    url: `${businessData.urls.portfolio}/proyectos/custom-commerce`,
  },
};

export default function CustomCommerceCaseStudy() {
  const project = featuredProject;

  return (
    <article className="pt-28 sm:pt-36 pb-20 sm:pb-28">
      <Container size="default">
        {/* Navegación de Regreso */}
        <div className="mb-8">
          <Link
            href="/#proyecto"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors py-2 px-3.5 rounded-lg bg-[#111827] border border-[#1E293B]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio del portfolio</span>
          </Link>
        </div>

        {/* Hero del Proyecto */}
        <header className="space-y-6 pb-12 border-b border-[#1E293B]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
              Estudio de Caso Comercial
            </span>
            <Badge variant="live">
              {project.demoUrl ? "Demo en Producción en Netlify" : "Demo en Actualización"}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
            Custom Commerce: Catálogo digital interactivo y cotización a medida
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-3xl leading-relaxed">
            Una plataforma comercial desarrollada para talleres y negocios que comercializan productos estándar y fabricados a medida, transformando conversaciones desordenadas de chat en pedidos calificados listos para producir.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            {project.demoUrl ? (
              <Button
                href={project.demoUrl}
                isExternal
                variant="primary"
                size="md"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Probar demo en vivo
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1E293B]/70 border border-[#334155] text-xs font-medium text-[#94A3B8]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                Demo temporalmente en actualización
              </span>
            )}
            <Button
              href={businessData.whatsapp.url}
              isExternal
              variant="secondary"
              size="md"
              icon={<MessageSquare className="w-4 h-4 text-[#10B981]" />}
              iconPosition="left"
            >
              Consultar por una plataforma similar
            </Button>
          </div>
        </header>

        {/* Ficha Resumen Rápida */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-b border-[#1E293B] text-xs">
          <div>
            <span className="text-[#64748B] block">Negocio Demostrativo</span>
            <span className="font-semibold text-[#F8FAFC] mt-0.5 block">{project.clientContext.businessName}</span>
          </div>
          <div>
            <span className="text-[#64748B] block">Rubro Inicial</span>
            <span className="font-semibold text-[#F8FAFC] mt-0.5 block">{project.clientContext.rubro}</span>
          </div>
          <div>
            <span className="text-[#64748B] block">Tipo de Solución</span>
            <span className="font-semibold text-[#F8FAFC] mt-0.5 block">Catálogo + Cotizador Web</span>
          </div>
          <div>
            <span className="text-[#64748B] block">Estrategia de Despliegue</span>
            <span className="font-semibold text-[#10B981] mt-0.5 block">Single-tenant independiente</span>
          </div>
        </section>

        {/* Bloque 1: Contexto y El Problema Comercial (Business First) */}
        <section className="py-12 space-y-6 border-b border-[#1E293B]">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#EF4444] font-semibold">
              01. Contexto & Desafío Comercial
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              El problema de cotizar a mano en redes sociales y WhatsApp
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              El taller comercializaba principalmente subiendo fotos a Instagram y respondiendo por WhatsApp. Con el crecimiento de consultas, el titular del negocio pasaba entre 2 y 4 horas diarias respondiendo siempre las mismas dudas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {project.problem.points.map((point, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#111827] border border-[#1E293B] text-xs sm:text-sm text-[#94A3B8] flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0 mt-2" />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bloque 2: La Solución Implementada */}
        <section className="py-12 space-y-6 border-b border-[#1E293B]">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#10B981] font-semibold">
              02. La Solución Diseñada
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              Un catálogo configurable que califica pedidos antes de contactar
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Diseñé una plataforma web orientada al comprador que permite explorar el catálogo con fotos reales, pero con una innovación central: cada producto puede tener campos a medida (dimensiones, maderas, colores, acabados) que recalculan el presupuesto en tiempo real y envían la solicitud estructurada a WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {project.solution.points.map((point, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#111827] border border-[#1E293B] text-xs sm:text-sm text-[#F8FAFC] flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#94A3B8]">{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bloque 3: Muestra Visual de Productos Reales de la Demo */}
        <section className="py-12 space-y-6 border-b border-[#1E293B]">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
              03. Experiencia Visual & Catálogo Real
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              Productos y variantes en la demo operativa
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              La plataforma soporta distintos esquemas comerciales: productos con precio base configurable, productos de precio fijo estándar y productos de cotización exclusiva sobre plano.
            </p>
          </div>

          {/* Galería de 3 productos reales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="rounded-xl bg-[#111827] border border-[#1E293B] overflow-hidden group">
              <div className="relative aspect-[4/3] w-full bg-[#131B2A]">
                <Image
                  src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80"
                  alt="Mesa de comedor de Petiribí macizo"
                  fill
                  sizes="350px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-mono-tech text-[#60A5FA] uppercase">
                  Medidas & Maderas a Medida
                </span>
                <h3 className="text-sm font-bold text-[#F8FAFC]">
                  Mesa Comedor &quot;Tala&quot;
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Configuración de largo (160–300 cm), ancho, maderas nobles y acabado satinado.
                </p>
                <span className="text-xs font-bold text-[#60A5FA] block pt-1">
                  Desde $980.000
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-[#111827] border border-[#1E293B] overflow-hidden group">
              <div className="relative aspect-[4/3] w-full bg-[#131B2A]">
                <Image
                  src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80"
                  alt="Aparador nórdico de madera con detalle ranurado"
                  fill
                  sizes="350px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-mono-tech text-[#60A5FA] uppercase">
                  Mobiliario de Guardado
                </span>
                <h3 className="text-sm font-bold text-[#F8FAFC]">
                  Aparador &quot;Nativo&quot; Ranurado
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Frentes alistonados continuos, puertas corredizas y herrajes soft-close austríacos.
                </p>
                <span className="text-xs font-bold text-[#60A5FA] block pt-1">
                  Desde $740.000
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-[#111827] border border-[#1E293B] overflow-hidden group">
              <div className="relative aspect-[4/3] w-full bg-[#131B2A]">
                <Image
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
                  alt="Isla de cocina con barra desayunadora"
                  fill
                  sizes="350px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-mono-tech text-[#10B981] uppercase">
                  Cotización Exclusiva a Medida
                </span>
                <h3 className="text-sm font-bold text-[#F8FAFC]">
                  Isla de Cocina & Quincho
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Fabricación 100% sobre plano con mesada hidrorrepelente y módulos a medida.
                </p>
                <span className="text-xs font-bold text-[#10B981] block pt-1">
                  A Consultar / Presupuesto
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Bloque 4: Funcionalidades Destacadas */}
        <section className="py-12 space-y-6 border-b border-[#1E293B]">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
              04. Características Principales
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              Funcionalidades pensadas para la autonomía del comerciante
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {project.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#111827] border border-[#1E293B] space-y-2"
              >
                <span className="text-xs font-mono-tech text-[#60A5FA]">0{idx + 1}</span>
                <h3 className="text-base font-semibold text-[#F8FAFC]">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bloque 5: Arquitectura Técnica (Resumida y al Final) */}
        <section className="py-12 space-y-6 border-b border-[#1E293B]">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#94A3B8] font-semibold">
              05. Arquitectura & Respaldo Técnico
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              Arquitectura modular desacoplada y escalable
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              La plataforma no es una plantilla de WordPress ni un plugin genérico. Es una arquitectura desacoplada de nivel profesional, lista para soportar tráfico continuo y evolucionar con nuevas integraciones sin ataduras.
            </p>
          </div>

          {/* Diagrama Conceptual Visual */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#0B0F17] border border-[#1E293B] space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex-1 p-4 rounded-lg bg-[#111827] border border-[#1E293B] w-full">
                <span className="text-[10px] font-mono-tech text-[#60A5FA] uppercase block font-semibold">Capa 1: Frontend</span>
                <span className="text-sm font-bold text-[#F8FAFC] block mt-1">Storefront Web</span>
                <span className="text-xs text-[#94A3B8] block mt-0.5">Next.js 15 (App Router) + Tailwind CSS</span>
              </div>

              <div className="text-[#60A5FA] font-mono-tech text-lg rotate-90 sm:rotate-0">
                →
              </div>

              <div className="flex-1 p-4 rounded-lg bg-[#111827] border border-[#1E293B] w-full">
                <span className="text-[10px] font-mono-tech text-[#10B981] uppercase block font-semibold">Capa 2: Lógica</span>
                <span className="text-sm font-bold text-[#F8FAFC] block mt-1">API REST v1</span>
                <span className="text-xs text-[#94A3B8] block mt-0.5">NestJS + TypeScript</span>
              </div>

              <div className="text-[#60A5FA] font-mono-tech text-lg rotate-90 sm:rotate-0">
                →
              </div>

              <div className="flex-1 p-4 rounded-lg bg-[#111827] border border-[#1E293B] w-full">
                <span className="text-[10px] font-mono-tech text-[#3B82F6] uppercase block font-semibold">Capa 3: Datos</span>
                <span className="text-sm font-bold text-[#F8FAFC] block mt-1">Base de Datos</span>
                <span className="text-xs text-[#94A3B8] block mt-0.5">PostgreSQL + Prisma ORM</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#1E293B]/80">
              {project.architecture.layers.map((layer, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <span className="font-semibold text-[#F8FAFC] block">{layer.layer}</span>
                  <span className="text-[#60A5FA] font-mono-tech text-[11px] block">{layer.tech}</span>
                  <span className="text-[#94A3B8] block leading-relaxed">{layer.purpose}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bloque 6: CTA Final del Case Study */}
        <section className="py-14 sm:py-16 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              ¿Tu comercio o taller necesita un catálogo comercial a medida?
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Puedo desplegar una instancia adaptada con el branding, categorías y productos de tu negocio, conectada a tu WhatsApp y lista para vender sin comisiones.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href={businessData.whatsapp.url}
              isExternal
              size="lg"
              variant="primary"
              icon={<MessageSquare className="w-5 h-5 text-white" />}
              iconPosition="left"
              className="font-semibold"
            >
              Consultar por WhatsApp
            </Button>
            {project.demoUrl ? (
              <Button
                href={project.demoUrl}
                isExternal
                size="lg"
                variant="secondary"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Explorar demo de nuevo
              </Button>
            ) : (
              <Button
                href="/soluciones"
                size="lg"
                variant="secondary"
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
              >
                Explorar otras soluciones
              </Button>
            )}
          </div>
        </section>
      </Container>
    </article>
  );
}
