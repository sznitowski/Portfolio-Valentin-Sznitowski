"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { importBatchesData, ImportBatch } from "@/data/demos/reconciliation";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";

interface ProviderSource {
  id: string;
  name: string;
  description: string;
  format: string;
  rawFormat: "CSV" | "XLSX" | "TXT";
  exampleFile: string;
}

const sources: ProviderSource[] = [
  {
    id: "visa",
    name: "Visa",
    description: "Liquidaciones automáticas de Prisma / Payway y compras en cuotas.",
    format: "CSV / TXT",
    rawFormat: "CSV",
    exampleFile: "LIQ_VISA_SEMANA_43.csv",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    description: "Extractos diarios de First Data / Fiserv y débitos directos.",
    format: "XLSX / CSV",
    rawFormat: "XLSX",
    exampleFile: "EXTRACTO_MASTERCARD_2026.xlsx",
  },
  {
    id: "mercadopago",
    name: "Mercado Pago",
    description: "Reportes de liberación de dinero en cuenta y cobros Point QR.",
    format: "CSV API",
    rawFormat: "CSV",
    exampleFile: "MP_REPORT_SETTLEMENT.csv",
  },
  {
    id: "naranjax",
    name: "Naranja X",
    description: "Liquidación quincenal de planes Z y tarjetas regionales.",
    format: "TXT Plano",
    rawFormat: "TXT",
    exampleFile: "NARANJA_PLAN_Z_OCT.txt",
  },
];

export default function ConciliadorImportacionesPage() {
  const [batches, setBatches] = useState<ImportBatch[]>(importBatchesData);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSimularCarga = (source: ProviderSource) => {
    setLoadingProvider(source.id);

    setTimeout(() => {
      const newBatch: ImportBatch = {
        id: `batch-${Date.now()}`,
        provider: source.name,
        filename: source.exampleFile,
        format: source.rawFormat,
        uploadedAt: "Hace un momento",
        recordsCount: Math.floor(Math.random() * 250) + 140,
        totalGrossAmount: Math.floor(Math.random() * 2500000) + 1200000,
        status: "processed",
        statusLabel: "Procesado sin errores",
        sha256: "d41d8cd98f00b204e9800998ecf8427e",
        summaryNote: `Carga de demostración de ${source.name} incorporada a la memoria local.`,
      };

      setBatches([newBatch, ...batches]);
      setLoadingProvider(null);
      setFeedbackMessage(
        `Simulación completada: Archivo de demostración de ${source.name} cargado correctamente (${newBatch.recordsCount} cupones procesados).`
      );

      setTimeout(() => setFeedbackMessage(null), 6000);
    }, 400);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-cyan-400 font-semibold">
            Carga de Liquidaciones
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Importaciones & Extractos
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulá la carga de extractos de procesadores para verificar el cruce automático con ventas.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Simulación 100% segura y en memoria</span>
        </div>
      </div>

      {/* Banner de Feedback Claro */}
      {feedbackMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{feedbackMessage}</span>
          </div>
          <span className="font-mono-tech text-[10px] text-emerald-400 hidden sm:inline">
            Datos locales
          </span>
        </div>
      )}

      {/* 4 Fuentes Principales Solicitadas:
          Visa, Mastercard, Mercado Pago, Naranja X */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono-tech">
            Fuentes de liquidación disponibles
          </h3>
          <span className="text-xs text-slate-500">Elegí una fuente para simular la carga</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sources.map((source) => (
            <div
              key={source.id}
              className="rounded-xl bg-[#111827] border border-[#1E293B] hover:border-cyan-500/40 p-5 flex flex-col justify-between space-y-4 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-white tracking-tight">
                    {source.name}
                  </span>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                    {source.format}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {source.description}
                </p>
                <div className="text-[11px] font-mono-tech text-slate-500 truncate pt-1">
                  Archivo: <span className="text-slate-400">{source.exampleFile}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSimularCarga(source)}
                disabled={loadingProvider === source.id}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-semibold text-xs transition-colors shadow-sm shadow-cyan-500/20"
              >
                {loadingProvider === source.id ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Simular carga</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Lotes Procesados */}
      <div className="space-y-3 pt-4 border-t border-[#1E293B]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono-tech">
            Archivos procesados / lotes ({batches.length})
          </h3>
          <span className="text-xs text-slate-500">Historial de ingestas registradas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="rounded-xl bg-[#111827] border border-[#1E293B] p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{batch.provider}</span>
                <DemoStatusBadge
                  label={batch.statusLabel}
                  tone={batch.status === "processed" ? "success" : "warning"}
                  size="sm"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 font-mono-tech text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 truncate">
                  <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{batch.filename}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Registros: {batch.recordsCount}</span>
                  <span className="text-cyan-400 font-semibold">
                    ${(batch.totalGrossAmount / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {batch.uploadedAt}
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Listo para cruce
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
