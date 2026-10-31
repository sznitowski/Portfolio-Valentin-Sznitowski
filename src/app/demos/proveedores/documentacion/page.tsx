"use client";

import React, { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  ShieldCheck,
  FileUp,
} from "lucide-react";
import { taxDocumentsData, TaxDocument } from "@/data/demos/suppliers";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";
import { DemoModal } from "@/components/demos/DemoModal";

export default function ProveedoresDocumentacionPage() {
  const [documents, setDocuments] = useState<TaxDocument[]>(taxDocumentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(taxDocumentsData[1].id);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setDocuments(
        documents.map((doc) =>
          doc.id === selectedDocId
            ? {
                ...doc,
                status: "valid" as const,
                statusLabel: "Vigente & Renovado",
                expiresAt: "30/04/2027",
                issuedAt: "28/10/2026",
              }
            : doc
        )
      );
      setIsUploading(false);
      setIsModalOpen(false);
      setToastMessage("Simulación completada: Documento de prueba renovado y validado en el legajo fiscal.");
      setTimeout(() => setToastMessage(null), 5000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-blue-400 font-semibold">
            Legajo & Compliance
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Documentación
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Control de vigencia de constancias fiscales, datos bancarios, seguros ART y certificados impositivos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Renovar documento</span>
        </button>
      </div>

      {/* Toast de Simulación */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <span className="font-mono-tech text-[10px] text-emerald-400">Estado actualizado</span>
        </div>
      )}

      {/* Grid de Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`rounded-xl bg-[#111827] border p-5 space-y-4 flex flex-col justify-between transition-all ${
              doc.status === "expiring_soon"
                ? "border-amber-500/35 hover:border-amber-500/60"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-white block leading-snug">
                  {doc.title}
                </span>
                <DemoStatusBadge
                  label={doc.statusLabel}
                  tone={doc.status === "valid" ? "success" : "warning"}
                  size="sm"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1.5 font-mono-tech text-xs">
                <div className="text-[11px] text-slate-400">
                  <span>Tipo: </span>
                  <span className="text-slate-200">{doc.documentType}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Emisión:</span>
                  <span className="text-slate-300">{doc.issuedAt}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Vencimiento:</span>
                  <span
                    className={`font-bold ${
                      doc.status === "expiring_soon" ? "text-amber-400" : "text-emerald-400"
                    }`}
                  >
                    {doc.expiresAt}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 truncate">
                  <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="font-mono-tech text-slate-300 truncate">{doc.filename}</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Auditado por: {doc.verifiedBy}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setSelectedDocId(doc.id);
                  setIsModalOpen(true);
                }}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Actualizar legajo →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Interactivo de Carga */}
      <DemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Actualizar Documento de Legajo Fiscal"
        subtitle="Simulación de carga de certificados impositivos"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Seleccionar documento a renovar:
            </label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full bg-[#111827] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.statusLabel})
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border-2 border-dashed border-slate-700 bg-[#0B0F17] p-6 text-center space-y-2">
            <FileUp className="w-8 h-8 text-blue-400 mx-auto" />
            <div className="text-xs text-slate-300 font-medium">
              Arrastrá el certificado en PDF o hacé click para seleccionar
            </div>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
              En producción valida firma digital de AFIP/ARCA, fecha de vigencia y número de certificado fiscal.
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={isUploading}
              onClick={handleSimulateUpload}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-sm disabled:opacity-50"
            >
              {isUploading ? "Cargando en legajo..." : "Simular actualización"}
            </button>
          </div>
        </div>
      </DemoModal>
    </div>
  );
}
