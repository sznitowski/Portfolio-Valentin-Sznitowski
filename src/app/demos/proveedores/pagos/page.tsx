"use client";

import React, { useState, useMemo } from "react";
import {
  Receipt,
  Download,
  ChevronRight,
  Filter,
  FileText,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { paymentOrdersData, PaymentOrder } from "@/data/demos/suppliers";
import { DemoTable, DemoColumn } from "@/components/demos/DemoTable";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";
import { DemoDrawer } from "@/components/demos/DemoDrawer";

export default function ProveedoresPagosPage() {
  const [selectedOp, setSelectedOp] = useState<PaymentOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return paymentOrdersData.filter((op) => {
      const matchesSearch =
        op.opNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.businessUnitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.invoices.some((inv) => inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === "all" || op.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleSimulateDownload = (docName: string) => {
    setDownloadToast(`Simulación: Generando archivo "${docName}" con firma digital y certificados fiscales.`);
    setTimeout(() => setDownloadToast(null), 5000);
  };

  const columns: DemoColumn<PaymentOrder>[] = [
    {
      header: "Número",
      cell: (row) => (
        <div>
          <span className="font-mono-tech font-bold text-white text-sm block">
            {row.opNumber}
          </span>
          <span className="text-[11px] text-slate-400 block truncate">
            {row.businessUnitName}
          </span>
        </div>
      ),
    },
    {
      header: "Fecha",
      cell: (row) => (
        <div className="font-mono-tech text-xs">
          <span className="text-white block font-medium">{row.paymentDate}</span>
          <span className="text-[11px] text-slate-500 block">Emitida: {row.issueDate}</span>
        </div>
      ),
    },
    {
      header: "Importe",
      cell: (row) => (
        <div>
          <span className="font-mono-tech font-bold text-emerald-400 text-sm block">
            ${row.netAmount.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 font-mono-tech">
            Bruto: ${row.grossAmount.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      header: "Estado",
      className: "text-right",
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <DemoStatusBadge
            label={row.statusLabel}
            tone={row.status === "paid" ? "success" : "info"}
          />
          <button
            type="button"
            onClick={() => setSelectedOp(row)}
            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label={`Ver detalles de ${row.opNumber}`}
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
          <span className="text-xs font-mono-tech uppercase tracking-wider text-blue-400 font-semibold">
            Autoservicio de Cobros
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Pagos & Órdenes de Pago
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Historial de pagos emitidos, retenciones impositivas y comprobantes listos para descargar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111827] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="Filtrar por estado de pago"
          >
            <option value="all">Todos los estados</option>
            <option value="paid">Acreditados</option>
            <option value="scheduled">Programados</option>
          </select>
        </div>
      </div>

      {/* Toast demostrativo de descarga */}
      {downloadToast && (
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-between text-xs text-blue-300 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{downloadToast}</span>
          </div>
          <span className="font-mono-tech text-[10px] bg-blue-500/20 px-2 py-0.5 rounded">
            Frontend demo
          </span>
        </div>
      )}

      {/* Tabla de Pagos */}
      <DemoTable<PaymentOrder>
        columns={columns}
        data={filteredData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Buscar por OP, unidad o factura asociada..."
        renderMobileCard={(row) => (
          <div
            onClick={() => setSelectedOp(row)}
            className="rounded-xl border border-[#1E293B] bg-[#111827] p-4 space-y-3 cursor-pointer hover:border-blue-500/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono-tech font-bold text-white block text-sm">
                  {row.opNumber}
                </span>
                <span className="text-xs text-slate-400">{row.businessUnitName}</span>
              </div>
              <DemoStatusBadge
                label={row.statusLabel}
                tone={row.status === "paid" ? "success" : "info"}
                size="sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-lg bg-[#0B0F17] font-mono-tech">
              <div>
                <span className="text-[10px] text-slate-500 block">Bruto:</span>
                <span className="text-slate-300">${row.grossAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Neto Acreditado:</span>
                <span className="text-emerald-400 font-bold">${row.netAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-1 text-slate-400">
              <span>Pago: {row.paymentDate}</span>
              <span className="text-blue-400 font-medium">Ver retenciones →</span>
            </div>
          </div>
        )}
      />

      {/* Drawer de Detalle de Orden de Pago y Retenciones */}
      <DemoDrawer
        isOpen={selectedOp !== null}
        onClose={() => setSelectedOp(null)}
        title={selectedOp ? `Detalle ${selectedOp.opNumber}` : ""}
        subtitle={selectedOp ? `${selectedOp.businessUnitName} • Fecha de pago: ${selectedOp.paymentDate}` : ""}
      >
        {selectedOp && (
          <div className="space-y-6 text-xs sm:text-sm">
            {/* Cabecera de Montos */}
            <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs font-mono-tech uppercase text-slate-400">
                  Forma de Acreditación
                </span>
                <span className="text-xs font-medium text-white font-mono-tech">
                  {selectedOp.paymentMethod}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono-tech pt-1">
                <div>
                  <span className="text-[10px] text-slate-500 block">Importe Bruto</span>
                  <span className="text-white font-bold text-xs sm:text-sm">
                    ${selectedOp.grossAmount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Retenciones</span>
                  <span className="text-rose-400 font-bold text-xs sm:text-sm">
                    -${selectedOp.totalWithholdings.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Neto Transferido</span>
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm">
                    ${selectedOp.netAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Facturas Abonadas en esta OP */}
            <div className="space-y-3">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold block">
                Facturas Asociadas Abonadas:
              </span>
              <div className="space-y-2">
                {selectedOp.invoices.map((inv, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1.5"
                  >
                    <div className="flex justify-between items-center text-xs font-mono-tech">
                      <span className="font-bold text-white">{inv.invoiceNumber}</span>
                      <span className="text-slate-400">Emisión: {inv.date}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{inv.description}</p>
                    <div className="flex justify-between text-xs pt-1 border-t border-slate-800/80 font-mono-tech">
                      <span className="text-slate-500">Subtotal cancelado:</span>
                      <span className="text-slate-200 font-bold">${inv.grossAmount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desglose de Retenciones Fiscales */}
            <div className="space-y-3">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold block">
                Certificados de Retención Impositiva:
              </span>
              <div className="space-y-2">
                {selectedOp.withholdings.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white">{w.concept}</span>
                      <span className="text-rose-400 font-mono-tech font-bold">
                        -${w.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono-tech">
                      <span>Régimen: {w.regime}</span>
                      <span>Alícuota: {w.ratePercent}%</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono-tech pt-1">
                      Certificado: {w.certificateNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón Demostrativo de Descarga */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleSimulateDownload(selectedOp.receiptDocumentName)}
                className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Descargar comprobante de pago oficial (PDF)</span>
              </button>
            </div>
          </div>
        )}
      </DemoDrawer>
    </div>
  );
}
