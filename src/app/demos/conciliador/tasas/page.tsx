import React from "react";
import {
  Percent,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Info,
  DollarSign,
} from "lucide-react";
import { rateAuditsData } from "@/data/demos/reconciliation";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";

export default function ConciliadorTasasPage() {
  const totalOvercharge = rateAuditsData.reduce(
    (acc, curr) => acc + (curr.monetaryImpact < 0 ? Math.abs(curr.monetaryImpact) : 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-cyan-400 font-semibold">
            Auditoría de Aranceles & Comisiones
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Control de Tasas Pactadas vs Aplicadas
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supervisión continua para verificar que los adquirentes respeten los aranceles comerciales contractuales.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/25 px-3 py-1.5 rounded-lg">
          <TrendingDown className="w-4 h-4 text-rose-400" />
          <span>Sobrearancel detectado: ${totalOvercharge.toLocaleString()}</span>
        </div>
      </div>

      {/* Banner de Datos Demostrativos */}
      <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-start gap-3 text-xs text-cyan-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Datos Demostrativos:</strong> Las alícuotas arancelarias, planes y volúmenes presentados son valores sintéticos para ilustrar el mecanismo de auditoría y no reproducen acuerdos comerciales de ninguna entidad financiera real.
        </p>
      </div>

      {/* Tarjetas de Auditoría de Tasas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rateAuditsData.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl bg-[#111827] border p-5 space-y-4 transition-all ${
              item.status === "overcharge"
                ? "border-rose-500/30 hover:border-rose-500/60"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-sm font-bold text-white block">
                  {item.provider} — {item.cardType}
                </span>
                <span className="text-xs text-slate-400 font-mono-tech">{item.plan}</span>
              </div>
              <DemoStatusBadge
                label={item.statusLabel}
                tone={item.status === "compliant" ? "success" : "danger"}
                size="sm"
              />
            </div>

            {/* Comparativa */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[#0B0F17] border border-slate-800 font-mono-tech text-center">
              <div>
                <span className="text-[10px] text-slate-500 block">Tasa Pactada</span>
                <span className="text-slate-300 font-bold text-xs">{item.expectedRate}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Tasa Aplicada</span>
                <span
                  className={`font-bold text-xs ${
                    item.rateDifference > 0 ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {item.appliedRate}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Diferencia</span>
                <span
                  className={`font-bold text-xs ${
                    item.rateDifference > 0 ? "text-rose-400" : "text-slate-400"
                  }`}
                >
                  {item.rateDifference > 0 ? `+${item.rateDifference}%` : "0%"}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{item.note}</p>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-500">
                Volumen lote: ${(item.periodVolume / 1000).toLocaleString()}k
              </span>
              {item.monetaryImpact !== 0 ? (
                <span className="font-bold text-rose-400">
                  Desvío: ${item.monetaryImpact.toLocaleString()}
                </span>
              ) : (
                <span className="text-emerald-400 font-medium">Sin desvío</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
