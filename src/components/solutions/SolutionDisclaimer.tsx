import React from "react";
import { ShieldAlert, Info } from "lucide-react";

export function SolutionDisclaimer() {
  return (
    <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs font-mono-tech space-y-2">
      <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
        <Info className="w-3.5 h-3.5 text-sky-400" />
        <span>Transparencia & Estado del Proyecto</span>
      </div>
      <p className="text-slate-400 leading-relaxed text-[11px]">
        Este concepto representa una arquitectura de solución que Valentín Sznitowski puede adaptar, integrar y desarrollar a medida para negocios con necesidades similares. No se trata de un SaaS masivo genérico terminado con miles de usuarios, sino de un sistema diseñado para resolver un problema operativo específico con código propio, sin comisiones mensuales de terceros ni ataduras.
      </p>
    </div>
  );
}
