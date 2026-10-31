"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  User,
  Calendar,
} from "lucide-react";
import { purchaseOrdersData, PurchaseOrder } from "@/data/demos/suppliers";
import { DemoTable, DemoColumn } from "@/components/demos/DemoTable";
import { DemoStatusBadge } from "@/components/demos/DemoStatusBadge";

export default function ProveedoresComprasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = useMemo(() => {
    return purchaseOrdersData.filter((oc) => {
      const matchesSearch =
        oc.ocNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        oc.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        oc.mainCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        oc.businessUnitName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || oc.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const columns: DemoColumn<PurchaseOrder>[] = [
    {
      header: "Orden de Compra",
      cell: (row) => (
        <div>
          <span className="font-mono-tech font-bold text-white text-sm block">
            {row.ocNumber}
          </span>
          <span className="text-[11px] text-slate-400 block truncate">
            {row.businessUnitName}
          </span>
        </div>
      ),
    },
    {
      header: "Rubro & Ítems",
      cell: (row) => (
        <div>
          <span className="text-white block font-medium truncate">{row.mainCategory}</span>
          <span className="text-[11px] text-slate-400 font-mono-tech">
            {row.itemsCount} posiciones solicitadas
          </span>
        </div>
      ),
    },
    {
      header: "Fechas",
      cell: (row) => (
        <div className="font-mono-tech text-xs">
          <span className="text-slate-300 block">Emitida: {row.issueDate}</span>
          <span className="text-slate-500 block">Entrega: {row.deliveryDate}</span>
        </div>
      ),
    },
    {
      header: "Comprador",
      cell: (row) => (
        <span className="text-xs text-slate-300 truncate block">
          {row.buyerName}
        </span>
      ),
    },
    {
      header: "Importe Total",
      cell: (row) => (
        <span className="font-mono-tech font-bold text-white text-sm">
          ${row.totalAmount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Estado",
      className: "text-right",
      cell: (row) => (
        <DemoStatusBadge
          label={row.statusLabel}
          tone={
            row.status === "completed"
              ? "success"
              : row.status === "in_progress"
              ? "info"
              : "warning"
          }
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-blue-400 font-semibold">
            Abastecimiento & Suministros
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Órdenes de Compra Emitidas
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Seguimiento de pedidos de compra, fechas pactadas de entrega y compradores asignados en Grupo Atlas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111827] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="Filtrar por estado de compra"
          >
            <option value="all">Todos los estados</option>
            <option value="completed">Entregadas & Aprobadas</option>
            <option value="in_progress">En curso / Fabricación</option>
            <option value="pending">Pendientes de confirmación</option>
          </select>
        </div>
      </div>

      {/* Tabla de Compras */}
      <DemoTable<PurchaseOrder>
        columns={columns}
        data={filteredData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Buscar por OC, rubro, comprador o planta..."
        renderMobileCard={(row) => (
          <div className="rounded-xl border border-[#1E293B] bg-[#111827] p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono-tech font-bold text-white block text-sm">
                  {row.ocNumber}
                </span>
                <span className="text-xs text-slate-400">{row.businessUnitName}</span>
              </div>
              <DemoStatusBadge
                label={row.statusLabel}
                tone={
                  row.status === "completed"
                    ? "success"
                    : row.status === "in_progress"
                    ? "info"
                    : "warning"
                }
                size="sm"
              />
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-white font-medium block">{row.mainCategory}</span>
              <span className="text-slate-400 font-mono-tech block">
                Comprador: {row.buyerName}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800 font-mono-tech">
              <span className="text-slate-500">Entrega: {row.deliveryDate}</span>
              <span className="text-white font-bold text-sm">
                ${row.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      />
    </div>
  );
}
