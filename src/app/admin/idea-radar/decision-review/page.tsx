import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Flame,
  Zap,
  Target,
  FileText,
  DollarSign,
  Smartphone,
  Cpu,
  Layers,
  Award,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { getRadarOpportunities } from "@/lib/radar-client";

export const dynamic = "force-dynamic";

interface PortfolioOpportunity {
  slug: string;
  name: string;
  category: string;
  score: number;
  confidence: number;
  rounds: number;
  pain: "HIGH" | "MEDIUM" | "LOW";
  wtp: "HIGH" | "MEDIUM" | "LOW";
  competition: "EXTREME" | "HIGH" | "MEDIUM" | "LOW";
  distribution: "VERY_HARD" | "HARD" | "MEDIUM" | "EASY";
  support: "HIGH" | "MEDIUM" | "LOW";
  mvpDays: number;
  techFit: number;
  businessScore: number;
  executionScore: number;
  readiness: number;
  expectedPrice: string;
  infraCost: string;
  classification: "ACTIVE" | "WATCH" | "REJECT";
  decision: "BUILD_NOW" | "VALIDATE_FIRST" | "WATCH" | "REJECT";
  rejectionReason?: string;
  hook5s: string;
  commercialUse: string;
  portfolioSlug?: string;
  portfolioStatus: "PAGE_READY" | "NOT_CREATED";
}

const PORTFOLIO_DATA: PortfolioOpportunity[] = [
  {
    slug: "contractors-quote_to_invoice",
    name: "TradesQuote",
    category: "micro_b2b",
    score: 61.6,
    confidence: 100,
    rounds: 3,
    pain: "HIGH",
    wtp: "HIGH",
    competition: "EXTREME",
    distribution: "HARD",
    support: "LOW",
    mvpDays: 16,
    techFit: 95,
    businessScore: 82,
    executionScore: 92,
    readiness: 88,
    expectedPrice: "$19.99/mes",
    infraCost: "$0/mes",
    classification: "ACTIVE",
    decision: "VALIDATE_FIRST",
    hook5s: "¿El cliente te cambió el trabajo en la obra y después te discutió el precio al cobrar? Hacé que te firme el cambio con foto en 30 segundos desde el celular.",
    commercialUse: "PRODUCT + PORTFOLIO",
    portfolioSlug: "tradesquote",
    portfolioStatus: "PAGE_READY",
  },
  {
    slug: "field_inspections-digitalizar_checklists",
    name: "Checklist Rápido",
    category: "micro_b2b",
    score: 66.3,
    confidence: 85,
    rounds: 1,
    pain: "MEDIUM",
    wtp: "MEDIUM",
    competition: "MEDIUM",
    distribution: "MEDIUM",
    support: "MEDIUM",
    mvpDays: 22,
    techFit: 85,
    businessScore: 68,
    executionScore: 74,
    readiness: 65,
    expectedPrice: "$25.00/mes",
    infraCost: "$10/mes",
    classification: "WATCH",
    decision: "WATCH",
    hook5s: "¿Tus técnicos te siguen mandando las fotos de las inspecciones desordenadas por WhatsApp? Generá reportes profesionales con firma antes de salir de la obra.",
    commercialUse: "PORTFOLIO + CUSTOM",
    portfolioSlug: "checklist-rapido",
    portfolioStatus: "PAGE_READY",
  },
  {
    slug: "cleaning-route_optimize",
    name: "CleanRoute",
    category: "micro_b2b",
    score: 59.5,
    confidence: 77,
    rounds: 1,
    pain: "MEDIUM",
    wtp: "LOW",
    competition: "MEDIUM",
    distribution: "MEDIUM",
    support: "MEDIUM",
    mvpDays: 20,
    techFit: 80,
    businessScore: 55,
    executionScore: 70,
    readiness: 58,
    expectedPrice: "$15.00/mes",
    infraCost: "$15/mes",
    classification: "WATCH",
    decision: "WATCH",
    hook5s: "¿Tus equipos de limpieza pierden 1 hora al día cruzando la ciudad de punta a punta? Optimizá los recorridos del día en 1 toque.",
    commercialUse: "PORTFOLIO + CUSTOM",
    portfolioSlug: "cleanroute",
    portfolioStatus: "PAGE_READY",
  },
  {
    slug: "truck_inventory-gestionar_piezas",
    name: "TruckStock Lite",
    category: "micro_b2b",
    score: 57.0,
    confidence: 100,
    rounds: 1,
    pain: "MEDIUM",
    wtp: "LOW",
    competition: "MEDIUM",
    distribution: "HARD",
    support: "LOW",
    mvpDays: 16,
    techFit: 90,
    businessScore: 52,
    executionScore: 78,
    readiness: 56,
    expectedPrice: "$12.00/mes",
    infraCost: "$0/mes",
    classification: "WATCH",
    decision: "WATCH",
    hook5s: "¿Llegaste a la obra y no tenías el repuesto en la camioneta? Llevá el control de stock de tus repuestos en 1 minuto desde el celular.",
    commercialUse: "PORTFOLIO + CUSTOM",
    portfolioSlug: "truckstock-lite",
    portfolioStatus: "PAGE_READY",
  },
  {
    slug: "msp_billing-reconciliar_antes_facturar",
    name: "PreInvoice QA",
    category: "micro_b2b",
    score: 61.8,
    confidence: 100,
    rounds: 1,
    pain: "HIGH",
    wtp: "HIGH",
    competition: "HIGH",
    distribution: "HARD",
    support: "HIGH",
    mvpDays: 50,
    techFit: 50,
    businessScore: 65,
    executionScore: 30,
    readiness: 42,
    expectedPrice: "$150.00/mes",
    infraCost: "$25/mes",
    classification: "REJECT",
    decision: "REJECT",
    rejectionReason: "Integraciones enterprise con APIs cerradas (ConnectWise, Datto) y alta responsabilidad por errores de facturación.",
    hook5s: "¿Cuántas licencias de Microsoft estás pagando este mes que te olvidaste de cobrarle a tus clientes?",
    commercialUse: "CUSTOM ONLY (MSP)",
    portfolioStatus: "NOT_CREATED",
  },
  {
    slug: "supplier_invoices-digitalizar_facturas",
    name: "InboxFactura",
    category: "micro_b2b",
    score: 57.2,
    confidence: 100,
    rounds: 1,
    pain: "MEDIUM",
    wtp: "LOW",
    competition: "MEDIUM",
    distribution: "HARD",
    support: "HIGH",
    mvpDays: 22,
    techFit: 70,
    businessScore: 48,
    executionScore: 45,
    readiness: 40,
    expectedPrice: "$10.00/mes",
    infraCost: "$15/mes",
    classification: "REJECT",
    decision: "REJECT",
    rejectionReason: "Reemplazable por ChatGPT en WhatsApp, bajo WTP de micropymes y alto costo de soporte por facturas mal leídas.",
    hook5s: "Dejá de revolver 20 chats de WhatsApp buscando las facturas que te mandaron los proveedores para el contador.",
    commercialUse: "CUSTOM ONLY (Intake)",
    portfolioStatus: "NOT_CREATED",
  },
  {
    slug: "landlord-inspection_reports",
    name: "TenantCheck",
    category: "prosumer",
    score: 62.2,
    confidence: 100,
    rounds: 2,
    pain: "HIGH",
    wtp: "MEDIUM",
    competition: "HIGH",
    distribution: "HARD",
    support: "HIGH",
    mvpDays: 30,
    techFit: 75,
    businessScore: 50,
    executionScore: 42,
    readiness: 38,
    expectedPrice: "$14.00/mes",
    infraCost: "$10/mes",
    classification: "REJECT",
    decision: "REJECT",
    rejectionReason: "Riesgo regulatorio por leyes de alquileres dispares y responsabilidad en disputas de depósitos.",
    hook5s: "Reportes move-in/out con fotos y firmas para evitar que los inquilinos destruyan tu propiedad.",
    commercialUse: "REJECT",
    portfolioStatus: "NOT_CREATED",
  },
  {
    slug: "permits-track_status",
    name: "PermitPulse",
    category: "micro_b2b",
    score: 46.3,
    confidence: 70,
    rounds: 1,
    pain: "MEDIUM",
    wtp: "LOW",
    competition: "HIGH",
    distribution: "VERY_HARD",
    support: "HIGH",
    mvpDays: 40,
    techFit: 60,
    businessScore: 35,
    executionScore: 25,
    readiness: 22,
    expectedPrice: "$19.00/mes",
    infraCost: "$15/mes",
    classification: "REJECT",
    decision: "REJECT",
    rejectionReason: "Fragmentación municipal extrema (cientos de portales sin APIs públicas y captchas).",
    hook5s: "Seguí el estado de aprobación de tus permisos municipales sin llamar todos los días a la secretaría.",
    commercialUse: "REJECT",
    portfolioStatus: "NOT_CREATED",
  },
  {
    slug: "subscriptionsift_auditor_negociador_de_suscripcion",
    name: "SubscriptionSift",
    category: "b2c",
    score: 37.6,
    confidence: 62,
    rounds: 1,
    pain: "MEDIUM",
    wtp: "LOW",
    competition: "EXTREME",
    distribution: "VERY_HARD",
    support: "HIGH",
    mvpDays: 35,
    techFit: 55,
    businessScore: 25,
    executionScore: 20,
    readiness: 18,
    expectedPrice: "$4.99/mes",
    infraCost: "$30/mes",
    classification: "REJECT",
    decision: "REJECT",
    rejectionReason: "Finanzas B2C, dependencia de Plaid, alto CAC e inviable soporte humano para cancelaciones.",
    hook5s: "Descubrí qué suscripciones te están cobrando sin que te des cuenta.",
    commercialUse: "REJECT",
    portfolioStatus: "NOT_CREATED",
  },
];

export default async function DecisionReviewPage() {
  const top1 = PORTFOLIO_DATA[0]; // TradesQuote
  const top2 = PORTFOLIO_DATA[1]; // Checklist Rápido
  const top3 = PORTFOLIO_DATA[2]; // CleanRoute

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech uppercase bg-[var(--accent-subtle)] border border-[var(--accent-primary)]/30 text-[var(--accent-primary)]">
              Fase 9 · Full Portfolio Review
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono-tech">
              Audit Consolidada
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1">
            Relevamiento Integral del Portfolio & Decisión de Desarrollo
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Evaluación comparativa de las 9 oportunidades: descarte de inviables, selección de TOP 3 y blueprint de desarrollo.
          </p>
        </div>

        <Link
          href="/admin/idea-radar/opportunities"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition self-start sm:self-auto"
        >
          <span>Ver Oportunidades</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* BEST CANDIDATE HIGHLIGHT BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-[var(--bg-surface)] to-[var(--bg-surface)] border-2 border-sky-500/50 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  BEST TO START DEVELOPING
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold">
                  DECISIÓN: VALIDATE_FIRST
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-rose-950/60 text-rose-300 border border-rose-500/30 font-bold">
                  DEVELOP NOW: NO (NO_BUILD_YET)
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
                TradesQuote — Estimador y Change-Orders en Obra en 60s
              </h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                Ganador inequívoco tras el relevamiento del 100% del portfolio. Ataca una fuga directa de dinero en técnicos independientes ($100–$300/semana en cambios discutidos), arquitectura móvil en Flutter 100% offline-first con $0/mes de infraestructura requerida. El paso previo mandatorio es ejecutar el Distribution Probe de $20 USD antes de iniciar la construcción del MVP en 16 días.
              </p>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col gap-2 shrink-0">
            <Link
              href="/admin/idea-radar/opportunities/contractors-quote_to_invoice"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 text-white hover:bg-sky-400 transition shadow-sm"
            >
              <span>Ficha Técnica TradesQuote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/experiments/tradesquote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sky-400 hover:text-sky-300 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Landing Probe</span>
            </Link>
          </div>
        </div>

        {/* Highlight Score Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-3 border-t border-[var(--border-subtle)]">
          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] font-mono-tech text-center">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Readiness</div>
            <div className="text-sm font-bold text-sky-400">{top1.readiness} / 100</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] font-mono-tech text-center">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Execution Fit</div>
            <div className="text-sm font-bold text-emerald-400">{top1.executionScore} / 100</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] font-mono-tech text-center">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Business Score</div>
            <div className="text-sm font-bold text-amber-400">{top1.businessScore} / 100</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] font-mono-tech text-center">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">MVP Speed</div>
            <div className="text-sm font-bold text-white">16 Días</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] font-mono-tech text-center">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Costo Infra</div>
            <div className="text-sm font-bold text-emerald-400">$0.00 / mes</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] font-mono-tech text-center">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Soporte</div>
            <div className="text-sm font-bold text-emerald-400">LOW</div>
          </div>
        </div>
      </div>

      {/* TOP 3 FINAL DEEP DIVE CARDS */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            TOP 3 Final: Evaluación Exhaustiva
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Comparación granular de los 3 finalistas seleccionados del inventario completo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Card 1: TradesQuote */}
          <div className="surface-card p-5 rounded-2xl border-2 border-sky-500/50 relative flex flex-col justify-between shadow-xl bg-gradient-to-b from-sky-950/20 to-[var(--bg-surface)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-tech uppercase font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  TOP 1 · BEST CANDIDATE
                </span>
                <span className="text-xs font-mono-tech text-emerald-400 font-bold">
                  Readiness {top1.readiness}/100
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
                  {top1.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Estimados, change-orders y firma in situ en 60s
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] text-center font-mono-tech text-xs">
                <div>
                  <div className="text-[9px] text-[var(--text-muted)]">BIZ</div>
                  <div className="font-bold text-amber-400">{top1.businessScore}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[var(--text-muted)]">EXEC</div>
                  <div className="font-bold text-emerald-400">{top1.executionScore}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[var(--text-muted)]">MVP</div>
                  <div className="font-bold text-white">{top1.mvpDays}d</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Pricing Estimado:</span>
                  <span className="font-mono-tech font-bold text-emerald-400">{top1.expectedPrice}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Costo Infra MVP:</span>
                  <span className="font-mono-tech font-bold text-emerald-400">{top1.infraCost}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Distribución:</span>
                  <span className="font-mono-tech text-amber-400 font-semibold">{top1.distribution}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Soporte Técnico:</span>
                  <span className="font-mono-tech text-emerald-400 font-semibold">{top1.support}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Riesgo General:</span>
                  <span className="font-mono-tech text-emerald-400 font-semibold">LOW</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-snug">
                <strong className="text-sky-300 font-mono-tech text-[10px] block mb-0.5">POR QUÉ ES EL GANADOR:</strong>
                Resuelve un dolor agudo e inmediato de cobro. Arquitectura móvil cerrada (Flutter + SQLite local), 0 dependencias externas caras y no puede ser sustituida por ChatGPT.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase bg-amber-950/60 text-amber-300 border border-amber-500/30">
                VALIDATE_FIRST
              </span>
              <Link
                href="/admin/idea-radar/opportunities/contractors-quote_to_invoice"
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <span>Ficha Detallada</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Checklist Rápido */}
          <div className="surface-card p-5 rounded-2xl border border-[var(--border-subtle)] relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-tech uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  TOP 2
                </span>
                <span className="text-xs font-mono-tech text-amber-400 font-bold">
                  Readiness {top2.readiness}/100
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
                  {top2.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Inspecciones offline para técnicos de campo (HVAC/fontanería)
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] text-center font-mono-tech text-xs">
                <div>
                  <div className="text-[9px] text-[var(--text-muted)]">BIZ</div>
                  <div className="font-bold text-amber-400">{top2.businessScore}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[var(--text-muted)]">EXEC</div>
                  <div className="font-bold text-emerald-400">{top2.executionScore}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[var(--text-muted)]">MVP</div>
                  <div className="font-bold text-white">{top2.mvpDays}d</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Pricing Estimado:</span>
                  <span className="font-mono-tech font-bold text-emerald-400">{top2.expectedPrice}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Costo Infra MVP:</span>
                  <span className="font-mono-tech font-bold text-amber-400">{top2.infraCost}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Distribución:</span>
                  <span className="font-mono-tech text-sky-400 font-semibold">{top2.distribution}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Soporte Técnico:</span>
                  <span className="font-mono-tech text-amber-400 font-semibold">{top2.support}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Riesgo General:</span>
                  <span className="font-mono-tech text-amber-400 font-semibold">MEDIUM</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-snug">
                <strong className="text-amber-300 font-mono-tech text-[10px] block mb-0.5">POR QUÉ NO DESARROLLAR PRIMERO:</strong>
                Solo 1 ronda independiente. Riesgo alto de quedar atrapado atendiendo pedidos de plantillas a medida para cada oficio particular.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                WATCH
              </span>
              <Link
                href="/admin/idea-radar/opportunities/field_inspections-digitalizar_checklists"
                className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
              >
                <span>Ficha Detallada</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: CleanRoute */}
          <div className="surface-card p-5 rounded-2xl border border-[var(--border-subtle)] relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-tech uppercase font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  TOP 3
                </span>
                <span className="text-xs font-mono-tech text-slate-300 font-bold">
                  Readiness {top3.readiness}/100
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
                  {top3.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Rutas y scheduling económico para agencias de limpieza
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] text-center font-mono-tech text-xs">
                <div>
                  <div className="text-[9px] text-[var(--text-muted)]">BIZ</div>
                  <div className="font-bold text-amber-400">{top3.businessScore}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[var(--text-muted)]">EXEC</div>
                  <div className="font-bold text-emerald-400">{top3.executionScore}</div>
                </div>
                <div>
                  <div className="text-[9px] text-[var(--text-muted)]">MVP</div>
                  <div className="font-bold text-white">{top3.mvpDays}d</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Pricing Estimado:</span>
                  <span className="font-mono-tech font-bold text-amber-400">{top3.expectedPrice}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Costo Infra MVP:</span>
                  <span className="font-mono-tech font-bold text-rose-400">{top3.infraCost}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Distribución:</span>
                  <span className="font-mono-tech text-sky-400 font-semibold">{top3.distribution}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                  <span className="text-[var(--text-muted)]">Soporte Técnico:</span>
                  <span className="font-mono-tech text-amber-400 font-semibold">{top3.support}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Riesgo General:</span>
                  <span className="font-mono-tech text-rose-400 font-semibold">MEDIUM-HIGH</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-snug">
                <strong className="text-slate-300 font-mono-tech text-[10px] block mb-0.5">POR QUÉ NO DESARROLLAR PRIMERO:</strong>
                WTP muy bajo ($15/mo) y alto churn estacional. Las APIs de geocodificación y mapas agregan costo fijo por usuario desde el día uno.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                WATCH
              </span>
              <Link
                href="/admin/idea-radar/opportunities/cleaning-route_optimize"
                className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
              >
                <span>Ficha Detallada</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FULL PORTFOLIO GLOBAL MATRIX (ALL 9 OPPORTUNITIES) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Matriz Completa del Portfolio (9 Oportunidades en SQLite)
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Relevamiento homogéneo con métricas normalizadas de atractivo comercial, viabilidad de ejecución y preparación.
          </p>
        </div>

        <div className="surface-card rounded-xl border border-[var(--border-subtle)] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/60 text-[var(--text-muted)] font-mono-tech uppercase text-[10px]">
                  <th className="py-3 px-4">Oportunidad</th>
                  <th className="py-3 px-3 text-center">Score</th>
                  <th className="py-3 px-3 text-center">Conf.</th>
                  <th className="py-3 px-3 text-center">Rondas</th>
                  <th className="py-3 px-3">Pain</th>
                  <th className="py-3 px-3">WTP</th>
                  <th className="py-3 px-3 text-center">Biz Score</th>
                  <th className="py-3 px-3 text-center">Exec Score</th>
                  <th className="py-3 px-3 text-center">Readiness</th>
                  <th className="py-3 px-3 text-center">MVP</th>
                  <th className="py-3 px-3 text-center">Infra</th>
                  <th className="py-3 px-3 text-center">Tech Fit</th>
                  <th className="py-3 px-3 text-center">Uso Comercial</th>
                  <th className="py-3 px-3 text-center">Portfolio Page</th>
                  <th className="py-3 px-4 text-center">Veredicto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {PORTFOLIO_DATA.map((opp) => (
                  <tr
                    key={opp.slug}
                    className={`transition hover:bg-[var(--bg-surface-elevated)]/40 ${
                      opp.slug === "contractors-quote_to_invoice"
                        ? "bg-sky-950/20 font-medium"
                        : opp.classification === "REJECT"
                        ? "opacity-60"
                        : ""
                    }`}
                  >
                    <td className="py-3.5 px-4 text-[var(--text-primary)]">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/idea-radar/opportunities/${opp.slug}`}
                          className="hover:text-sky-400 transition font-bold"
                        >
                          {opp.name}
                        </Link>
                        {opp.slug === "contractors-quote_to_invoice" && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono-tech bg-sky-500/20 text-sky-300 border border-sky-500/40">
                            BEST
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono-tech text-[var(--text-muted)] truncate max-w-xs">
                        {opp.slug}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech font-bold">
                      <span className={opp.score >= 60 ? "text-sky-400" : "text-[var(--text-muted)]"}>
                        {opp.score.toFixed(1)}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech text-[var(--text-secondary)]">
                      {opp.confidence.toFixed(0)}%
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech text-sky-400">
                      {opp.rounds}x
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono-tech font-semibold ${
                          opp.pain === "HIGH"
                            ? "bg-emerald-950/50 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-950/50 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {opp.pain}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-[11px] font-mono-tech">
                      <span
                        className={
                          opp.wtp === "HIGH"
                            ? "text-emerald-400"
                            : opp.wtp === "MEDIUM"
                            ? "text-amber-400"
                            : "text-slate-400"
                        }
                      >
                        {opp.wtp}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech font-bold text-amber-400">
                      {opp.businessScore}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech font-bold text-emerald-400">
                      {opp.executionScore}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech font-bold text-sky-400">
                      {opp.readiness}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech text-[var(--text-primary)]">
                      {opp.mvpDays}d
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech text-[var(--text-muted)]">
                      {opp.infraCost}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech text-emerald-400">
                      {opp.techFit}%
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-mono-tech font-bold uppercase whitespace-nowrap ${
                          opp.commercialUse.includes("PRODUCT")
                            ? "bg-sky-950 text-sky-300 border border-sky-500/30"
                            : opp.commercialUse.includes("PORTFOLIO")
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                            : opp.commercialUse.includes("CUSTOM")
                            ? "bg-indigo-950 text-indigo-300 border border-indigo-500/30"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        {opp.commercialUse}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono-tech text-[10px]">
                      {opp.portfolioStatus === "PAGE_READY" && opp.portfolioSlug ? (
                        <Link
                          href={`/soluciones/${opp.portfolioSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sky-300 hover:text-white font-bold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/40 transition"
                        >
                          <span>PAGE READY</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      ) : (
                        <span className="text-slate-600">NOT CREATED</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase tracking-wider ${
                          opp.decision === "VALIDATE_FIRST" || opp.decision === "BUILD_NOW"
                            ? "bg-sky-950/60 text-sky-300 border border-sky-500/40"
                            : opp.decision === "WATCH"
                            ? "bg-amber-950/40 text-amber-300 border border-amber-500/30"
                            : "bg-rose-950/40 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {opp.decision.replace(/_/g, " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
