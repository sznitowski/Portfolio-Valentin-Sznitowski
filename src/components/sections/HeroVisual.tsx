"use client";

import React, { useState } from "react";
import {
  Workflow,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Activity,
  CheckCircle2,
  RefreshCw,
  Zap,
} from "lucide-react";

export const HeroVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"flujo" | "metricas">("flujo");

  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      {/* Resplandor ambiental de fondo */}
      <div
        className="absolute -inset-3 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-85 transition duration-700 pointer-events-none"
        aria-hidden="true"
      />

      {/* Marco principal de consola de sistemas */}
      <div className="relative rounded-2xl bg-[#0F172A]/90 border border-[#1E293B] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 group-hover:border-[#334155]">
        {/* Barra superior de estado de la plataforma */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0B0F17] border-b border-[#1E293B] select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="ml-2 text-xs font-mono-tech text-slate-400 hidden sm:inline">
              sistema-conectado // pipeline-operativo
            </span>
          </div>

          {/* Selector de vista interna */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#111827] border border-[#1E293B]">
            <button
              type="button"
              onClick={() => setActiveTab("flujo")}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                activeTab === "flujo"
                  ? "bg-[#1E293B] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Arquitectura de flujo
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("metricas")}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                activeTab === "metricas"
                  ? "bg-[#1E293B] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Monitoreo activo
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono-tech">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">operación nominal</span>
          </div>
        </div>

        {/* Cuerpo visual de sistemas conectados */}
        <div className="p-5 sm:p-8 bg-gradient-to-b from-[#0F172A] to-[#0A0E17]">
          {activeTab === "flujo" ? (
            <div className="space-y-6">
              {/* Diagrama conceptual interactivo de 4 módulos en serie */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative">
                {/* Módulo 1: Sistemas & Captura (Acento Esmeralda) */}
                <div className="p-4 rounded-xl bg-[#111827]/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group/card">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech uppercase font-semibold text-emerald-400 tracking-wider">
                      01 / Entrada
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Sistemas Web</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      Catálogos, portales y paneles de carga directa.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono-tech">
                    <span>Datos limpios</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                {/* Módulo 2: Integraciones & Conectividad (Acento Cyan) */}
                <div className="p-4 rounded-xl bg-[#111827]/90 border border-cyan-500/30 hover:border-cyan-400/60 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group/card">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech uppercase font-semibold text-cyan-400 tracking-wider">
                      02 / Enlace
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">APIs & ERP</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      Sincronización bidireccional entre sistemas.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono-tech">
                    <span>Webhooks / REST</span>
                    <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>

                {/* Módulo 3: Automatización & Reglas (Acento Azul) */}
                <div className="p-4 rounded-xl bg-[#111827]/90 border border-blue-500/30 hover:border-blue-400/60 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group/card">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech uppercase font-semibold text-blue-400 tracking-wider">
                      03 / Proceso
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Automatización</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      Cruces automáticos, validaciones y tareas programadas.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono-tech">
                    <span>Cero fricción</span>
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                </div>

                {/* Módulo 4: Resultados para Negocio */}
                <div className="p-4 rounded-xl bg-[#111827]/90 border border-slate-700 hover:border-slate-500 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group/card">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech uppercase font-semibold text-slate-400 tracking-wider">
                      04 / Salida
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Operación Autónoma</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      Menos tareas manuales, reportes claros y control total.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono-tech">
                    <span>Decisión ágil</span>
                    <Activity className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Tira inferior de estado contextual */}
              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Arquitecturas desacopladas listas para desplegarse como soluciones autónomas en tu empresa.
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-mono-tech text-slate-500 shrink-0">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Comercio
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Cobros
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Proveedores
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Vista de monitoreo / métricas operativas de sistemas */
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#111827] border border-[#1E293B] space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase text-slate-400">Tiempo de respuesta</span>
                  <p className="text-2xl font-bold text-emerald-400 font-mono-tech">&lt; 90 ms</p>
                  <p className="text-xs text-slate-400">Arquitectura estática optimizada</p>
                </div>
                <div className="p-4 rounded-xl bg-[#111827] border border-[#1E293B] space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase text-slate-400">Disponibilidad objetivo</span>
                  <p className="text-2xl font-bold text-cyan-400 font-mono-tech">99.9%</p>
                  <p className="text-xs text-slate-400">Infraestructura desacoplada</p>
                </div>
                <div className="p-4 rounded-xl bg-[#111827] border border-[#1E293B] space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase text-slate-400">Automatización de tareas</span>
                  <p className="text-2xl font-bold text-blue-400 font-mono-tech">100%</p>
                  <p className="text-xs text-slate-400">Jobs y validaciones sin intervención</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#1E293B] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  Bases de datos relacionales y APIs versionadas construidas con código limpio.
                </span>
                <span className="font-mono-tech text-[11px] text-slate-500 hidden sm:inline">TypeScript / Strict</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
