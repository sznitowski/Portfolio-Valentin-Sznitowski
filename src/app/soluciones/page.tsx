import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Cpu,
  ChevronRight,
} from "lucide-react";
import { PORTFOLIO_SOLUTIONS } from "@/data/solutions/catalog";
import { solutionsData } from "@/data/demos/solutions";
import { businessData } from "@/data/business";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Catálogo de Soluciones de Software para Negocios | Valentín Sznitowski",
  description:
    "Soluciones de software y herramientas operativas listas para adaptar: presupuestos en obra, inspecciones técnicas, optimización de rutas e inventario móvil.",
  alternates: {
    canonical: `${businessData.urls.portfolio}/soluciones`,
  },
  openGraph: {
    title: "Catálogo de Soluciones de Software para Negocios | Valentín Sznitowski",
    description:
      "Soluciones de software y herramientas operativas listas para adaptar: presupuestos en obra, inspecciones técnicas, optimización de rutas e inventario móvil.",
    url: `${businessData.urls.portfolio}/soluciones`,
    type: "website",
  },
};

export default function SolucionesPage() {
  return (
    <div className="py-20 sm:py-28 min-h-screen">
      <Container>
        {/* Breadcrumb & Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono-tech text-[var(--text-muted)] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la portada principal</span>
          </Link>
        </div>

        {/* Editorial Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-sky-400 font-bold">
              Desarrollo de Software & Automatización B2B
            </span>
            <span className="text-[11px] font-mono-tech px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/25">
              4 Conceptos Adaptables + 3 Demos en Vivo
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Catálogo de Soluciones de Software
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Sistemas web y móviles diseñados para resolver fricciones operativas concretas: cobranzas in-situ, inspecciones técnicas, despacho de cuadrillas y control de stock. Cada solución puede adaptarse e integrarse a la medida de tu empresa.
          </p>
        </div>

        {/* SECTION 1: SOLUCIONES LISTAS PARA ADAPTAR (RADAR CONCEPTS) */}
        <section className="space-y-8 mb-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  Soluciones Listas para Adaptar
                </h2>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1 font-mono-tech">
                Arquitecturas conceptuales verificadas y modeladas para desarrollo a medida
              </p>
            </div>
            <span className="text-xs font-mono-tech text-emerald-400 font-semibold">
              4 Modelos Disponibles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_SOLUTIONS.map((sol) => {
              const borderAccent = {
                sky: "hover:border-sky-500/50 group-hover:border-sky-500/30",
                emerald: "hover:border-emerald-500/50 group-hover:border-emerald-500/30",
                indigo: "hover:border-indigo-500/50 group-hover:border-indigo-500/30",
                amber: "hover:border-amber-500/50 group-hover:border-amber-500/30",
              }[sol.accentColor];

              const badgeAccent = {
                sky: "bg-sky-500/10 text-sky-300 border-sky-500/30",
                emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
                indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
                amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
              }[sol.accentColor];

              const buttonAccent = {
                sky: "bg-sky-500/10 hover:bg-sky-500 text-sky-300 hover:text-white border-sky-500/30",
                emerald: "bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold border-emerald-500/30",
                indigo: "bg-indigo-500/10 hover:bg-indigo-500 text-indigo-300 hover:text-white border-indigo-500/30",
                amber: "bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold border-amber-500/30",
              }[sol.accentColor];

              return (
                <div
                  key={sol.id}
                  className={`group p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] transition-all flex flex-col justify-between space-y-5 ${borderAccent}`}
                >
                  <div className="space-y-3.5">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono-tech font-bold uppercase px-2.5 py-0.5 rounded-full border ${badgeAccent}`}>
                        {sol.statusLabel}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] group-hover:text-white transition">
                        {sol.name}
                      </h3>
                      <div className="text-xs font-mono-tech text-[var(--accent-primary)] font-semibold mt-0.5">
                        {sol.tagline}
                      </div>
                    </div>

                    {/* One-line business problem (15-35 palabras) */}
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      &quot;{sol.oneLineProblem}&quot;
                    </p>

                    {/* Target user */}
                    <div className="text-xs text-[var(--text-secondary)] pt-1">
                      <span className="text-[var(--text-primary)] font-mono-tech text-[11px] font-semibold mr-1.5">
                        Para:
                      </span>
                      <span className="text-slate-400">{sol.targetUserShort}</span>
                    </div>
                  </div>

                  {/* CTA link to detailed landing */}
                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[11px] font-mono-tech text-[var(--text-muted)]">
                      Demostración interactiva
                    </span>
                    <Link
                      href={`/soluciones/${sol.slug}?source=solutions_index`}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${buttonAccent}`}
                    >
                      <span>Ver solución</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: CASOS EN PRODUCCIÓN Y DEMOS INTERACTIVAS EXISTENTES */}
        <section className="space-y-8 pt-8 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  Plataformas en Producción y Demos Interactivas
                </h2>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1 font-mono-tech">
                Sistemas ya construidos con interfaces navegables y casos de estudio
              </p>
            </div>
            <span className="text-xs font-mono-tech text-slate-400 font-semibold">
              3 Casos Completos
            </span>
          </div>

          <div className="space-y-8">
            {solutionsData.map((item) => (
              <article
                key={item.id}
                className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-tech text-emerald-400 font-bold uppercase">
                      {item.badge}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs font-mono-tech text-[var(--text-muted)]">
                      {item.statusLabel}
                    </span>
                  </div>
                  <span className="text-xs font-mono-tech text-slate-400">
                    {item.subtitle}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.tagline}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.solutionSummary}
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-2 pt-2 lg:pt-0">
                    {item.isExternalDemo && item.demoUrl ? (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition"
                      >
                        <span>Abrir Demo en Vivo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : item.demoUrl ? (
                      <Link
                        href={item.demoUrl}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-500 text-white hover:bg-sky-400 transition"
                      >
                        <span>Recorrer Demo Interactiva</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : null}

                    {item.secondaryUrl && (
                      <Link
                        href={item.secondaryUrl}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-slate-300 hover:text-white transition"
                      >
                        <span>{item.secondaryLabel || "Ver detalle"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
