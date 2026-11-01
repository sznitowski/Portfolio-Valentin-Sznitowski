"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Layers, MessageSquare, CheckCircle2 } from "lucide-react";
import { PortfolioSolution } from "@/data/solutions/catalog";
import { businessData } from "@/data/business";

interface SolutionHeroProps {
  solution: PortfolioSolution;
}

export function SolutionHero({ solution }: SolutionHeroProps) {
  const handleHeroCtaClick = () => {
    try {
      const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const trackingPayload = {
        event: "solution_cta_click",
        solution_slug: solution.slug,
        type: "whatsapp",
        location: "hero",
        timestamp: new Date().toISOString(),
        utm_source: urlParams?.get("utm_source") || undefined,
        utm_campaign: urlParams?.get("utm_campaign") || undefined,
      };
      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Function }).gtag === "function") {
        (window as unknown as { gtag: Function }).gtag("event", "solution_cta_click", trackingPayload);
      }
      if (typeof window !== "undefined") {
        const stored = JSON.parse(localStorage.getItem("solution_cta_clicks") || "[]");
        stored.push(trackingPayload);
        localStorage.setItem("solution_cta_clicks", JSON.stringify(stored.slice(-30)));
      }
      console.info("[COMMERCIAL SIGNAL]: Hero CTA Click", trackingPayload);
    } catch {
      // Non-blocking
    }
  };
  const accentStyles = {
    sky: {
      badgeBg: "bg-sky-500/10",
      badgeText: "text-sky-400",
      badgeBorder: "border-sky-500/30",
      buttonBg: "bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/20",
      chipBorder: "border-sky-500/20",
    },
    emerald: {
      badgeBg: "bg-emerald-500/10",
      badgeText: "text-emerald-400",
      badgeBorder: "border-emerald-500/30",
      buttonBg: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-emerald-500/20",
      chipBorder: "border-emerald-500/20",
    },
    indigo: {
      badgeBg: "bg-indigo-500/10",
      badgeText: "text-indigo-400",
      badgeBorder: "border-indigo-500/30",
      buttonBg: "bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/20",
      chipBorder: "border-indigo-500/20",
    },
    amber: {
      badgeBg: "bg-amber-500/10",
      badgeText: "text-amber-400",
      badgeBorder: "border-amber-500/30",
      buttonBg: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-amber-500/20",
      chipBorder: "border-amber-500/20",
    },
  }[solution.accentColor];

  const whatsappHref = businessData.whatsapp.isConfigured
    ? `https://wa.me/${(businessData.whatsapp.number || "").replace(/\D/g, "")}?text=${encodeURIComponent(solution.whatsappMessage)}`
    : `mailto:${businessData.email}?subject=${encodeURIComponent(`Consulta por solución: ${solution.name}`)}&body=${encodeURIComponent(solution.whatsappMessage)}`;

  return (
    <div className="space-y-6 pt-4 pb-12 border-b border-[var(--border-subtle)]">
      {/* Return to solutions index */}
      <div>
        <Link
          href="/soluciones"
          className="inline-flex items-center gap-2 text-xs font-mono-tech text-[var(--text-muted)] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Catálogo de Soluciones</span>
        </Link>
      </div>

      {/* Top Badges */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-tech font-bold uppercase tracking-wider border ${accentStyles.badgeBg} ${accentStyles.badgeText} ${accentStyles.badgeBorder}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{solution.statusLabel}</span>
        </span>

        <span className="text-[11px] font-mono-tech px-2.5 py-1 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
          Desarrollo Adaptable a Medida
        </span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
          {solution.headline}
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          {solution.subheadline}
        </p>
      </div>

      {/* Target & Scope Metadata Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono-tech">
        <div>
          <span className="text-[10px] text-[var(--text-muted)] uppercase block mb-1">
            Dirigido A
          </span>
          <span className="text-[var(--text-primary)] font-semibold leading-snug block">
            {solution.targetUser}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-[var(--text-muted)] uppercase block mb-1">
            Modalidad de Implementación
          </span>
          <span className="text-emerald-400 font-semibold block">
            Software propio sin comisiones
          </span>
        </div>

        <div>
          <span className="text-[10px] text-[var(--text-muted)] uppercase block mb-1">
            Tiempo Estimado de Adaptación
          </span>
          <span className="text-sky-400 font-semibold block">
            15 a 30 días según integración
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleHeroCtaClick}
          className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer ${accentStyles.buttonBg}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{solution.ctaText}</span>
        </a>

        <a
          href="#flujo-y-mockup"
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-sky-500/30 transition-all cursor-pointer"
        >
          <span>Ver cómo funciona</span>
          <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
        </a>
      </div>
    </div>
  );
}
