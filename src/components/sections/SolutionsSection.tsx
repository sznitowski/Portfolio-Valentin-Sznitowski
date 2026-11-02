"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { businessData } from "@/data/business";

interface RealProjectCard {
  id: string;
  name: string;
  subtitle: string;
  badgeLabel: string;
  whatItSolves: string;
  myRole: string;
  businessResult: string;
  theme: {
    border: string;
    borderHover: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    dotColor: string;
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

const realProjects: RealProjectCard[] = [
  {
    id: "custom-commerce",
    name: "Catálogo y Ventas a Medida",
    subtitle: "Custom Commerce",
    badgeLabel: "Demo en producción",
    whatItSolves: "Permite a clientes configurar productos por dimensiones y materiales, calculando el precio en el acto y enviando el pedido estructurado por WhatsApp.",
    myRole: "Desarrollo integral, cotizador dinámico e integración comercial",
    businessResult: "Elimina la demora de cotización manual y entrega pedidos listos para fabricar.",
    theme: {
      border: "border-emerald-500/25",
      borderHover: "hover:border-emerald-500/60",
      badgeBg: "bg-emerald-500/10",
      badgeText: "text-emerald-400",
      badgeBorder: "border-emerald-500/30",
      dotColor: "bg-emerald-400",
      ctaPrimary:
        "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-md shadow-emerald-500/20",
      linkHover: "hover:text-emerald-400",
    },
    primaryCta: {
      label: businessData.urls.customCommerceDemo
        ? "Probar demo en vivo"
        : "Demo en actualización",
      href: businessData.urls.customCommerceDemo,
      isExternal: true,
    },
    secondaryCta: {
      label: "Ver caso completo",
      href: "/proyectos/custom-commerce",
    },
  },
  {
    id: "conciliador-cobros",
    name: "Control y Conciliación de Cobros",
    subtitle: "Conciliador de Pagos B2B",
    badgeLabel: "Demo interactiva",
    whatItSolves: "Cruza ventas con tarjetas, billeteras y bancos para detectar diferencias de acreditación y comisiones indebidas.",
    myRole: "Motor de conciliación determinístico y bandeja de desvíos",
    businessResult: "Identifica sobrearanceles y retenciones incorrectas sin revisar planillas a mano.",
    theme: {
      border: "border-cyan-500/25",
      borderHover: "hover:border-cyan-500/60",
      badgeBg: "bg-cyan-500/10",
      badgeText: "text-cyan-400",
      badgeBorder: "border-cyan-500/30",
      dotColor: "bg-cyan-400",
      ctaPrimary:
        "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-md shadow-cyan-500/20",
      linkHover: "hover:text-cyan-400",
    },
    primaryCta: {
      label: "Explorar demo",
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
    whatItSolves: "Permite a proveedores consultar órdenes de pago, retenciones impositivas y reclamos de forma autónoma.",
    myRole: "Arquitectura web, área de autogestión y descarga de PDFs",
    businessResult: "Reduce llamadas y consultas repetitivas al departamento de administración.",
    theme: {
      border: "border-blue-500/25",
      borderHover: "hover:border-blue-500/60",
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-400",
      badgeBorder: "border-blue-500/30",
      dotColor: "bg-blue-400",
      ctaPrimary:
        "bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20",
      linkHover: "hover:text-blue-400",
    },
    primaryCta: {
      label: "Explorar demo",
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
    <section id="proyectos" className="py-20 sm:py-28 border-b border-[#1E293B]/60 relative">
      <div id="soluciones" className="absolute -top-10" />
      <Container>
        {/* PARTE 1: PROYECTOS Y DEMOS REALES */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
                Proyectos & Demos Reales
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Interfaces interactivas con datos de prueba</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] mt-2">
              Sistemas que podés probar ahora mismo
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] mt-2 leading-relaxed">
              Herramientas funcionales desarrolladas para resolver problemas operativos específicos de empresas y comercios.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-4 py-2.5 rounded-lg bg-[#111827] border border-[#1E293B] hover:border-slate-600 transition-colors"
            >
              <span>Ver soluciones adaptables</span>
              <ArrowRight className="w-4 h-4 text-[#60A5FA]" />
            </Link>
          </div>
        </div>

        {/* Grilla de 3 Proyectos Reales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {realProjects.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl border ${p.theme.border} ${p.theme.borderHover} bg-[#111827] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:bg-[#131B2A] relative overflow-hidden group`}
            >
              <div className="space-y-4">
                {/* Header de la Card */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#1E293B]">
                  <span className="text-[11px] font-mono-tech uppercase text-slate-400 font-semibold tracking-wider">
                    {p.subtitle}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${p.theme.badgeBg} ${p.theme.badgeText} ${p.theme.badgeBorder}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${p.theme.dotColor}`} />
                    {p.badgeLabel}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  {p.name}
                </h3>

                {/* Qué resuelve */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {p.whatItSolves}
                </p>

                {/* Mi Rol & Resultado de negocio */}
                <div className="pt-2 space-y-2 border-t border-[#1E293B]/80 text-xs">
                  <div>
                    <span className="text-[10px] font-mono-tech text-slate-500 uppercase block font-semibold">
                      Mi rol:
                    </span>
                    <span className="text-slate-300">{p.myRole}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-tech text-emerald-400 uppercase block font-semibold">
                      Resultado de negocio:
                    </span>
                    <span className="text-slate-300 font-medium">{p.businessResult}</span>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="pt-5 mt-5 border-t border-[#1E293B] space-y-2">
                {p.primaryCta.isExternal ? (
                  p.primaryCta.href ? (
                    <a
                      href={p.primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg ${p.theme.ctaPrimary} text-xs font-semibold transition-all`}
                    >
                      <span>{p.primaryCta.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300/80 font-medium text-xs select-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                      <span>{p.primaryCta.label}</span>
                    </div>
                  )
                ) : (
                  <Link
                    href={p.primaryCta.href!}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg ${p.theme.ctaPrimary} text-xs font-semibold transition-all`}
                  >
                    <span>{p.primaryCta.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                <Link
                  href={p.secondaryCta.href}
                  className={`w-full inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 ${p.theme.linkHover} py-1 transition-colors`}
                >
                  <span>{p.secondaryCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PARTE 2: MODELOS DE SOLUCIÓN ADAPTABLES (Diferenciados de proyectos) */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#090D16] border border-[#1E293B] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Modelos de Solución Adaptables
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Flujos de software validados listos para implementar con la identidad y operativa de tu empresa.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/soluciones/tradesquote"
              className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-sky-500/40 transition group space-y-2 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech font-bold text-sky-400 uppercase">
                  EN VALIDACIÓN
                </span>
                <span className="text-[10px] text-slate-500 font-mono-tech">Oficios</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition">
                TradesQuote
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aprobá adicionales en obra al instante con foto y firma del cliente en el celular.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-sky-400 group-hover:underline flex items-center gap-1">
                <span>Ver solución</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              href="/soluciones/checklist-rapido"
              className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-emerald-500/40 transition group space-y-2 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech font-bold text-emerald-400 uppercase">
                  ADAPTABLE
                </span>
                <span className="text-[10px] text-slate-500 font-mono-tech">Service</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                Checklist Rápido
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspecciones guiadas para técnicos en campo, fotos y reportes sin depender de WhatsApp.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-emerald-400 group-hover:underline flex items-center gap-1">
                <span>Ver solución</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              href="/soluciones/cleanroute"
              className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-indigo-500/40 transition group space-y-2 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech font-bold text-indigo-400 uppercase">
                  ADAPTABLE
                </span>
                <span className="text-[10px] text-slate-500 font-mono-tech">Cuadrillas</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                CleanRoute
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Organización de rutas y confirmación de visitas para servicios y facilities en domicilio.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-indigo-400 group-hover:underline flex items-center gap-1">
                <span>Ver solución</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              href="/soluciones/truckstock-lite"
              className="p-4 rounded-xl bg-[#111827] border border-slate-800 hover:border-amber-500/40 transition group space-y-2 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech font-bold text-amber-400 uppercase">
                  ADAPTABLE
                </span>
                <span className="text-[10px] text-slate-500 font-mono-tech">Repuestos</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                TruckStock Lite
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Control de materiales y repuestos asignados a vehículos para evitar faltantes en obra.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-amber-400 group-hover:underline flex items-center gap-1">
                <span>Ver solución</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
