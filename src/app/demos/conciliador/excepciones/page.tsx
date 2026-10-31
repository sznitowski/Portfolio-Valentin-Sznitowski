"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  FileQuestion,
  TrendingDown,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  reconciliationTransactionsData,
  ReconciliationTransaction,
} from "@/data/demos/reconciliation";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";
import { DemoDrawer } from "@/components/demos/DemoDrawer";

export default function ConciliadorExcepcionesPage() {
  const [exceptions, setExceptions] = useState<ReconciliationTransaction[]>(
    reconciliationTransactionsData.filter((tx) => tx.status !== "matched")
  );
  const [selectedException, setSelectedException] = useState<ReconciliationTransaction | null>(null);
  const [resolutionNotice, setResolutionNotice] = useState<string | null>(null);

  const handleSimulateResolve = (actionName: string) => {
    if (!selectedException) return;

    setResolutionNotice(
      `Simulación completada: Diferencia en cupón #${selectedException.couponNumber} marcada como "${actionName}".`
    );

    // Remove from in-memory exceptions view
    setExceptions(exceptions.filter((e) => e.id !== selectedException.id));
    setSelectedException(null);

    setTimeout(() => setResolutionNotice(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-amber-400 font-semibold">
            Revisión de Casos
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Diferencias & Desvíos
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Transacciones con desvíos detectados: montos diferentes, pagos no encontrados o cupones duplicados.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{exceptions.length} diferencias por resolver</span>
        </div>
      </div>

      {/* Notificación de Resolución */}
      {resolutionNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{resolutionNotice}</span>
          </div>
          <span className="font-mono-tech text-[10px] text-emerald-400">Auditoría demo</span>
        </div>
      )}

      {/* Lista de Excepciones */}
      <div className="space-y-3">
        {exceptions.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-[#111827] p-8 text-center text-xs text-slate-400 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="font-semibold text-white">¡No quedan excepciones pendientes!</p>
            <p>Todos los cupones fueron resueltos determinísticamente o conciliados en memoria.</p>
          </div>
        ) : (
          exceptions.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedException(item)}
              className="rounded-xl border border-slate-800 bg-[#111827] p-4 sm:p-5 hover:border-amber-500/40 transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/25 shrink-0">
                    <FileQuestion className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">
                        Cupón #{item.couponNumber} — {item.provider}
                      </span>
                      <DemoStatusBadge
                        label={item.statusLabel}
                        tone={item.status === "difference_fee" ? "warning" : "danger"}
                        size="sm"
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-mono-tech">
                      Terminal {item.terminalNumber} • Fecha operación: {item.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 text-right">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-mono-tech">
                      Diferencia
                    </span>
                    <span
                      className={`font-mono-tech font-bold text-sm ${
                        item.difference < 0 ? "text-rose-400" : "text-amber-400"
                      }`}
                    >
                      {item.difference < 0 ? "-" : "+"}${Math.abs(item.difference).toLocaleString()}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800/80 text-xs text-slate-300">
                <strong className="text-slate-200">Motivo de excepción:</strong> {item.explanation}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Drawer de Resolución */}
      <DemoDrawer
        isOpen={selectedException !== null}
        onClose={() => setSelectedException(null)}
        title={selectedException ? `Revisión de Excepción #${selectedException.couponNumber}` : ""}
        subtitle={selectedException ? `${selectedException.provider} • Lote ${selectedException.settlementBatchId}` : ""}
      >
        {selectedException && (
          <div className="space-y-6 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
              <span className="font-semibold text-amber-300 font-mono-tech text-xs uppercase block">
                Causa del Desvío:
              </span>
              <p className="text-amber-200/90 leading-relaxed font-sans text-xs sm:text-sm">
                {selectedException.explanation}
              </p>
            </div>

            {/* Datos Técnicos */}
            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-2 font-mono-tech text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Cupón:</span>
                <span className="text-white font-bold">#{selectedException.couponNumber}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Comprobante ERP:</span>
                <span className="text-slate-200">{selectedException.erpInvoiceNumber}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Monto Venta Registrado:</span>
                <span className="text-white">
                  ${selectedException.erpGrossAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Monto Bruto Liquidado:</span>
                <span className="text-cyan-400 font-bold">
                  ${selectedException.settledGrossAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                <span>Desvío / Diferencia:</span>
                <span className="text-rose-400 font-bold">
                  ${selectedException.difference.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Acciones de Resolución Asistida */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold block">
                Acciones de Resolución Demostrativa:
              </span>

              <button
                type="button"
                onClick={() => handleSimulateResolve("Reclamo formal al adquirente")}
                className="w-full p-3 rounded-lg bg-[#111827] border border-slate-700 hover:border-cyan-500 text-left text-xs space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between text-white font-semibold group-hover:text-cyan-400">
                  <span>1. Iniciar reclamo comercial a adquirente</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-slate-400 text-[11px]">
                  Genera el número de caso y excluye temporalmente el débito del cierre contable.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSimulateResolve("Asociación con comprobante ERP")}
                className="w-full p-3 rounded-lg bg-[#111827] border border-slate-700 hover:border-emerald-500 text-left text-xs space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between text-white font-semibold group-hover:text-emerald-400">
                  <span>2. Forzar vinculación con factura manual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-slate-400 text-[11px]">
                  Permite vincular un comprobante fiscal con número de cupón reasignado por el operador.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSimulateResolve("Aceptación de ajuste contable")}
                className="w-full p-3 rounded-lg bg-[#111827] border border-slate-700 hover:border-amber-500 text-left text-xs space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between text-white font-semibold group-hover:text-amber-400">
                  <span>3. Aceptar diferencia como quebranto menor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-slate-400 text-[11px]">
                  Acepta la diferencia de redondeo e imputa a cuenta de gastos financieros.
                </p>
              </button>
            </div>
          </div>
        )}
      </DemoDrawer>
    </div>
  );
}
