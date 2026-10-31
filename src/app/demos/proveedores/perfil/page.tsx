import React from "react";
import {
  Building2,
  ShieldCheck,
  User,
  CreditCard,
  MapPin,
  Mail,
  Phone,
  Building,
  Info,
} from "lucide-react";
import {
  supplierProfileData,
  supplierUnitsData,
  supplierKpis,
} from "@/data/demos/suppliers";

export default function ProveedoresPerfilPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-blue-400 font-semibold">
            Datos Maestros
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Perfil de Empresa Proveedora
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ficha institucional, datos fiscales, bancarios y asignaciones de unidades en {supplierKpis.holdingName}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Proveedor Activo & Certificado</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Información Fiscal y Contacto */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tarjeta de Identidad Fiscal */}
          <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-6 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono-tech flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Identificación Fiscal & Domicilio</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-tech">
              <div className="p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 block uppercase">Razón Social</span>
                <span className="font-bold text-white text-sm block">
                  {supplierProfileData.companyName}
                </span>
                <span className="text-slate-400 block">{supplierProfileData.tradeName}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 block uppercase">CUIT Registrado</span>
                <span className="font-bold text-blue-400 text-sm block">
                  {supplierProfileData.cuit}
                </span>
                <span className="text-[10px] text-slate-500 block">Identificador Sintético</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800 flex items-start gap-3 text-xs">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Domicilio Fiscal:</span>
                <span className="text-slate-400 font-mono-tech">{supplierProfileData.fiscalAddress}</span>
              </div>
            </div>
          </div>

          {/* Contacto Administrativo */}
          <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-6 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono-tech flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Responsable Comercial / Tesorería</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 block">Contacto</span>
                <span className="text-white font-medium block">{supplierProfileData.contactName}</span>
              </div>

              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 block">Email Oficial</span>
                <span className="text-slate-300 font-mono-tech block truncate">
                  {supplierProfileData.contactEmail}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 block">Teléfono</span>
                <span className="text-slate-300 font-mono-tech block">
                  {supplierProfileData.contactPhone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Datos de Cobro y Unidades */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cuenta Bancaria Certificada */}
          <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono-tech flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Cuenta Bancaria Validada</span>
            </h3>

            <div className="p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-2 text-xs font-mono-tech">
              <div>
                <span className="text-[10px] text-slate-500 block">Entidad Bancaria:</span>
                <span className="font-bold text-white">{supplierProfileData.bankName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Tipo de Cuenta:</span>
                <span className="text-slate-300">{supplierProfileData.accountType}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">CBU Certificado:</span>
                <span className="text-slate-200 block truncate">{supplierProfileData.cbu}</span>
              </div>
              <div className="pt-1 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 block">Alias de cobro:</span>
                <span className="text-emerald-400 font-bold">{supplierProfileData.alias}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Los pagos se acreditan automáticamente en esta cuenta bancaria.
              </span>
            </div>
          </div>

          {/* Unidades de Negocio Asignadas */}
          <div className="rounded-xl bg-[#111827] border border-[#1E293B] p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono-tech flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-400" />
              <span>Unidades de {supplierKpis.holdingName}</span>
            </h3>

            <div className="space-y-2 text-xs">
              {supplierUnitsData.map((u) => (
                <div
                  key={u.id}
                  className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{u.name}</span>
                    <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {u.code}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono-tech block truncate">
                    {u.location}
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
