import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRadarOpportunityDetail,
  getDistributionProbeLeads,
} from "@/lib/radar-client";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ProbeControlPanel } from "@/components/admin/ProbeControlPanel";
import {
  ArrowLeft,
  ExternalLink,
  ShieldAlert,
  Target,
  FileText,
  Activity,
  CheckCircle2,
  Calendar,
  Layers,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OpportunityDetailPage({ params }: DetailPageProps) {
  const resolvedParams = await params;
  const [res, leadsRes] = await Promise.all([
    getRadarOpportunityDetail(resolvedParams.slug),
    getDistributionProbeLeads(resolvedParams.slug),
  ]);

  if (!res.success) {
    if (res.isOffline) {
      return (
        <div className="p-8 surface-card rounded-xl border border-amber-500/30 text-amber-300">
          <h2 className="text-lg font-bold mb-2">Motor Radar Offline</h2>
          <p className="text-xs">
            No se pudo cargar la oportunidad porque la API FastAPI (127.0.0.1:8000) no responde.
          </p>
        </div>
      );
    }
    notFound();
  }

  const { opportunity: opp, signals, latest_audit, distribution_probe, kill_test } = res.data;
  const leads = leadsRes.success ? leadsRes.data : [];

  return (
    <div className="space-y-8">
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          href="/admin/idea-radar/opportunities"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a Oportunidades</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">
                {opp.title}
              </h1>
              <StatusBadge status={opp.status} />
            </div>
            <div className="text-xs font-mono-tech text-[var(--text-muted)] mt-1">
              Concept Slug: <span className="text-sky-400">{opp.slug}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)] font-mono-tech">
              Último visto: {opp.last_seen ? opp.last_seen.split("T")[0] : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
            Canonical Score
          </div>
          <div className="text-2xl font-bold font-mono-tech text-amber-400">
            {opp.canonical_score.toFixed(1)}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            Best histórico: {opp.best_score.toFixed(1)}
          </div>
        </div>

        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
            Confianza de Evidencia
          </div>
          <div className="text-2xl font-bold font-mono-tech text-emerald-400">
            {opp.evidence_confidence.toFixed(0)}%
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            Fuerza: {opp.evidence_strength}
          </div>
        </div>

        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
            Rondas Independientes
          </div>
          <div className="text-2xl font-bold font-mono-tech text-sky-400">
            {opp.independent_signal_rounds}x
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            Avistamientos: {opp.times_seen} (Generado: {opp.times_generated})
          </div>
        </div>

        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
            Diversidad de Fuentes
          </div>
          <div className="text-2xl font-bold font-mono-tech text-[var(--text-primary)]">
            {opp.unique_domains_count} / {opp.unique_source_types_count}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            Dominios / Tipos de Fuente
          </div>
        </div>
      </div>

      {/* Target User & Problem Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card p-5 rounded-xl border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Usuario Objetivo (Nicho Validado)</span>
          </div>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed">
            {opp.target_user || "No especificado."}
          </p>
          <div className="text-[11px] text-[var(--text-muted)] font-mono-tech pt-1">
            Categoría: <span className="capitalize text-[var(--text-secondary)]">{opp.category?.replace("_", " ")}</span>
          </div>
        </div>

        <div className="surface-card p-5 rounded-xl border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Problema Crítico de Mercado</span>
          </div>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed">
            {opp.core_problem || "No especificado."}
          </p>
          {opp.reason_codes && opp.reason_codes.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-2">
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Flags:</span>
              {opp.reason_codes.map((rc) => (
                <span
                  key={rc}
                  className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-rose-950/40 text-rose-300 border border-rose-500/25"
                >
                  {rc}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status Stages: Distribution Probe & Kill-Test State */}
      <div className="space-y-4">
        {/* Interactive Distribution Probe Control Panel */}
        <ProbeControlPanel
          slug={opp.slug}
          status={opp.distribution_probe_status}
          probe={distribution_probe}
          leads={leads}
        />

        {/* Kill Test State */}
        <div className="surface-card p-5 rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Product Kill-Test (Demanda Real)</span>
            </h3>
            <span className="text-xs font-mono-tech text-emerald-400 font-semibold">
              {kill_test ? kill_test.status : "NOT_STARTED"}
            </span>
          </div>

          {kill_test ? (
            <div className="space-y-2 text-xs text-[var(--text-secondary)]">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-[var(--bg-surface-elevated)] font-mono-tech">
                <div>Gasto: ${kill_test.spend.toFixed(2)}</div>
                <div>Clicks: {kill_test.clicks}</div>
                <div>Leads: {kill_test.leads}</div>
                <div>Conversiones: {kill_test.conversions}</div>
              </div>
              {kill_test.notes && (
                <p className="text-[11px] text-[var(--text-muted)] italic">
                  &ldquo;{kill_test.notes}&rdquo;
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-[var(--text-muted)]">
              El kill-test de producto aún no ha sido iniciado para esta oportunidad.
            </p>
          )}
        </div>
      </div>

      {/* Verified Independent Signals Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Señales Independientes Verificadas ({signals.length})
          </h2>
          <span className="text-xs text-[var(--text-muted)] font-mono-tech">
            Deduplicación primaria por URL normalizada
          </span>
        </div>

        <div className="surface-card rounded-xl border border-[var(--border-subtle)] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 text-[var(--text-muted)] font-mono-tech uppercase text-[10px]">
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Resumen de Señal</th>
                  <th className="py-3 px-3">Dominio</th>
                  <th className="py-3 px-3">Fuerza</th>
                  <th className="py-3 px-3">Fecha</th>
                  <th className="py-3 px-4 text-right">Enlace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {signals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-xs text-[var(--text-muted)]">
                      Sin señales individuales registradas.
                    </td>
                  </tr>
                ) : (
                  signals.map((sig) => (
                    <tr key={sig.id} className="hover:bg-[var(--bg-surface-elevated)]/30 transition">
                      <td className="py-3 px-4 font-mono-tech text-[11px] text-[var(--accent-primary)]">
                        {sig.signal_type}
                      </td>
                      <td className="py-3 px-4 text-[var(--text-primary)] max-w-md">
                        {sig.summary}
                      </td>
                      <td className="py-3 px-3 font-mono-tech text-[var(--text-secondary)]">
                        {sig.source_domain || "—"}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[11px]">
                        <span
                          className={
                            sig.strength === "STRONG"
                              ? "text-emerald-400"
                              : sig.strength === "MEDIUM"
                              ? "text-sky-400"
                              : "text-[var(--text-muted)]"
                          }
                        >
                          {sig.strength}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[11px] font-mono-tech text-[var(--text-muted)]">
                        {sig.observed_at ? sig.observed_at.split("T")[0] : "—"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {sig.normalized_url ? (
                          <a
                            href={sig.normalized_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[var(--accent-primary)] hover:underline text-[11px]"
                          >
                            <span>Fuente</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[var(--text-muted)]">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Latest Adversarial Audit (if exists) */}
      {latest_audit && (
        <div className="surface-card p-5 rounded-xl border border-[var(--border-subtle)] space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Última Auditoría Adversarial de Demanda</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono-tech text-[var(--text-muted)]">
              <span>Modelo: {latest_audit.model}</span>
              <span>Costo: ${latest_audit.cost_usd.toFixed(4)} USD</span>
              <span className="px-2 py-0.5 rounded font-bold bg-amber-950/40 text-amber-300 border border-amber-500/30">
                {latest_audit.verdict}
              </span>
            </div>
          </div>

          {Array.isArray(latest_audit.verdict_reasons) && latest_audit.verdict_reasons.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-semibold text-[var(--text-secondary)]">
                Argumentos del Veredicto:
              </div>
              <ul className="list-disc list-inside text-xs text-[var(--text-muted)] space-y-1">
                {latest_audit.verdict_reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
