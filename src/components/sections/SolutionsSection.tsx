"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  ShoppingBag,
  Receipt,
  Building2,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

import { businessData } from "@/data/business";

interface SimpleSolutionCard {
  id: string;
  name: string;
  subtitle: string;
  badgeLabel: string;
  description: string;
  capabilities: string[];
  theme: {
    accentName: "emerald" | "cyan" | "blue";
    border: string;
    borderHover: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    dotColor: string;
    iconBg: string;
    iconColor: string;
    ctaPrimary: string;
    linkHover: string;
  };
  primaryCta: {
    label: string;
    href: string | null;
    isExternal?: boolean;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

const solutions: SimpleSolutionCard[] = [
  {
    id: "custom-commerce",
    name: "Catálogo y Ventas a Medida",
    subtitle: "Custom Commerce",
    badgeLabel: "Demo funcional",
    description:
      "Mostrá productos configurables, calculá presupuestos en el momento y recibí solicitudes de compra ordenadas directamente por WhatsApp o email.",
    capabilities: [
      "Catálogo digital navegable con categorías y fotos reales",
      "Personalización de medidas, terminaciones y opciones a medida",
      "Envío de cotización estructurada lista para confirmar",
    ],
    theme: {
      accentName: "emerald",
      border: "border-emerald-500/25",
      borderHover: "hover:border-emerald-500/60",
      badgeBg: "bg-emerald-500/10",
      badgeText: "text-emerald-400",
      badgeBorder: "border-emerald-500/30",
      dotColor: "bg-emerald-400",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      ctaPrimary:
        "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-md shadow-emerald-500/20",
      linkHover: "hover:text-emerald-400",
    },
    primaryCta: {
      label: businessData.urls.customCommerceDemo
        ? "Probar demo en vivo"
        : "Demo temporalmente en actualización",
      href: businessData.urls.customCommerceDemo,
      isExternal: true,
    },
    secondaryCta: {
      label: "Ver caso de estudio",
      href: "/proyectos/custom-commerce",
    },
  },
  {
    id: "conciliador-cobros",
    name: "Control y Conciliación de Cobros",
    subtitle: "Conciliador de Pagos B2B",
    badgeLabel: "Demo interactiva",
    description:
      "Centralizá ventas con tarjetas, liquidaciones bancarias y billeteras digitales para detectar diferencias de dinero y comisiones indebidas.",
    capabilities: [
      "Cruce automático de liquidaciones (Visa, Master, MP, Naranja)",
      "Detección instantánea de sobrearanceles y comisiones extra",
      "Bandeja de diferencias para resolver desvíos paso a paso",
    ],
    theme: {
      accentName: "cyan",
      border: "border-cyan-500/25",
      borderHover: "hover:border-cyan-500/60",
      badgeBg: "bg-cyan-500/10",
      badgeText: "text-cyan-400",
      badgeBorder: "border-cyan-500/30",
      dotColor: "bg-cyan-400",
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      ctaPrimary:
        "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-md shadow-cyan-500/20",
      linkHover: "hover:text-cyan-400",
    },
    primaryCta: {
      label: "Explorar demo interactiva",
      href: "/demos/conciliador",
    },
    secondaryCta: {
      label: "Ver conciliaciones",
      href: "/demos/conciliador/conciliacion",
    },
  },
  {
    id: "portal-proveedores",
    name: "Portal de Autogestión para Proveedores",
    subtitle: "Portal B2B Grupo Atlas",
    badgeLabel: "Demo interactiva",
    description:
      "Un espacio seguro donde tus proveedores consultan órdenes de pago, certificados de retención y reclamos sin depender de llamadas ni correos.",
    capabilities: [
      "Consulta de órdenes de pago con certificados de retención (PDF)",
      "Control de vencimiento de legajos fiscales y seguros laborales",
      "Mesa de ayuda estructurada para seguimiento de reclamos",
    ],
    theme: {
      accentName: "blue",
      border: "border-blue-500/25",
      borderHover: "hover:border-blue-500/60",
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-400",
      badgeBorder: "border-blue-500/30",
      dotColor: "bg-blue-400",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      ctaPrimary:
        "bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20",
      linkHover: "hover:text-blue-400",
    },
    primaryCta: {
      label: "Explorar demo interactiva",
      href: "/demos/proveedores",
    },
    secondaryCta: {
      label: "Ver órdenes de pago",
      href: "/demos/proveedores/pagos",
    },
  },
];

export const SolutionsSection: React.FC = () => {
  return (
    <section id="soluciones" className="py-20 sm:py-28 border-b border-[#1E293B]/60 relative">
      <Container>
        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold">
                Soluciones Demostrables
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Recorridos reales con datos sintéticos</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] mt-2">
              Sistemas que podés probar ahora mismo
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] mt-2 leading-relaxed">
              Tres soluciones con interfaces reales diseñadas para resolver operativas de negocio específicas. Cada una con su propia identidad visual y flujo de uso.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-4 py-2.5 rounded-lg bg-[#111827] border border-[#1E293B] hover:border-slate-600 transition-colors"
            >
              <span>Ver comparativa completa</span>
              <ArrowRight className="w-4 h-4 text-[#60A5FA]" />
            </Link>
          </div>
        </div>

        {/* Grilla de 3 Soluciones con Peso Visual Idéntico e Identidad Cromática */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className={`rounded-2xl border ${sol.theme.border} ${sol.theme.borderHover} bg-[#111827] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:bg-[#131B2A] relative overflow-hidden group`}
            >
              {/* Contenido Principal */}
              <div className="space-y-5">
                {/* Header de la Card: Subtítulo + Badge cromático */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#1E293B]">
                  <span className="text-[11px] font-mono-tech uppercase text-slate-400 font-semibold tracking-wider">
                    {sol.subtitle}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${sol.theme.badgeBg} ${sol.theme.badgeText} ${sol.theme.badgeBorder}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${sol.theme.dotColor} ${
                        sol.id === "custom-commerce" ? "animate-pulse-live" : ""
                      }`}
                    />
                    {sol.badgeLabel}
                  </span>
                </div>

                {/* Título de la Solución */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {sol.name}
                </h3>

                {/* Frase / Explicación simple */}
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {sol.description}
                </p>

                {/* 3 Capacidades concretas con bullets limpios */}
                <div className="pt-2 space-y-2.5">
                  <span className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 font-semibold block">
                    Capacidades clave:
                  </span>
                  <ul className="space-y-2">
                    {sol.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span
                          className={`flex items-center justify-center w-4 h-4 rounded-full ${sol.theme.iconBg} ${sol.theme.iconColor} shrink-0 mt-0.5`}
                        >
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span className="leading-snug">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="pt-6 mt-6 border-t border-[#1E293B] space-y-2.5">
                {sol.primaryCta.isExternal ? (
                  sol.primaryCta.href ? (
                    <a
                      href={sol.primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg ${sol.theme.ctaPrimary} text-xs sm:text-sm transition-all`}
                    >
                      <span>{sol.primaryCta.label}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300/80 font-medium text-xs sm:text-sm select-none"
                      title="El enlace público hacia la demo en Netlify se encuentra en actualización"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                      <span>{sol.primaryCta.label}</span>
                    </div>
                  )
                ) : (
                  <Link
                    href={sol.primaryCta.href!}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg ${sol.theme.ctaPrimary} text-xs sm:text-sm transition-all`}
                  >
                    <span>{sol.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  href={sol.secondaryCta.href}
                  className={`w-full inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 ${sol.theme.linkHover} py-1.5 transition-colors`}
                >
                  <span>{sol.secondaryCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Teaser: Soluciones Adaptables en Exploración */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#090D16] border border-[#1E293B] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Soluciones que estoy explorando y adaptando
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Modelos de software con flujos validados, listos para implementar a medida para tu empresa
              </p>
            </div>
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-sky-400 hover:text-sky-300 transition"
            >
              <span>Ver catálogo completo (4 soluciones)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/soluciones/tradesquote"
              className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-sky-500/40 transition group space-y-2 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech font-bold text-sky-400 uppercase">
                  EN VALIDACIÓN
                </span>
                <span className="text-[10px] text-slate-500 font-mono-tech">Oficios / Obras</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition">
                TradesQuote
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                Aprobación de cambios de trabajo y adicionales en obra en menos de 60 segundos con foto y firma.
              </p>
            </Link>

            <Link
              href="/soluciones/checklist-rapido"
              className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-emerald-500/40 transition group space-y-2 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech font-bold text-emerald-400 uppercase">
                  ADAPTABLE
                </span>
                <span className="text-[10px] text-slate-500 font-mono-tech">Service Técnico</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                Checklist Rápido
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                Inspecciones guiadas offline para técnicos en campo, fotos anotadas y reportes PDF automáticos.
              </p>
            </Link>

            <Link
              href="/soluciones/cleanroute"
              className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-indigo-500/40 transition group space-y-2 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech font-bold text-indigo-400 uppercase">
                  CONCEPTO
                </span>
                <span className="text-[10px] text-slate-500 font-mono-tech">Rutas & Flotas</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                CleanRoute
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                Organización de visitas y hojas de ruta para cuadrillas móviles, ahorrando combustible y traslados.
              </p>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
