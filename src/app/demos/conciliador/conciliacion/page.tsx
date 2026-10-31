"use client";

import React, { useState, useMemo } from "react";
import {
  FileCheck2,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  ShieldCheck,
  Percent,
} from "lucide-react";
import {
  reconciliationTransactionsData,
  ReconciliationTransaction,
} from "@/data/demos/reconciliation";
import { DemoTable, DemoColumn } from "@/components/demos/DemoTable";
import { DemoStatusBadge, BadgeTone } from "@/components/demos/DemoStatusBadge";
import { DemoDrawer } from "@/components/demos/DemoDrawer";

export default function ConciliadorConciliacionPage() {
  const [selectedTx, setSelectedTx] = useState<ReconciliationTransaction | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");

  const filteredData = useMemo(() => {
    return reconciliationTransactionsData.filter((item) => {
      const matchesSearch =
        item.couponNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.erpInvoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      const matchesProvider =
        providerFilter === "all" || item.provider.toLowerCase().includes(providerFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesProvider;
    });
  }, [searchQuery, statusFilter, providerFilter]);

  const getTone = (status: ReconciliationTransaction["status"]): BadgeTone => {
    switch (status) {
      case "matched":
        return "success";
      case "difference_fee":
        return "warning";
      case "difference_amount":
        return "danger";
      case "missing_erp":
        return "danger";
      default:
        return "neutral";
    }
  };

  const columns: DemoColumn<ReconciliationTransaction>[] = [
    {
      header: "Fecha",
      cell: (row) => (
        <div>
          <span className="font-mono-tech text-white block text-xs">{row.date}</span>
          <span className="text-[11px] text-slate-500 font-mono-tech">
            Acred: {row.settlementDate}
          </span>
        </div>
      ),
    },
    {
      header: "Medio de pago",
      cell: (row) => (
        <div>
          <span className="font-medium text-white block text-xs">{row.provider}</span>
          <span className="text-[11px] text-cyan-400 font-mono-tech">
            Cupón #{row.couponNumber}
          </span>
        </div>
      ),
    },
    {
      header: "Venta",
      cell: (row) => (
        <div>
          <span className="font-mono-tech text-slate-200 block text-xs">
            {row.erpGrossAmount > 0 ? `$${row.erpGrossAmount.toLocaleString()}` : "—"}
          </span>
          <span className="text-[10px] text-slate-500 font-mono-tech">
            {row.erpInvoiceNumber}
          </span>
        </div>
      ),
    },
    {
      header: "Cobro",
      cell: (row) => (
        <div>
          <span className="font-mono-tech font-bold text-white block text-xs">
            ${row.settledGrossAmount.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 font-mono-tech">
            Neto: ${row.netSettledAmount.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      header: "Diferencia",
      className: "text-right",
      cell: (row) => (
        <span
          className={`font-mono-tech font-bold block text-xs ${
            row.difference === 0
              ? "text-slate-400"
              : row.difference < 0
              ? "text-rose-400"
              : "text-amber-400"
          }`}
        >
          {row.difference === 0
            ? "$0"
            : `${row.difference < 0 ? "-" : "+"}$${Math.abs(row.difference).toLocaleString()}`}
        </span>
      ),
    },
    {
      header: "Estado",
      className: "text-right",
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <DemoStatusBadge label={row.statusLabel} tone={getTone(row.status)} />
          <button
            type="button"
            onClick={() => setSelectedTx(row)}
            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label={`Ver detalles del cupón #${row.couponNumber}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-cyan-400 font-semibold">
            Control de Cobros
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Conciliaciones
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Cruce automático entre comprobantes de venta y cobros acreditados por procesadores de pago.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Reglas determinísticas explicables</span>
        </div>
      </div>

      {/* Controles de Filtros */}
      <div className="flex flex-wrap items-center gap-2.5">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#111827] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          aria-label="Filtrar por estado de conciliación"
        >
          <option value="all">Todos los estados</option>
          <option value="matched">Conciliado (OK)</option>
          <option value="difference_fee">Diferencia de arancel</option>
          <option value="difference_amount">Monto divergente</option>
          <option value="missing_erp">Cupón ausente en ERP</option>
        </select>

        <select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="bg-[#111827] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          aria-label="Filtrar por procesador"
        >
          <option value="all">Todos los proveedores</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="naranja">Naranja X</option>
          <option value="mercado pago">Mercado Pago</option>
          <option value="cabal">Cabal</option>
        </select>
      </div>

      {/* Tabla Interactiva */}
      <DemoTable<ReconciliationTransaction>
        columns={columns}
        data={filteredData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Buscar por cupón, factura ERP o proveedor..."
        renderMobileCard={(row) => (
          <div
            onClick={() => setSelectedTx(row)}
            className="rounded-xl border border-[#1E293B] bg-[#111827] p-4 space-y-3 cursor-pointer hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono-tech font-bold text-cyan-400 block text-sm">
                  Cupón #{row.couponNumber}
                </span>
                <span className="text-xs text-white font-medium">{row.provider}</span>
              </div>
              <DemoStatusBadge label={row.statusLabel} tone={getTone(row.status)} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-lg bg-[#0B0F17] font-mono-tech">
              <div>
                <span className="text-[10px] text-slate-500 block">Venta ERP:</span>
                <span className="text-slate-300">{row.erpGrossAmount > 0 ? `$${row.erpGrossAmount.toLocaleString()}` : "—"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Liquidado:</span>
                <span className="text-white font-bold">${row.settledGrossAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-slate-400">Diferencia neta:</span>
              <span
                className={`font-mono-tech font-bold ${
                  row.difference === 0 ? "text-slate-400" : row.difference < 0 ? "text-rose-400" : "text-amber-400"
                }`}
              >
                {row.difference === 0 ? "$0" : `${row.difference < 0 ? "-" : "+"}$${Math.abs(row.difference).toLocaleString()}`}
              </span>
            </div>
          </div>
        )}
      />

      {/* Drawer de Detalle y Explicabilidad Determinística */}
      <DemoDrawer
        isOpen={selectedTx !== null}
        onClose={() => setSelectedTx(null)}
        title={selectedTx ? `Detalle de Conciliación #${selectedTx.couponNumber}` : ""}
        subtitle={selectedTx ? `${selectedTx.provider} • Lote ${selectedTx.settlementBatchId}` : ""}
      >
        {selectedTx && (
          <div className="space-y-6">
            {/* Estado y Explicación Principal */}
            <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tech uppercase text-slate-400">
                  Diagnóstico Determinístico
                </span>
                <DemoStatusBadge
                  label={selectedTx.statusLabel}
                  tone={getTone(selectedTx.status)}
                  size="sm"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {selectedTx.explanation}
              </p>
            </div>

            {/* Comparativa ERP vs Liquidación */}
            <div className="space-y-2">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold block">
                Cruce de Montos:
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Comprobante ERP</span>
                  <span className="text-white font-mono-tech font-bold block">
                    {selectedTx.erpInvoiceNumber}
                  </span>
                  <span className="text-slate-300 font-mono-tech block">
                    Bruto: ${selectedTx.erpGrossAmount.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1">
                  <span className="text-slate-500 block">Extracto Adquirente</span>
                  <span className="text-white font-mono-tech font-bold block">
                    Terminal: {selectedTx.terminalNumber}
                  </span>
                  <span className="text-cyan-400 font-mono-tech block">
                    Bruto: ${selectedTx.settledGrossAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Desglose de Deducciones y Aranceles */}
            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-3 font-mono-tech text-xs">
              <span className="font-semibold text-slate-300 block font-sans">
                Estructura de Retenciones & Deducciones
              </span>

              <div className="space-y-2 divide-y divide-slate-800/80">
                <div className="flex justify-between text-slate-400 pt-1">
                  <span>Monto Bruto Liquidado:</span>
                  <span className="text-white font-bold">
                    ${selectedTx.settledGrossAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400 pt-2">
                  <span>Arancel aplicado ({selectedTx.appliedFeeRate}%):</span>
                  <span className="text-rose-400">
                    -${selectedTx.feeAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400 pt-2">
                  <span>Retenciones fiscales (IVA / Gan. / IIBB):</span>
                  <span className="text-rose-400">
                    -${selectedTx.taxWithholdings.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-slate-300 font-bold pt-2 text-sm">
                  <span>Acreditación Bancaria Neta:</span>
                  <span className="text-emerald-400">
                    ${selectedTx.netSettledAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Aviso de Trazabilidad */}
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                En producción, esta vista cuenta con botón de asiento contable y vinculación directa al reporte de liquidación del banco.
              </span>
            </div>
          </div>
        )}
      </DemoDrawer>
    </div>
  );
}
