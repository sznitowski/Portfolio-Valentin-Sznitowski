import React from "react";
import {
  Lock,
  History,
  ShieldCheck,
  CheckCircle2,
  Clock,
  User,
  Hash,
  ArrowRight,
  FileSpreadsheet,
} from "lucide-react";
import {
  accountingPeriodClosuresData,
  auditTimelineEventsData,
} from "@/data/demos/reconciliation";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";

export default function ConciliadorCierresPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-cyan-400 font-semibold">
            Trazabilidad & Seguridad Contable
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Cierres de Período & Auditoría Inmutable
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Congelamiento de snapshots periódicos para asientos contables e historial de acciones auditadas.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Lock className="w-4 h-4 text-cyan-400" />
          <span>Snapshots protegidos con SHA-256</span>
        </div>
      </div>

      {/* Grid de Períodos Contables */}
      <div className="space-y-4">
        <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold block">
          Períodos Operativos & Estados de Cierre:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accountingPeriodClosuresData.map((period) => (
            <div
              key={period.id}
              className={`rounded-xl bg-[#111827] border p-5 space-y-4 flex flex-col justify-between ${
                period.status === "closed"
                  ? "border-emerald-500/25"
                  : "border-cyan-500/30"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold text-white block">
                    {period.periodName}
                  </span>
                  <DemoStatusBadge
                    label={period.statusLabel}
                    tone={period.status === "closed" ? "success" : "info"}
                    size="sm"
                  />
                </div>

                <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1.5 font-mono-tech text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Alcance:</span>
                    <span className="text-slate-300">{period.dateRange}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Operaciones:</span>
                    <span className="text-white font-bold">{period.totalOperations}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Conciliados:</span>
                    <span className="text-emerald-400 font-bold">{period.matchedCount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Pendientes:</span>
                    <span className={period.exceptionsCount > 0 ? "text-amber-400 font-bold" : "text-slate-400"}>
                      {period.exceptionsCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                    <span>Total Liquidado:</span>
                    <span className="text-cyan-400 font-bold">
                      ${(period.totalAmountProcessed / 1000000).toFixed(2)}M
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">Responsable: {period.responsible}</span>
                  </div>
                  {period.closedAt && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono-tech">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Cierre: {period.closedAt}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono-tech truncate">
                Hash Snapshot: {period.snapshotHash}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline de Auditoría */}
      <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono-tech">
              Línea de Tiempo de Auditoría Operativa
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono-tech">
            Eventos inmutables registrados
          </span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {auditTimelineEventsData.map((ev) => (
            <div key={ev.id} className="relative flex items-start gap-4">
              {/* Dot */}
              <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#111827]" />

              <div className="flex-1 rounded-lg bg-[#0B0F17] border border-slate-800 p-3.5 space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-semibold text-white text-sm">{ev.action}</span>
                  <span className="text-[11px] font-mono-tech text-slate-500">{ev.timestamp}</span>
                </div>
                <div className="text-cyan-400 text-[11px] font-mono-tech">{ev.actor}</div>
                <p className="text-slate-300 leading-relaxed pt-1">{ev.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
