import React from "react";
import Link from "next/link";
import {
  getRadarOverview,
  getRadarOpportunities,
} from "@/lib/radar-client";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  Activity,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  RefreshCw,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function IdeaRadarDashboardPage() {
  const [overviewRes, opportunitiesRes] = await Promise.all([
    getRadarOverview(),
    getRadarOpportunities(),
  ]);

  const isOffline = !overviewRes.success && overviewRes.isOffline;
  const overview = overviewRes.success ? overviewRes.data : null;
  const opportunities = opportunitiesRes.success ? opportunitiesRes.data : [];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Radar Control Center
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-tech ${
                !isOffline
                  ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                  : "bg-amber-950/40 text-amber-400 border border-amber-500/30"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  !isOffline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span>{!isOffline ? "MOTOR ONLINE" : "RADAR OFFLINE"}</span>
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Monitoreo autónomo de micro-SaaS y validación empírica de demanda de mercado.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/idea-radar/runs"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Ver Runs</span>
          </Link>
          <Link
            href="/admin/idea-radar/opportunities"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] transition shadow-sm"
          >
            <span>Ver Oportunidades</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Offline Alert Warning */}
      {isOffline && (
        <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-amber-200">
              Motor FastAPI no disponible (127.0.0.1:8000)
            </h3>
            <p className="text-xs text-amber-300/80 leading-relaxed">
              El frontend Next.js no pudo establecer conexión con el servidor FastAPI.
              Para activar el motor localmente, ejecutá en la terminal de Radar:
            </p>
            <div className="font-mono-tech text-[11px] bg-black/40 px-3 py-1.5 rounded text-amber-300 select-all inline-block mt-1">
              uvicorn api:app --reload --host 127.0.0.1 --port 8000
            </div>
          </div>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Card 1: Runs Today */}
        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Runs Hoy</span>
            <Activity className="w-4 h-4 text-[var(--accent-primary)]" />
          </div>
          <div className="text-2xl font-bold font-mono-tech text-[var(--text-primary)]">
            {overview ? overview.runs_today : "—"}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            Ciclos de scraping ejecutados
          </div>
        </div>

        {/* Card 2: Cost Today */}
        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Costo API Hoy</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono-tech text-emerald-400">
            {overview ? `$${overview.api_cost_today.toFixed(4)}` : "—"}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            Límite diario: $1.00 USD
          </div>
        </div>

        {/* Card 3: Total Opportunities */}
        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Ideas</span>
            <Database className="w-4 h-4 text-[var(--text-secondary)]" />
          </div>
          <div className="text-2xl font-bold font-mono-tech text-[var(--text-primary)]">
            {overview ? overview.opportunities.total : "—"}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            En base SQLite acumulada
          </div>
        </div>

        {/* Card 4: Promising */}
        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Promising</span>
            <Flame className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono-tech text-sky-400">
            {overview ? overview.opportunities.promising : "—"}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            Score ≥ 60 & Rondas ≥ 2
          </div>
        </div>

        {/* Card 5: Validation Required */}
        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Validation Req</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono-tech text-amber-400">
            {overview ? overview.opportunities.validation_required : "—"}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            Score ≥ 68 & Rondas ≥ 3
          </div>
        </div>

        {/* Card 6: Build Candidates */}
        <div className="surface-card p-4 rounded-xl border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Build Candidate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono-tech text-emerald-400">
            {overview ? overview.opportunities.build_candidate : "—"}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-1">
            Kill-Test Aprobado (PASS)
          </div>
        </div>
      </div>

      {/* Top Opportunities Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Top Oportunidades por Score Canónico
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Ranking ordenado sin inflación según scoring anti-competencia y recurrencia independiente.
            </p>
          </div>
          <Link
            href="/admin/idea-radar/opportunities"
            className="text-xs font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition flex items-center gap-1"
          >
            <span>Ver todas ({opportunities.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="surface-card rounded-xl border border-[var(--border-subtle)] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 text-[var(--text-muted)] font-mono-tech uppercase text-[10px]">
                  <th className="py-3 px-4">Oportunidad</th>
                  <th className="py-3 px-3">Categoría</th>
                  <th className="py-3 px-3 text-center">Score</th>
                  <th className="py-3 px-3 text-center">Confianza</th>
                  <th className="py-3 px-3 text-center">Rondas</th>
                  <th className="py-3 px-3">Estado</th>
                  <th className="py-3 px-3">Último Avistamiento</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {opportunities.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-xs text-[var(--text-muted)]">
                      {isOffline
                        ? "Sin datos disponibles (Radar Offline)."
                        : "No hay oportunidades registradas todavía en la base de datos."}
                    </td>
                  </tr>
                ) : (
                  opportunities.slice(0, 10).map((opp) => (
                    <tr
                      key={opp.slug}
                      className="hover:bg-[var(--bg-surface-elevated)]/40 transition group"
                    >
                      <td className="py-3.5 px-4 font-semibold text-[var(--text-primary)] max-w-xs">
                        <Link
                          href={`/admin/idea-radar/opportunities/${opp.slug}`}
                          className="hover:text-[var(--accent-primary)] transition"
                        >
                          <div className="truncate">{opp.title}</div>
                          <div className="text-[11px] font-mono-tech text-[var(--text-muted)] truncate">
                            {opp.slug}
                          </div>
                        </Link>
                      </td>

                      <td className="py-3.5 px-3 text-[var(--text-secondary)]">
                        <span className="capitalize">{opp.category?.replace("_", " ") || "micro-b2b"}</span>
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono-tech font-bold text-sm">
                        <span
                          className={
                            opp.canonical_score >= 68
                              ? "text-amber-400"
                              : opp.canonical_score >= 60
                              ? "text-sky-400"
                              : "text-[var(--text-secondary)]"
                          }
                        >
                          {opp.canonical_score.toFixed(1)}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono-tech text-[var(--text-secondary)]">
                        {opp.evidence_confidence.toFixed(0)}%
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono-tech text-sky-400">
                        {opp.independent_signal_rounds}x
                      </td>

                      <td className="py-3.5 px-3">
                        <StatusBadge status={opp.status} />
                      </td>

                      <td className="py-3.5 px-3 text-[11px] font-mono-tech text-[var(--text-muted)]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>{opp.last_seen ? opp.last_seen.split("T")[0] : "—"}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/idea-radar/opportunities/${opp.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-primary)] hover:underline"
                        >
                          <span>Ficha</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
