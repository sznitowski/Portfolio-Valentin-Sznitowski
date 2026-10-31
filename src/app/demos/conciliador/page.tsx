"use client";

import React from "react";
import Link from "next/link";
import {
  FileCheck2,
  AlertTriangle,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Layers,
} from "lucide-react";
import {
  reconciliationKpis,
  reconciliationTransactionsData,
} from "@/data/demos/reconciliation";
import { DemoKpiCard } from "@/components/demos/DemoKpiCard";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";
import { DemoBarChart } from "@/components/demos/DemoMiniChart";

export default function ConciliadorDashboardPage() {
  const chartData = [
    { label: "Visa Créd.", value: 6420800, highlight: true },
    { label: "Mastercard", value: 4190500 },
    { label: "Naranja X", value: 3840100 },
    { label: "Mercado Pago", value: 2650800 },
    { label: "Otras", value: 1348000 },
  ];

  return (
    <div className="space-y-6">
      {/* Cabecera del Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-cyan-400 font-semibold">
            Panel de Control
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Control y Conciliación de Cobros
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitoreo en tiempo real de cruces automáticos entre ventas y liquidaciones bancarias.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/demos/conciliador/conciliacion"
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20"
          >
            <span>Ver conciliaciones</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demos/conciliador/importaciones"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-cyan-400" />
            <span>Simular carga</span>
          </Link>
        </div>
      </div>

      {/* Grid de 4 Métricas Requeridas:
          1. Ventas procesadas
          2. Cobros conciliados
          3. Diferencias detectadas
          4. Pendientes de revisión */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DemoKpiCard
          label="Ventas procesadas"
          value={`$${(reconciliationKpis.totalProcessedAmount / 1000000).toFixed(2)}M`}
          caption="Comprobantes registrados en ERP"
          themeColor="cyan"
          icon={<Layers className="w-5 h-5" />}
        />
        <DemoKpiCard
          label="Cobros conciliados"
          value={`${reconciliationKpis.autoMatchedRate}%`}
          caption="$17.96M cruzados automáticamente"
          trend={{ value: "Cruce 1:1 exitoso", isPositive: true }}
          themeColor="emerald"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <DemoKpiCard
          label="Diferencias detectadas"
          value={`-$${(reconciliationKpis.totalDetectedDifferences / 1000).toFixed(0)}k`}
          caption="Sobrearanceles y retenciones extra"
          trend={{ value: "Alerta comercial", isPositive: false }}
          themeColor="slate"
          icon={<TrendingDown className="w-5 h-5 text-rose-400" />}
        />
        <DemoKpiCard
          label="Pendientes de revisión"
          value={`${reconciliationKpis.pendingReviewCount} casos`}
          caption="En bandeja de diferencias"
          trend={{ value: "Requieren revisión", isPositive: false }}
          themeColor="slate"
          icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
        />
      </div>

      {/* Gráfico Simple de Distribución */}
      <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono-tech">
            Cobros procesados por medio de pago
          </span>
          <span className="text-[11px] font-mono-tech text-cyan-400">Total: $18.4M</span>
        </div>
        <DemoBarChart
          data={chartData}
          title=""
          colorScheme="cyan"
          height={140}
        />
      </div>

      {/* Tabla de Últimos Movimientos con Botón Directo */}
      <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Últimos movimientos conciliados
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Muestra de transacciones recientes cruzadas con liquidaciones de adquirentes
            </p>
          </div>
          <Link
            href="/demos/conciliador/conciliacion"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Ver todas las conciliaciones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 font-mono-tech uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="pb-2">Fecha</th>
                <th className="pb-2">Medio de pago</th>
                <th className="pb-2">Venta</th>
                <th className="pb-2">Cobro</th>
                <th className="pb-2 text-right">Diferencia</th>
                <th className="pb-2 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {reconciliationTransactionsData.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 font-mono-tech text-slate-400">{tx.date}</td>
                  <td className="py-2.5 font-medium text-white">{tx.provider}</td>
                  <td className="py-2.5 font-mono-tech">
                    {tx.erpGrossAmount > 0 ? `$${tx.erpGrossAmount.toLocaleString()}` : "—"}
                  </td>
                  <td className="py-2.5 font-mono-tech text-white">
                    ${tx.settledGrossAmount.toLocaleString()}
                  </td>
                  <td
                    className={`py-2.5 font-mono-tech text-right font-medium ${
                      tx.difference === 0
                        ? "text-slate-400"
                        : tx.difference < 0
                        ? "text-rose-400"
                        : "text-amber-400"
                    }`}
                  >
                    {tx.difference === 0
                      ? "$0"
                      : `${tx.difference < 0 ? "-" : "+"}$${Math.abs(tx.difference).toLocaleString()}`}
                  </td>
                  <td className="py-2.5 text-right">
                    <DemoStatusBadge
                      label={tx.statusLabel}
                      tone={
                        tx.status === "matched"
                          ? "success"
                          : tx.status === "difference_fee"
                          ? "warning"
                          : "danger"
                      }
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            href="/demos/conciliador/conciliacion"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>Ver conciliaciones</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
