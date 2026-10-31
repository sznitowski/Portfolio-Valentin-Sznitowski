"use client";

import React from "react";
import { MessageSquare, Mail, ArrowRight, Sparkles } from "lucide-react";
import { PortfolioSolution } from "@/data/solutions/catalog";
import { businessData } from "@/data/business";

interface SolutionCTAProps {
  solution: PortfolioSolution;
}

export function SolutionCTA({ solution }: SolutionCTAProps) {
  const accentStyles = {
    sky: {
      border: "border-sky-500/40",
      buttonBg: "bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/25",
      badgeText: "text-sky-300",
      badgeBg: "bg-sky-950/60",
    },
    emerald: {
      border: "border-emerald-500/40",
      buttonBg: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-emerald-500/25",
      badgeText: "text-emerald-300",
      badgeBg: "bg-emerald-950/60",
    },
    indigo: {
      border: "border-indigo-500/40",
      buttonBg: "bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/25",
      badgeText: "text-indigo-300",
      badgeBg: "bg-indigo-950/60",
    },
    amber: {
      border: "border-amber-500/40",
      buttonBg: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-amber-500/25",
      badgeText: "text-amber-300",
      badgeBg: "bg-amber-950/60",
    },
  }[solution.accentColor];

  const handleCtaClick = (type: "whatsapp" | "email") => {
    // Lightweight anonymous tracking for commercial interest signals
    try {
      const trackingPayload = {
        event: "solution_cta_click",
        solution_slug: solution.slug,
        type,
        timestamp: new Date().toISOString(),
      };
      if (typeof window !== "undefined") {
        const stored = JSON.parse(localStorage.getItem("solution_cta_clicks") || "[]");
        stored.push(trackingPayload);
        localStorage.setItem("solution_cta_clicks", JSON.stringify(stored.slice(-20)));
      }
      console.info("[COMMERCIAL SIGNAL]: CTA Click", trackingPayload);
    } catch {
      // Non-blocking
    }
  };

  const whatsappHref = businessData.whatsapp.isConfigured
    ? `https://wa.me/${(businessData.whatsapp.number || "").replace(/\D/g, "")}?text=${encodeURIComponent(solution.whatsappMessage)}`
    : `mailto:${businessData.email}?subject=${encodeURIComponent(`Consulta por solución: ${solution.name}`)}&body=${encodeURIComponent(solution.whatsappMessage)}`;

  const mailHref = `mailto:${businessData.email}?subject=${encodeURIComponent(`Consulta por solución: ${solution.name}`)}&body=${encodeURIComponent(solution.whatsappMessage)}`;

  return (
    <div
      id="contacto"
      className={`p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-surface-elevated)]/70 border ${accentStyles.border} shadow-2xl text-center space-y-6 max-w-3xl mx-auto`}
    >
      <div className="space-y-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-tech font-bold uppercase tracking-wider ${accentStyles.badgeBg} ${accentStyles.badgeText}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Desarrollo de Solución Adaptable</span>
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
          ¿Tu negocio necesita una herramienta similar?
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
          Podemos conversar sobre tus procesos actuales, evaluar los puntos de fricción y desarrollar una versión adaptada con tu marca y flujo específico.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleCtaClick("whatsapp")}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer ${accentStyles.buttonBg}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{solution.ctaText} (WhatsApp)</span>
        </a>

        <a
          href={mailHref}
          onClick={() => handleCtaClick("email")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-[var(--bg-primary)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-sky-500/30 transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4 text-[var(--text-muted)]" />
          <span>Consultar por Email</span>
        </a>
      </div>

      <div className="text-[11px] font-mono-tech text-[var(--text-muted)] pt-2">
        Respuesta directa y técnica en menos de 24 horas hábiles · Sin intermediarios
      </div>
    </div>
  );
}
