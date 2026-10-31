import React from "react";
import Link from "next/link";
import { getRadarRuns } from "@/lib/radar-client";
import { ArrowLeft, Activity, ChevronLeft, ChevronRight, Clock, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

interface RunsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function RunsPage({ searchParams }: RunsPageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10) || 1;
  const pageSize = 20;

  const res = await getRadarRuns(page, pageSize);
  const data = res.success ? res.data : { page: 1, page_size: pageSize, total: 0, items: [] };

  const totalPages = Math.ceil(data.total / pageSize) || 1;

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
            <span className="text-[var(--text-secondary)]">Runs & Logs</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Historial de Ejecuciones & Costos API
          </h1>
        </div>

        <div className="text-xs text-[var(--text-muted)] font-mono-tech">
          Total de runs registrados: <span className="text-[var(--text-primary)] font-bold">{data.total}</span>
        </div>
      </div>

      {/* Runs Table */}
      <div className="surface-card rounded-xl border border-[var(--border-subtle)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]/50 text-[var(--text-muted)] font-mono-tech uppercase text-[10px]">
                <th className="py-3 px-4">ID & Fecha (UTC)</th>
                <th className="py-3 px-3">Tipo de Run</th>
                <th className="py-3 px-3 text-center">Estado</th>
                <th className="py-3 px-3 text-center">Duración</th>
                <th className="py-3 px-4 text-center">Tokens (In / Out / Reasoning)</th>
                <th className="py-3 px-3 text-right">Costo Estimado</th>
                <th className="py-3 px-4 text-center">Ideas (Rec / Guardadas)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] font-mono-tech">
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[var(--text-muted)]">
                    {!res.success
                      ? "Sin conexión con el motor Radar."
                      : "No hay runs registrados en la base de datos."}
                  </td>
                </tr>
              ) : (
                data.items.map((r) => (
                  <tr key={r.id} className="hover:bg-[var(--bg-surface-elevated)]/30 transition">
                    <td className="py-3 px-4 text-[var(--text-primary)] font-semibold">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[var(--text-muted)] text-[11px]">#{r.id}</span>
                        <span>{r.created_at ? r.created_at.replace("T", " ").substring(0, 19) : "—"}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                          r.run_type === "deep_research"
                            ? "bg-purple-950/40 text-purple-300 border border-purple-500/30"
                            : "bg-sky-950/40 text-sky-300 border border-sky-500/30"
                        }`}
                      >
                        {r.run_type}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                          r.status === "ok"
                            ? "text-emerald-400"
                            : "text-rose-400 bg-rose-950/30"
                        }`}
                      >
                        {r.status === "ok" ? "OK" : "ERROR"}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center text-[var(--text-secondary)]">
                      <div className="flex items-center justify-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                        <span>{r.duration_seconds.toFixed(1)}s</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center text-[11px] text-[var(--text-secondary)]">
                      <span>{r.input_tokens.toLocaleString()}</span>
                      <span className="text-[var(--text-muted)]"> / </span>
                      <span>{r.output_tokens.toLocaleString()}</span>
                      {r.reasoning_tokens > 0 && (
                        <>
                          <span className="text-[var(--text-muted)]"> / </span>
                          <span className="text-purple-400">{r.reasoning_tokens.toLocaleString()}</span>
                        </>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right text-emerald-400 font-bold">
                      ${r.estimated_cost.toFixed(5)}
                    </td>

                    <td className="py-3 px-4 text-center text-[11px]">
                      <span className="text-[var(--text-secondary)]">{r.ideas_received}</span>
                      <span className="text-[var(--text-muted)]"> &rarr; </span>
                      <span className="text-emerald-400 font-bold">{r.ideas_saved}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2">
          <div>
            Página <span className="text-[var(--text-primary)] font-bold">{page}</span> de{" "}
            <span className="text-[var(--text-primary)] font-bold">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link
                href={`/admin/idea-radar/runs?page=${page - 1}`}
                className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition flex items-center gap-1 font-semibold"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </Link>
            ) : (
              <span className="px-3 py-1.5 rounded-lg opacity-40 border border-[var(--border-subtle)] cursor-not-allowed flex items-center gap-1">
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </span>
            )}

            {page < totalPages ? (
              <Link
                href={`/admin/idea-radar/runs?page=${page + 1}`}
                className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition flex items-center gap-1 font-semibold"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="px-3 py-1.5 rounded-lg opacity-40 border border-[var(--border-subtle)] cursor-not-allowed flex items-center gap-1">
                <span>Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
