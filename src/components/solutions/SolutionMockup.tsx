"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Tablet,
  CheckCircle2,
  AlertTriangle,
  Camera,
  PenTool,
  Receipt,
  FileText,
  MapPin,
  Clock,
  Scan,
  MinusCircle,
  PlusCircle,
  Share2,
  Navigation,
  FileCheck,
} from "lucide-react";
import { PortfolioSolution } from "@/data/solutions/catalog";

interface SolutionMockupProps {
  solution: PortfolioSolution;
}

export function SolutionMockup({ solution }: SolutionMockupProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Colors
  const accentColor = solution.accentColor;
  const accentBorder = {
    sky: "border-sky-500/40 text-sky-400 bg-sky-500/10",
    emerald: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    indigo: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10",
    amber: "border-amber-500/40 text-amber-400 bg-amber-500/10",
  }[accentColor];

  return (
    <div id="flujo-y-mockup" className="space-y-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[var(--accent-primary)]">
          <Smartphone className="w-4 h-4" />
          <span>Simulación Visual de Interfaz (Mockup Conceptual)</span>
        </div>
        <span className="text-[10px] font-mono-tech px-2.5 py-0.5 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 font-bold uppercase tracking-wider">
          Simulación Conceptual · Datos de Ejemplo
        </span>
      </div>

      <div className="p-4 sm:p-8 rounded-2xl bg-[#090d16] border border-[var(--border-subtle)] shadow-2xl flex justify-center">
        {solution.mockupType === "mobile-quote" && (
          <TradesQuoteMockup activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {solution.mockupType === "inspection-checklist" && (
          <ChecklistRapidoMockup activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {solution.mockupType === "route-dispatcher" && (
          <CleanRouteMockup activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {solution.mockupType === "inventory-parts" && (
          <TruckStockMockup activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}

// 1. TradesQuote Interactive Phone Simulation
function TradesQuoteMockup({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: (idx: number) => void;
}) {
  const tabs = [
    { label: "1. Presupuesto", icon: FileText },
    { label: "2. Change Order", icon: PlusCircle },
    { label: "3. Foto Obra", icon: Camera },
    { label: "4. Firma", icon: PenTool },
    { label: "5. Factura", icon: Receipt },
  ];

  return (
    <div className="w-full max-w-sm rounded-[2.5rem] bg-slate-950 border-4 border-slate-800 p-4 shadow-2xl space-y-4 font-mono-tech text-xs">
      {/* Phone Header / Status Bar */}
      <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-800 text-[10px] text-slate-400">
        <span className="font-bold text-white">09:41</span>
        <div className="w-16 h-3.5 rounded-full bg-slate-900 mx-auto" />
        <span className="text-emerald-400">● Almacenamiento Local (PWA)</span>
      </div>

      {/* App Bar */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <div className="text-[10px] text-sky-400 uppercase font-bold">TradesQuote Mobile</div>
          <div className="text-xs font-bold text-white">Obra: Calle Brown 412</div>
        </div>
        <span className="px-2 py-0.5 rounded text-[9px] bg-sky-950 text-sky-300 border border-sky-500/30">
          Electricidad
        </span>
      </div>

      {/* Step Tabs Navigation */}
      <div className="grid grid-cols-5 gap-1 bg-slate-900 p-1 rounded-xl">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`p-1.5 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? "bg-sky-500 text-white shadow-sm font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5 mb-0.5" />
              <span className="text-[8px] truncate">{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Screen Content */}
      <div className="min-h-[260px] p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
        {activeTab === 0 && (
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-white border-b border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Presupuesto Inicial Pactado</span>
              <span className="text-sky-400">$1,200.00</span>
            </div>
            <div className="space-y-1.5 text-[10px] text-slate-300">
              <div className="flex justify-between p-1.5 rounded bg-slate-950">
                <span>Instalación Tablero Principal</span>
                <span className="font-bold text-white">$850.00</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-slate-950">
                <span>Cableado y llaves térmicas (x3)</span>
                <span className="font-bold text-white">$350.00</span>
              </div>
            </div>
            <div className="p-2 rounded bg-sky-950/40 border border-sky-500/20 text-[9px] text-sky-300">
              Presupuesto original aceptado verbalmente antes de iniciar obra.
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-amber-300 border-b border-slate-800 pb-1.5 flex items-center justify-between">
              <span>+ Nuevo Change Order In-Situ</span>
              <span className="text-amber-400">+$350.00</span>
            </div>
            <div className="space-y-1.5 text-[10px] text-slate-300">
              <div className="flex justify-between p-1.5 rounded bg-amber-950/30 border border-amber-500/20">
                <span>Mover circuito embutido pared</span>
                <span className="font-bold text-amber-300">+$180.00</span>
              </div>
              <div className="flex justify-between p-1.5 rounded bg-amber-950/30 border border-amber-500/20">
                <span>4 Tomas dobles extras cocina</span>
                <span className="font-bold text-amber-300">+$170.00</span>
              </div>
            </div>
            <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30 text-[9px] text-amber-200">
              Cargado en 30 segundos mientras el cliente lo pedía en obra.
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-white border-b border-slate-800 pb-1.5">
              Evidencia Fotográfica In-Situ
            </div>
            <div className="h-32 rounded-lg bg-slate-950 border border-dashed border-sky-500/40 flex flex-col items-center justify-center text-center p-2 text-sky-300 relative overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center mb-1">
                <Camera className="w-4 h-4 text-sky-400" />
              </div>
              <span className="text-[10px] font-bold">FOTO_OBRA_01.JPG</span>
              <span className="text-[8px] text-slate-400">Caño embutido bloqueado por viga</span>
              <div className="absolute bottom-1 right-2 text-[8px] text-slate-500">
                31-OCT-2026 14:22 · GPS OK
              </div>
            </div>
            <div className="text-[9px] text-slate-400 text-center">
              Sella visualmente el porqué del trabajo imprevisto.
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-emerald-300 border-b border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Firma de Aprobación Cliente</span>
              <span className="text-[9px] text-emerald-400">EN PANTALLA</span>
            </div>
            <div className="h-28 rounded-lg bg-slate-950 border border-slate-800 p-2 flex flex-col justify-between">
              <div className="text-[9px] text-slate-400">
                Apruebo adicional por $350.00 según lo conversado:
              </div>
              <div className="text-center font-serif italic text-lg text-emerald-300 tracking-wider">
                Juan Manuel Pérez
              </div>
              <div className="border-t border-slate-700 pt-1 flex justify-between text-[8px] text-slate-500">
                <span>Cliente: Juan M. Pérez</span>
                <span>Hora: 14:24 hs</span>
              </div>
            </div>
            <div className="text-[9px] text-emerald-400 text-center font-bold">
              ✔ Respaldo firmado antes de iniciar la tarea extra.
            </div>
          </div>
        )}

        {activeTab === 4 && (
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold text-white border-b border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Factura Final Unificada</span>
              <span className="text-sky-400 font-bold">$1,550.00</span>
            </div>
            <div className="space-y-1 text-[9px] text-slate-300">
              <div className="flex justify-between">
                <span>Presupuesto base:</span>
                <span>$1,200.00</span>
              </div>
              <div className="flex justify-between text-amber-300">
                <span>+ Adicional firmado (#CO-01):</span>
                <span>+$350.00</span>
              </div>
              <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-white text-[10px]">
                <span>Total a cobrar sin disputas:</span>
                <span>$1,550.00</span>
              </div>
            </div>
            <button
              type="button"
              className="w-full py-1.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3 h-3" />
              <span>Enviar Comprobante por WhatsApp</span>
            </button>
          </div>
        )}

        {/* Footer Navigation within Phone */}
        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
          <button
            type="button"
            disabled={activeTab === 0}
            onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
            className="text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
          >
            ← Anterior
          </button>
          <span className="text-[9px] text-slate-500">Paso {activeTab + 1} de 5</span>
          <button
            type="button"
            disabled={activeTab === 4}
            onClick={() => setActiveTab(Math.min(4, activeTab + 1))}
            className="text-sky-400 hover:text-sky-300 font-bold disabled:opacity-30 cursor-pointer"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Checklist Rápido Interactive Simulation
function ChecklistRapidoMockup({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: (val: number) => void;
}) {
  const [items, setItems] = useState([
    { name: "Presión de gas refrigerante R410A (68 PSI)", status: "OK" },
    { name: "Estado de filtros de retorno de aire", status: "DEFECTO" },
    { name: "Consumo de corriente compresor (28.4 A)", status: "OK" },
    { name: "Verificación de drenaje de condensado", status: "OK" },
  ]);

  return (
    <div className="w-full max-w-md rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl space-y-4 font-mono-tech text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase">Checklist Rápido</span>
          <h4 className="text-xs font-bold text-white">Inspección HVAC Preventiva</h4>
        </div>
        <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
          Chiller Carrier #15TR
        </span>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] text-slate-400 uppercase">Puntos de Verificación Obligatorios:</div>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <span className="text-[11px] text-slate-200">{item.name}</span>
            <span
              className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                item.status === "OK"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-950 text-rose-300 border border-rose-500/30"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Photo Attachment with note */}
      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-amber-300 font-bold flex items-center gap-1">
            <Camera className="w-3 h-3" />
            <span>Evidencia: Filtro saturado</span>
          </span>
          <span className="text-[9px] text-slate-500">14:15 hs</span>
        </div>
        <div className="text-[10px] text-slate-400">
          Filtro colmatado con polvillo industrial. Se recomienda reemplazo urgente para evitar congelamiento de serpentina.
        </div>
      </div>

      {/* Signature & Export Button */}
      <div className="pt-2 border-t border-slate-800 space-y-2">
        <div className="flex justify-between items-center text-[10px] text-slate-400">
          <span>Firma Supervisor en Planta:</span>
          <span className="text-emerald-300 italic">Carlos Rossi (Mantenimiento)</span>
        </div>
        <button
          type="button"
          className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
        >
          <FileCheck className="w-4 h-4" />
          <span>Generar y Enviar Informe PDF Institucional</span>
        </button>
      </div>
    </div>
  );
}

// 3. CleanRoute Interactive Route Simulation
function CleanRouteMockup({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: (val: number) => void;
}) {
  const stops = [
    { num: 1, time: "08:30", address: "Av. Libertador 4200", status: "COMPLETADO", type: "Oficina 300m²" },
    { num: 2, time: "10:45", address: "Juramento 1850", status: "EN CURSO", type: "Local Comercial" },
    { num: 3, time: "13:00", address: "Cramer 2100", status: "PENDIENTE", type: "Limpieza Final de Obra" },
    { num: 4, time: "15:15", address: "Monroe 3400", status: "PENDIENTE", type: "Consorcio 8 Pisos" },
  ];

  return (
    <div className="w-full max-w-md rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl space-y-4 font-mono-tech text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <span className="text-[10px] text-indigo-400 font-bold uppercase">CleanRoute Dispatcher</span>
          <h4 className="text-xs font-bold text-white">Hoja de Ruta: Cuadrilla Belgrano / Nuñez</h4>
        </div>
        <span className="px-2 py-0.5 rounded text-[9px] bg-indigo-950 text-indigo-300 border border-indigo-500/30">
          4 Paradas Asignadas
        </span>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-center">
        <div>
          <div className="text-[9px] text-slate-400 uppercase">ITINERARIO DEL DÍA</div>
          <div className="text-xs font-bold text-emerald-400">4 Paradas Planificadas</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-400 uppercase">CRITERIO DE RUTA</div>
          <div className="text-xs font-bold text-indigo-300">Secuencia Geográfica</div>
        </div>
      </div>

      {/* Stops Sequence */}
      <div className="space-y-2">
        {stops.map((stop) => (
          <div
            key={stop.num}
            className={`p-2.5 rounded-lg border flex items-center justify-between ${
              stop.status === "COMPLETADO"
                ? "bg-slate-900/50 border-slate-800 opacity-60"
                : stop.status === "EN CURSO"
                ? "bg-indigo-950/50 border-indigo-500/40 shadow-sm"
                : "bg-slate-900 border-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                {stop.num}
              </span>
              <div>
                <div className="text-[11px] font-bold text-white">{stop.address}</div>
                <div className="text-[9px] text-slate-400">{stop.type} · Horario: {stop.time}</div>
              </div>
            </div>

            <span
              className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                stop.status === "COMPLETADO"
                  ? "bg-emerald-950 text-emerald-400"
                  : stop.status === "EN CURSO"
                  ? "bg-indigo-900 text-indigo-200 animate-pulse"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {stop.status}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full py-2 rounded-xl bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2"
      >
        <Navigation className="w-3.5 h-3.5" />
        <span>Abrir Ruta Optimizada en GPS de la Cuadrilla</span>
      </button>
    </div>
  );
}

// 4. TruckStock Lite Interactive Simulation
function TruckStockMockup({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: (val: number) => void;
}) {
  const parts = [
    { code: "VALV-34", name: "Válvula Esférica 3/4 Gas", stock: 8, min: 3, status: "OK" },
    { code: "TERM-90", name: "Termocupla Universal 90cm", stock: 1, min: 4, status: "CRÍTICO" },
    { code: "CAP-45UF", name: "Capacitor Arranque 45uF", stock: 0, min: 2, status: "SIN STOCK" },
    { code: "PRESO-01", name: "Presostato Diferencial", stock: 4, min: 2, status: "OK" },
  ];

  return (
    <div className="w-full max-w-md rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl space-y-4 font-mono-tech text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <span className="text-[10px] text-amber-400 font-bold uppercase">TruckStock Lite</span>
          <h4 className="text-xs font-bold text-white">Inventario Móvil: Camioneta #03</h4>
        </div>
        <span className="px-2 py-0.5 rounded text-[9px] bg-amber-950 text-amber-300 border border-amber-500/30">
          Repuestos HVAC & Gas
        </span>
      </div>

      {/* Quick Search & Barcode Scan Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          readOnly
          value="Buscar pieza o escanear QR..."
          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-500"
        />
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 text-[10px] font-bold"
        >
          <Scan className="w-3.5 h-3.5" />
          <span>Escanear</span>
        </button>
      </div>

      {/* Parts List */}
      <div className="space-y-2">
        {parts.map((p, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between"
          >
            <div>
              <div className="text-[11px] font-bold text-white">{p.name}</div>
              <div className="text-[9px] text-slate-400 font-mono-tech">
                Código: {p.code} · Mínimo deseado: {p.min} unid.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  p.status === "OK"
                    ? "bg-emerald-950 text-emerald-300"
                    : p.status === "CRÍTICO"
                    ? "bg-amber-950 text-amber-300"
                    : "bg-rose-950 text-rose-300 animate-pulse"
                }`}
              >
                {p.stock} u. ({p.status})
              </span>

              <button
                type="button"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                title="Descontar 1 unidad"
              >
                <MinusCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Restock Action */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[10px] text-rose-300">2 ítems requieren reposición hoy</span>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px] shadow"
        >
          Enviar Pedido al Depósito Central
        </button>
      </div>
    </div>
  );
}
