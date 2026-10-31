"use client";

import React from "react";
import { Search } from "lucide-react";

export interface DemoColumn<T> {
  header: string;
  accessorKey?: keyof T;
  className?: string;
  cell?: (row: T) => React.ReactNode;
}

interface DemoTableProps<T> {
  columns: DemoColumn<T>[];
  data: T[];
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  filterComponent?: React.ReactNode;
  actionsComponent?: React.ReactNode;
  renderMobileCard?: (row: T) => React.ReactNode;
}

export function DemoTable<T extends { id: string | number }>({
  columns,
  data,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Buscar registros...",
  emptyMessage = "No se encontraron registros que coincidan con la búsqueda.",
  filterComponent,
  actionsComponent,
  renderMobileCard,
}: DemoTableProps<T>) {
  return (
    <div className="space-y-4">
      {/* Controles: Búsqueda, Filtros y Acciones */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {onSearchChange && (
            <div className="relative min-w-[220px] max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery || ""}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-[#111827] border border-[#1E293B] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          )}
          {filterComponent}
        </div>

        {actionsComponent && <div className="flex items-center gap-2">{actionsComponent}</div>}
      </div>

      {/* Contenedor Desktop: Tabla */}
      <div className="hidden md:block rounded-xl border border-[#1E293B] bg-[#111827] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F17]/90 text-slate-400 font-mono-tech uppercase tracking-wider border-b border-[#1E293B]">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className={`px-4 py-3 font-semibold ${col.className || ""}`}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/70 text-slate-300">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-[#131B2A]/70 transition-colors group/row"
                  >
                    {columns.map((col, idx) => (
                      <td key={idx} className={`px-4 py-3.5 ${col.className || ""}`}>
                        {col.cell
                          ? col.cell(row)
                          : col.accessorKey
                          ? String(row[col.accessorKey] ?? "")
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contenedor Mobile: Tarjetas Compactas */}
      <div className="md:hidden space-y-3">
        {data.length === 0 ? (
          <div className="rounded-xl border border-[#1E293B] bg-[#111827] p-6 text-center text-xs text-slate-500">
            {emptyMessage}
          </div>
        ) : renderMobileCard ? (
          data.map((row) => <div key={row.id}>{renderMobileCard(row)}</div>)
        ) : (
          data.map((row) => (
            <div
              key={row.id}
              className="rounded-xl border border-[#1E293B] bg-[#111827] p-4 space-y-2.5 text-xs"
            >
              {columns.map((col, idx) => (
                <div key={idx} className="flex justify-between items-start gap-2">
                  <span className="text-slate-500 font-medium">{col.header}:</span>
                  <div className="text-right text-slate-200">
                    {col.cell
                      ? col.cell(row)
                      : col.accessorKey
                      ? String(row[col.accessorKey] ?? "")
                      : null}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Footer de Tabla con Conteo */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
        <span>Mostrando {data.length} registros demostrativos</span>
        <span className="font-mono-tech">100% in-memory / frontend</span>
      </div>
    </div>
  );
}
