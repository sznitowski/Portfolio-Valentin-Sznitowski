import React from "react";
import Link from "next/link";
import { getRadarOpportunities } from "@/lib/radar-client";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ArrowLeft, Clock, ArrowRight, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function OpportunitiesListPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentStatusFilter = resolvedParams.status;

  const res = await getRadarOpportunities(currentStatusFilter);
  const opportunities = res.success ? res.data : [];

  const filterTabs = [
    { label: "Todas", value: undefined },
    { label: "Promising", value: "PROMISING" },
    { label: "Validation Required", value: "VALIDATION_REQUIRED" },
    { label: "Build Candidate", value: "BUILD_CANDIDATE" },
    { label: "Observed", value: "OBSERVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
            <Link
              href="/admin/idea-radar"
              className="hover:text-[var(--text-primary)] transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">Oportunidades</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Oportunidades de Mercado
          </h1>
        </div>

        <div className="text-xs text-[var(--text-muted)] font-mono-tech">
          Total listadas: <span className="text-[var(--text-primary)] font-bold">{opportunities.length}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--border-subtle)]/60 text-xs">
        <Filter className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0 mr-1" />
        {filterTabs.map((tab) => {
          const isActive = currentStatusFilter === tab.value || (!currentStatusFilter && !tab.value);
          const href = tab.value
            ? `/admin/idea-radar/opportunities?status=${tab.value}`
            : `/admin/idea-radar/opportunities`;

          return (
            <Link
              key={tab.label}
              href={href}
              className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
                isActive
                  ? "bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Opportunities Table */}
      <div className="surface-card rounded-xl border border-[var(--border-subtle)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 text-[var(--text-muted)] font-mono-tech uppercase text-[10px]">
                <th className="py-3 px-4">Título / Concept Slug</th>
                <th className="py-3 px-3">Categoría & Target</th>
                <th className="py-3 px-3 text-center">Score Canónico</th>
                <th className="py-3 px-3 text-center">Confianza</th>
                <th className="py-3 px-3 text-center">Rondas</th>
                <th className="py-3 px-3">Estado Ciclo de Vida</th>
                <th className="py-3 px-3">Último Visto</th>
                <th className="py-3 px-4 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {opportunities.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-[var(--text-muted)]">
                    No se encontraron oportunidades con el filtro seleccionado.
                  </td>
                </tr>
              ) : (
                opportunities.map((opp) => (
                  <tr
                    key={opp.slug}
                    className="hover:bg-[var(--bg-surface-elevated)]/40 transition group"
                  >
                    <td className="py-3.5 px-4 font-semibold text-[var(--text-primary)] max-w-sm">
                      <Link
                        href={`/admin/idea-radar/opportunities/${opp.slug}`}
                        className="hover:text-[var(--accent-primary)] transition"
                      >
                        <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition">
                          {opp.title}
                        </div>
                        <div className="text-[11px] font-mono-tech text-[var(--text-muted)] mt-0.5">
                          {opp.slug}
                        </div>
                      </Link>
                    </td>

                    <td className="py-3.5 px-3 text-[var(--text-secondary)]">
                      <div className="capitalize font-medium text-[var(--text-primary)]">
                        {opp.category?.replace("_", " ") || "micro-b2b"}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] truncate max-w-xs">
                        {opp.target_user || "—"}
                      </div>
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

                    <td className="py-3.5 px-3 text-center font-mono-tech text-sky-400 font-bold">
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
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-semibold text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition"
                      >
                        <span>Inspeccionar</span>
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
  );
}
