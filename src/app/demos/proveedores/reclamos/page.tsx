"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Plus,
  Clock,
  CheckCircle2,
  Send,
  Building2,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  supplierClaimsData,
  SupplierClaim,
  supplierUnitsData,
} from "@/data/demos/suppliers";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";
import { DemoModal } from "@/components/demos/DemoModal";

export default function ProveedoresReclamosPage() {
  const [claims, setClaims] = useState<SupplierClaim[]>(supplierClaimsData);
  const [selectedClaimId, setSelectedClaimId] = useState<string>(supplierClaimsData[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newUnit, setNewUnit] = useState(supplierUnitsData[0].name);
  const [replyText, setReplyText] = useState("");
  const [createToast, setCreateToast] = useState<string | null>(null);

  const activeClaim = claims.find((c) => c.id === selectedClaimId) || claims[0];

  const handleCreateClaim = () => {
    if (!newSubject.trim()) return;

    const newClaim: SupplierClaim = {
      id: `claim-${Date.now()}`,
      claimNumber: `REC-2026-00${Math.floor(Math.random() * 800) + 100}`,
      businessUnitName: newUnit,
      subject: newSubject,
      category: "payment_inquiry",
      status: "open",
      statusLabel: "En gestión por Tesorería",
      createdAt: "Hoy, recién",
      lastUpdate: "Hoy, recién",
      messages: [
        {
          id: `msg-${Date.now()}`,
          author: "Ing. Roberto Calvo (Sinergia Metal)",
          role: "supplier",
          timestamp: "Hoy, recién",
          content: newContent || "Consulta ingresada desde el portal de autoservicio.",
        },
      ],
    };

    setClaims([newClaim, ...claims]);
    setSelectedClaimId(newClaim.id);
    setIsModalOpen(false);
    setNewSubject("");
    setNewContent("");
    setCreateToast(`Simulación completada: Reclamo de prueba ${newClaim.claimNumber} creado y registrado.`);
    setTimeout(() => setCreateToast(null), 5000);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !activeClaim) return;

    const updatedClaim: SupplierClaim = {
      ...activeClaim,
      lastUpdate: "Hoy, recién",
      messages: [
        ...activeClaim.messages,
        {
          id: `msg-${Date.now()}`,
          author: "Ing. Roberto Calvo (Sinergia Metal)",
          role: "supplier",
          timestamp: "Hoy, recién",
          content: replyText,
        },
      ],
    };

    setClaims(claims.map((c) => (c.id === activeClaim.id ? updatedClaim : c)));
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-blue-400 font-semibold">
            Mesa de Ayuda
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Reclamos
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Canal directo para seguimiento de pagos, retenciones fiscales y consultas administrativas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo reclamo demo</span>
        </button>
      </div>

      {/* Toast de Creación */}
      {createToast && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{createToast}</span>
          </div>
          <span className="font-mono-tech text-[10px] text-emerald-400">Ticket activo</span>
        </div>
      )}

      {/* Grid: Lista de Reclamos a la izquierda, Conversación a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Lista de Tickets */}
        <div className="lg:col-span-5 space-y-3">
          {claims.map((claim) => (
            <div
              key={claim.id}
              onClick={() => setSelectedClaimId(claim.id)}
              className={`rounded-xl border p-4 space-y-2 cursor-pointer transition-all ${
                selectedClaimId === claim.id
                  ? "bg-[#131E35] border-blue-500/60 shadow-lg"
                  : "bg-[#111827] border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-tech text-xs text-blue-400 font-bold">
                  {claim.claimNumber}
                </span>
                <DemoStatusBadge
                  label={claim.statusLabel}
                  tone={claim.status === "resolved" ? "success" : "info"}
                  size="sm"
                />
              </div>

              <h3 className="text-xs sm:text-sm font-semibold text-white line-clamp-2">
                {claim.subject}
              </h3>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>{claim.businessUnitName}</span>
                <span>{claim.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Columna Derecha: Hilo de Conversación del Reclamo Activo */}
        <div className="lg:col-span-7 rounded-xl bg-[#111827] border border-[#1E293B] p-5 sm:p-6 space-y-5">
          {activeClaim && (
            <>
              {/* Encabezado del hilo */}
              <div className="pb-4 border-b border-[#1E293B] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-xs text-blue-400 font-bold">
                    {activeClaim.claimNumber}
                  </span>
                  <DemoStatusBadge
                    label={activeClaim.statusLabel}
                    tone={activeClaim.status === "resolved" ? "success" : "info"}
                    size="sm"
                  />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {activeClaim.subject}
                </h3>
                <span className="text-xs text-slate-400 block">
                  Destinatario: {activeClaim.businessUnitName}
                </span>
              </div>

              {/* Mensajes */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {activeClaim.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                      msg.role === "supplier"
                        ? "bg-[#0B0F17] border border-slate-800 text-slate-200 ml-4 sm:ml-8"
                        : "bg-blue-950/30 border border-blue-500/30 text-blue-100 mr-4 sm:mr-8"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px] text-slate-400">
                      <span className="font-semibold text-white">{msg.author}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed whitespace-pre-line">{msg.content}</p>
                  </div>
                ))}
              </div>

              {/* Caja de Respuesta Rápida */}
              <div className="pt-2 border-t border-[#1E293B] space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Escribir mensaje en este ticket..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendReply();
                    }}
                    className="flex-1 bg-[#0B0F17] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleSendReply}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Simulación de respuesta local en memoria para evaluar la UX del módulo.
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de Nueva Consulta */}
      <DemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Iniciar Nueva Consulta / Reclamo"
        subtitle="Mesa de ayuda administrativa Grupo Atlas"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Unidad de Negocio a la que dirigís el reclamo:
            </label>
            <select
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              className="w-full bg-[#111827] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {supplierUnitsData.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Asunto de la consulta:
            </label>
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Ej: Consulta por liquidación de factura 12845..."
              className="w-full bg-[#111827] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Detalle del requerimiento:
            </label>
            <textarea
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Describí los números de comprobante o duda puntual..."
              className="w-full bg-[#111827] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
              onClick={handleCreateClaim}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-sm"
            >
              Crear ticket demostrativo
            </button>
          </div>
        </div>
      </DemoModal>
    </div>
  );
}
