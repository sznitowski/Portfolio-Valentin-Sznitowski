"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Layers,
  ExternalLink,
  Play,
  CheckCircle2,
  Users,
  Eye,
  MousePointerClick,
  DollarSign,
  Globe,
  Database,
  Radio,
  Copy,
  Check,
} from "lucide-react";
import { startProbeAction, recordProbeResultAction } from "@/app/admin/idea-radar/opportunities/[slug]/actions";
import { DistributionProbeItem, ProbeLeadRecord } from "@/lib/radar-client";

interface ProbeControlPanelProps {
  slug: string;
  status: string;
  probe: DistributionProbeItem | null;
  leads: ProbeLeadRecord[];
}

export function ProbeControlPanel({ slug, status, probe, leads }: ProbeControlPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [showResultForm, setShowResultForm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null);

  const isRunning = status === "RUNNING" || probe?.status === "RUNNING";
  const isReady = status === "READY" || probe?.status === "READY";
  const isFinished = ["PASSED", "FAILED", "INCONCLUSIVE"].includes(status) || ["PASSED", "FAILED", "INCONCLUSIVE"].includes(probe?.status || "");

  const publicBaseUrl = "https://portfolio-valentin-sznitowski.netlify.app/experiments/tradesquote";
  const variantUrls = {
    A: `${publicBaseUrl}?variant=a&utm_source=meta&utm_medium=paid_social&utm_campaign=tradesquote_probe_01&utm_content=money_loss`,
    B: `${publicBaseUrl}?variant=b&utm_source=meta&utm_medium=paid_social&utm_campaign=tradesquote_probe_01&utm_content=paperwork`,
    C: `${publicBaseUrl}?variant=c&utm_source=meta&utm_medium=paid_social&utm_campaign=tradesquote_probe_01&utm_content=proof`,
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVariant(key);
    setTimeout(() => setCopiedVariant(null), 2500);
  };

  const handleStartProbe = () => {
    setMessage(null);
    startTransition(async () => {
      const res = await startProbeAction(slug);
      if (res.success) {
        setMessage("Probe iniciado correctamente (status: RUNNING). Podés lanzar los anuncios en Meta Ads.");
      } else {
        setMessage(`Error al iniciar probe: ${res.error}`);
      }
    });
  };

  const handleResultSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMessage(null);
    startTransition(async () => {
      const res = await recordProbeResultAction(slug, formData);
      if (res.success) {
        setMessage("Resultados registrados exitosamente y scores recalculados.");
        setShowResultForm(false);
      } else {
        setMessage(`Error al registrar resultados: ${res.error}`);
      }
    });
  };

  return (
    <div className="surface-card p-5 rounded-xl border border-[var(--border-subtle)] space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
            Distribution Probe (Telemetría de Adquisición)
          </h3>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase ${
              isRunning
                ? "bg-amber-950/60 text-amber-300 border border-amber-500/40 animate-pulse"
                : isReady
                ? "bg-sky-950/60 text-sky-300 border border-sky-500/40"
                : isFinished
                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            {status || probe?.status || "NOT_STARTED"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/experiments/tradesquote"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sky-400 hover:text-sky-300 hover:border-sky-500/30 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver Landing</span>
          </Link>

          {isReady && (
            <button
              onClick={handleStartProbe}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-sky-500 text-white hover:bg-sky-400 transition shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isPending ? "Iniciando..." : "Iniciar Probe"}</span>
            </button>
          )}

          {(isRunning || isFinished) && (
            <button
              onClick={() => setShowResultForm(!showResultForm)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-sky-500/30 transition cursor-pointer"
            >
              <span>{showResultForm ? "Ocultar Formulario" : "Cargar Resultados Meta"}</span>
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-sky-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-sky-400" />
          <span>{message}</span>
        </div>
      )}

      {/* Public Landing Readiness Card */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-sky-500/30 space-y-3 font-mono-tech">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Public Landing Status & Real Distribution Probe</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold">
            READY TO DEPLOY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5 mb-1">
              <Globe className="w-3 h-3 text-sky-400" />
              <span>URL Pública</span>
            </div>
            <div className="text-white font-bold truncate text-[11px]" title={publicBaseUrl}>
              /experiments/tradesquote
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5 mb-1">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Storage Decoupled</span>
            </div>
            <div className="text-emerald-400 font-bold text-[11px]">
              Serverless / Supabase / Local
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1.5 mb-1">
              <Radio className="w-3 h-3 text-amber-400" />
              <span>Tracking & UTMs</span>
            </div>
            <div className="text-amber-300 font-bold text-[11px]">
              3 Variantes (A, B, C)
            </div>
          </div>
        </div>

        {/* Ready to use Meta Ads Campaign URLs */}
        <div className="space-y-2 pt-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">
            URLs de Campaña Meta Ads con UTMs y Variantes:
          </div>

          <div className="space-y-1.5 text-[11px]">
            {/* Variant A */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition">
              <div className="truncate">
                <span className="text-sky-400 font-bold mr-1.5">[Variante A - Money Loss]:</span>
                <span className="text-slate-400 truncate">{variantUrls.A}</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(variantUrls.A, "A")}
                className="shrink-0 p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                title="Copiar URL Variante A"
              >
                {copiedVariant === "A" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Variant B */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition">
              <div className="truncate">
                <span className="text-amber-400 font-bold mr-1.5">[Variante B - Paperwork]:</span>
                <span className="text-slate-400 truncate">{variantUrls.B}</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(variantUrls.B, "B")}
                className="shrink-0 p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                title="Copiar URL Variante B"
              >
                {copiedVariant === "B" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Variant C */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition">
              <div className="truncate">
                <span className="text-emerald-400 font-bold mr-1.5">[Variante C - Proof]:</span>
                <span className="text-slate-400 truncate">{variantUrls.C}</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(variantUrls.C, "C")}
                className="shrink-0 p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                title="Copiar URL Variante C"
              >
                {copiedVariant === "C" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Landing Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono-tech text-xs">
        <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] mb-1">
            <span>VISITAS LANDING</span>
            <Eye className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-base font-bold text-[var(--text-primary)]">
            {probe?.landing_views || 0}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] mb-1">
            <span>CLICS CTA</span>
            <MousePointerClick className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-base font-bold text-[var(--text-primary)]">
            {probe?.cta_clicks || 0}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] mb-1">
            <span>LEADS CAPTURADOS</span>
            <Users className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-base font-bold text-emerald-400">
            {leads.length || probe?.leads || 0}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] mb-1">
            <span>CONVERSIÓN LANDING</span>
            <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-base font-bold text-indigo-400">
            {probe?.landing_conversion || 0}%
          </div>
        </div>
      </div>

      {/* Manual Meta Ads Manager Result Form */}
      {showResultForm && (
        <form onSubmit={handleResultSubmit} className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-sky-500/30 space-y-3">
          <div className="text-xs font-bold text-[var(--text-primary)] flex items-center justify-between">
            <span>Cargar Datos Manuales de Meta Ads Manager (Presupuesto $20 USD)</span>
            <span className="text-[10px] font-mono-tech text-slate-400">Duración: 24-48h</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-mono-tech uppercase text-[var(--text-muted)] mb-1">
                Gasto Real (USD)
              </label>
              <input
                type="number"
                step="0.01"
                name="spend"
                required
                defaultValue={probe?.spend || 19.5}
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-mono-tech focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono-tech uppercase text-[var(--text-muted)] mb-1">
                Impresiones
              </label>
              <input
                type="number"
                name="impressions"
                required
                defaultValue={probe?.impressions || 1200}
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-mono-tech focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono-tech uppercase text-[var(--text-muted)] mb-1">
                Clics en Anuncio
              </label>
              <input
                type="number"
                name="clicks"
                required
                defaultValue={probe?.clicks || 28}
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-mono-tech focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono-tech uppercase text-[var(--text-muted)] mb-1">
              Notas del Experimento
            </label>
            <input
              type="text"
              name="notes"
              placeholder="Ej: Meta Ads feed móvil, audiencia electricistas residenciales US"
              className="w-full px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 rounded-lg text-xs font-bold bg-sky-500 text-white hover:bg-sky-400 transition shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Procesando resultados..." : "Guardar Resultados y Recalcular Métricas"}
          </button>
        </form>
      )}

      {/* Captured Leads Table */}
      {leads.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
          <div className="text-[11px] font-mono-tech font-bold uppercase text-[var(--text-muted)]">
            Leads Capturados en la Landing ({leads.length})
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] font-mono-tech border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)]">
                  <th className="py-1 px-2">Fecha</th>
                  <th className="py-1 px-2">Email</th>
                  <th className="py-1 px-2">Oficio</th>
                  <th className="py-1 px-2">Campaña</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {leads.map((l) => (
                  <tr key={l.id} className="text-[var(--text-secondary)]">
                    <td className="py-1.5 px-2">{l.created_at.split("T")[0]}</td>
                    <td className="py-1.5 px-2 text-[var(--text-primary)] font-semibold">{l.email}</td>
                    <td className="py-1.5 px-2 capitalize">{l.trade || "—"}</td>
                    <td className="py-1.5 px-2 text-[var(--text-muted)]">{l.campaign}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
