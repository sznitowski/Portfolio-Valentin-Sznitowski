"use client";

import React, { useEffect, useActionState, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  FileCheck,
  Camera,
  PenTool,
  Receipt,
  ArrowRight,
  ShieldCheck,
  WifiOff,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { submitLeadAction, trackEventAction, LeadSubmissionState } from "./actions";

const initialState: LeadSubmissionState = {};

interface VariantConfig {
  badge: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  defaultContent: string;
}

const VARIANTS: Record<string, VariantConfig> = {
  a: {
    badge: "TradesQuote · Para Electricistas y Plomeros Independientes",
    headline: "¿El cliente te cambió el trabajo cuando ya estabas en obra?",
    subheadline:
      "No regales horas de trabajo extra. Actualizá el precio, sacá una foto de la evidencia y obtené la aprobación firmada antes de seguir trabajando.",
    ctaText: "Quiero cobrar cada extra",
    defaultContent: "money_loss",
  },
  b: {
    badge: "TradesQuote · Cero Papeleo de Noche",
    headline: "Dejá de rehacer presupuestos de noche por cambios de último momento.",
    subheadline:
      "Aprobá adiciones de trabajo en 30 segundos directo desde el teléfono y generá la factura final con un solo toque sin rehacer nada.",
    ctaText: "Quiero ahorrarme el papeleo",
    defaultContent: "paperwork",
  },
  c: {
    badge: "TradesQuote · Respaldo y Evidencia en Obra",
    headline: "¿El cliente te pidió un extra de palabra y al momento de cobrar no lo recuerda?",
    subheadline:
      "Registrá la foto del imprevisto y la firma digital del cliente en el momento. Evidencia irrefutable para cobrar el 100% de lo trabajado.",
    ctaText: "Quiero respaldo en obra",
    defaultContent: "proof",
  },
};

export function TradesQuoteLandingClient() {
  const searchParams = useSearchParams();
  const rawVariant = (searchParams.get("variant") || "a").toLowerCase();
  const variantKey = VARIANTS[rawVariant] ? rawVariant : "a";
  const variant = VARIANTS[variantKey];

  const sourceParam = searchParams.get("utm_source") || "meta";
  const mediumParam = searchParams.get("utm_medium") || "paid_social";
  const campaignParam = searchParams.get("utm_campaign") || "tradesquote_probe_01";
  const contentParam = searchParams.get("utm_content") || variant.defaultContent;
  const pricingParam = searchParams.get("pricing");

  const formRef = useRef<HTMLDivElement>(null);
  const [state, formAction, isPending] = useActionState(submitLeadAction, initialState);

  const trackingMetadata = useMemo(
    () => ({
      variant: variantKey,
      campaign: campaignParam,
      source: sourceParam,
      medium: mediumParam,
      content: contentParam,
    }),
    [variantKey, campaignParam, sourceParam, mediumParam, contentParam]
  );

  useEffect(() => {
    // Track landing view on initial mount
    trackEventAction("landing_view", trackingMetadata);
  }, [trackingMetadata]);

  const handleCtaClick = () => {
    trackEventAction("cta_click", trackingMetadata);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
      const emailInput = formRef.current.querySelector("input[name='email']") as HTMLInputElement;
      if (emailInput) {
        setTimeout(() => emailInput.focus(), 500);
      }
    }
  };

  const pricingDisplay =
    pricingParam === "free"
      ? "100% gratis durante la fase beta de acceso anticipado"
      : pricingParam === "tbd"
      ? "Precio especial early-access por definir"
      : "Acceso anticipado gratuito para validación en obra (Cupos limitados)";

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f5f9] flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Notification Bar */}
      <header className="border-b border-sky-500/20 bg-sky-950/30 px-4 py-2 text-center text-xs text-sky-300 font-mono flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        <span>Fase de Validación de Mercado · Acceso Anticipado para Oficios</span>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* Dynamic Hero Section based on Variant */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{variant.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {variant.headline}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {variant.subheadline}
          </p>

          <div className="pt-2">
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold bg-sky-500 text-white hover:bg-sky-400 transition shadow-lg shadow-sky-500/20 active:scale-95 cursor-pointer"
            >
              <span>{variant.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] text-slate-400 mt-2 font-mono">
              Acceso anticipado gratuito · Sin tarjeta de crédito
            </div>
          </div>
        </div>

        {/* Visual Workflow (Understand in <= 5 seconds) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              <Zap className="w-4 h-4" />
              <span>Flujo en Obra (Menos de 60 segundos)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Paso a paso in situ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-750 text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">1. Presupuesto</div>
              <div className="text-[10px] text-slate-400">Cotización inicial</div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/40 text-center space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center mx-auto">
                <FileCheck className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-sky-300">2. Change Order</div>
              <div className="text-[10px] text-sky-400/80">Nuevo ítem extra</div>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-750 text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                <Camera className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">3. Foto Obra</div>
              <div className="text-[10px] text-slate-400">Evidencia visible</div>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-750 text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                <PenTool className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">4. Firma Cliente</div>
              <div className="text-[10px] text-slate-400">En tu pantalla</div>
            </div>

            {/* Step 5 */}
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-750 text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Receipt className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-emerald-300">5. Factura Lista</div>
              <div className="text-[10px] text-slate-400">Cobro sin disputa</div>
            </div>
          </div>
        </div>

        {/* 4 Core Features (Strictly uninflated) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Change Order Rápido</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Creá una adición de presupuesto en 30 segundos sin rehacer el documento ni calcular a mano.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Photo Evidence</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Sacá la foto del cableado o cañería imprevista. Queda sellada con hora en el reporte del cliente.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Firma en Pantalla</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                El cliente firma con el dedo directamente en tu teléfono antes de que empieces a tocar nada extra.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Works Offline</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Funciona al 100% en subsuelos, sótanos y zonas rurales sin cobertura móvil. Guarda todo localmente.
              </p>
            </div>
          </div>
        </div>

        {/* Lead Capture Form Card */}
        <div
          ref={formRef}
          id="access-form"
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/90 border border-sky-500/30 shadow-2xl max-w-lg mx-auto space-y-6"
        >
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-white">
              Sumate al Acceso Anticipado
            </h2>
            <p className="text-xs text-slate-400">
              {pricingDisplay}
            </p>
          </div>

          {state?.success ? (
            <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-emerald-200">
                {state.isDuplicate ? "¡Ya estás registrado!" : "¡Anotado exitosamente!"}
              </h3>
              <p className="text-xs text-emerald-300/80 leading-relaxed">
                {state.isDuplicate
                  ? "Ya teníamos tu email guardado. Te avisaremos apenas abramos cupos de prueba para tu oficio."
                  : "Te enviaremos un correo únicamente para avisarte sobre el acceso anticipado a TradesQuote."}
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              {/* Spam/Bot Honeypot field (hidden from human users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="b_company_fax"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Experiment Metadata Inputs */}
              <input type="hidden" name="variant" value={variantKey} />
              <input type="hidden" name="source" value={sourceParam} />
              <input type="hidden" name="medium" value={mediumParam} />
              <input type="hidden" name="campaign" value={campaignParam} />
              <input type="hidden" name="content" value={contentParam} />

              {state?.error && (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs text-center">
                  {state.error}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1.5">
                  Tu Correo Electrónico <span className="text-sky-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-750 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1.5">
                  Tu Oficio Principal <span className="text-slate-500">(Opcional)</span>
                </label>
                <select
                  name="trade"
                  defaultValue="electrician"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-750 text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                >
                  <option value="electrician">Electricista</option>
                  <option value="plumber">Plomero / Fontanero</option>
                  <option value="other">Otro oficio independiente</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold bg-sky-500 text-white hover:bg-sky-400 transition shadow-lg shadow-sky-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <span>{isPending ? "Registrando acceso..." : variant.ctaText}</span>
                {!isPending && <ArrowRight className="w-4 h-4" />}
              </button>

              {/* Privacy text strictly enforced */}
              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                Usaremos tu email únicamente para avisarte sobre el acceso anticipado a TradesQuote. Sin spam ni datos compartidos.
              </p>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 font-mono">
        <div>TradesQuote · Experiment Probe MVP</div>
        <div className="text-[10px] text-slate-600 mt-1">
          Página experimental privada para validación de demanda independiente.
        </div>
      </footer>
    </div>
  );
}
