"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Receipt,
  DollarSign,
  Calendar,
  FileWarning,
  MessageSquare,
  Building2,
  ArrowRight,
  Download,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import {
  supplierKpis,
  paymentOrdersData,
  supplierProfileData,
  supplierUnitsData,
  taxDocumentsData,
} from "@/data/demos/suppliers";
import { DemoKpiCard } from "@/components/demos/DemoKpiCard";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";

export default function ProveedoresDashboardPage() {
  const [selectedUnit, setSelectedUnit] = useState<string>("all");

  const filteredOrders = paymentOrdersData.filter((op) =>
    selectedUnit === "all" ? true : op.businessUnitId === selectedUnit
  );

  return (
    <div className="space-y-6">
      {/* Cabecera del Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-blue-400 font-semibold">
            Portal de Autoservicio
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Bienvenido, {supplierProfileData.tradeName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            CUIT: {supplierProfileData.cuit} • Proveedor habilitado en {supplierKpis.holdingName}
          </p>
        </div>

        {/* Selector de Unidad de Negocio */}
        <div className="flex items-center gap-2">
          <label htmlFor="unit-select" className="text-xs text-slate-400 font-medium hidden sm:inline">
            Unidad:
          </label>
          <select
            id="unit-select"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="bg-[#111827] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">Todas las Unidades de Grupo Atlas</option>
            {supplierUnitsData.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Alerta de Documento Próximo a Vencer */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-300">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong className="text-white block">Atención: Certificado impositivo por vencer</strong>
            <span>El &quot;Certificado de No Retención de Ganancias AFIP&quot; vence en 2 días. Renová tu legajo para evitar deducciones en las próximas órdenes de pago.</span>
          </div>
        </div>
        <Link
          href="/demos/proveedores/documentacion"
          className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-medium text-xs whitespace-nowrap transition-colors"
        >
          Gestionar legajo →
        </Link>
      </div>

      {/* Grid de 4 Métricas Requeridas:
          1. Pagos recientes
          2. Próximo pago
          3. Documentos pendientes
          4. Reclamos abiertos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DemoKpiCard
          label="Pagos recientes"
          value={`$${(supplierKpis.monthlyPaidAmount / 1000000).toFixed(2)}M`}
          caption="Acreditado en cuenta bancaria"
          themeColor="emerald"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <DemoKpiCard
          label="Próximo pago"
          value={`$${(supplierKpis.scheduledAmount / 1000000).toFixed(2)}M`}
          caption={`Fecha programada: ${supplierKpis.nextPaymentDate}`}
          trend={{ value: "En fecha", isPositive: true }}
          themeColor="blue"
          icon={<Calendar className="w-5 h-5" />}
        />
        <DemoKpiCard
          label="Documentos pendientes"
          value={`${supplierKpis.pendingDocumentsCount} alerta`}
          caption="Exención de Ganancias por vencer"
          trend={{ value: "Requiere atención", isPositive: false }}
          themeColor="slate"
          icon={<FileWarning className="w-5 h-5 text-amber-400" />}
        />
        <DemoKpiCard
          label="Reclamos abiertos"
          value={`${supplierKpis.openClaimsCount} caso`}
          caption="En seguimiento por administración"
          themeColor="slate"
          icon={<MessageSquare className="w-5 h-5 text-blue-400" />}
        />
      </div>

      {/* Accesos Rápidos CTA */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/demos/proveedores/pagos"
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-md shadow-blue-500/20"
        >
          <Receipt className="w-4 h-4" />
          <span>Consultar órdenes de pago</span>
        </Link>
        <Link
          href="/demos/proveedores/documentacion"
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700 transition-colors"
        >
          <FileWarning className="w-4 h-4 text-amber-400" />
          <span>Ver estado de documentación</span>
        </Link>
        <Link
          href="/demos/proveedores/reclamos"
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span>Mesa de ayuda y reclamos</span>
        </Link>
      </div>

      {/* Fila Central: Órdenes de Pago Recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 rounded-xl bg-[#111827] border border-[#1E293B] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono-tech">
                Órdenes de Pago Recientes
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Consulta de montos brutos, deducciones impositivas y netos
              </p>
            </div>
            <Link
              href="/demos/proveedores/pagos"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Ver todas las OPs →
            </Link>
          </div>

          <div className="space-y-3">
            {filteredOrders.slice(0, 3).map((op) => (
              <div
                key={op.id}
                className="p-4 rounded-lg bg-[#0B0F17] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech font-bold text-white text-sm">
                      {op.opNumber}
                    </span>
                    <DemoStatusBadge
                      label={op.statusLabel}
                      tone={op.status === "paid" ? "success" : "info"}
                      size="sm"
                    />
                  </div>
                  <p className="text-slate-400">
                    {op.businessUnitName} • Pago: {op.paymentDate}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono-tech">
                    {op.paymentMethod}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0 space-y-1">
                  <div className="font-mono-tech">
                    <span className="text-slate-500 text-[10px] block">Neto a percibir:</span>
                    <span className="text-base font-bold text-emerald-400">
                      ${op.netAmount.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono-tech block">
                    Retenciones: -${op.totalWithholdings.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Unidades Habilitadas y Cuenta Bancaria */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono-tech block">
              Datos de Cobro Registrados
            </span>
            <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-2 text-xs font-mono-tech">
              <div>
                <span className="text-[10px] text-slate-500 block">Banco:</span>
                <span className="text-white font-medium">{supplierProfileData.bankName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">CBU Certificado:</span>
                <span className="text-slate-300 truncate block">{supplierProfileData.cbu}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Alias de cobro:</span>
                <span className="text-blue-400">{supplierProfileData.alias}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono-tech block">
              Unidades Asociadas de Grupo Atlas
            </span>
            <div className="space-y-2 text-xs">
              {supplierUnitsData.map((unit) => (
                <div
                  key={unit.id}
                  className="p-2.5 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-0.5"
                >
                  <span className="font-semibold text-white block">{unit.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono-tech block truncate">
                    {unit.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
