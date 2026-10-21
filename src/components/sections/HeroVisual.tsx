import React from "react";
import Image from "next/image";
import { Check, MessageSquare, Sliders, ExternalLink } from "lucide-react";
import { businessData } from "@/data/business";

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      {/* Ambient background glow */}
      <div
        className="absolute -inset-2 bg-gradient-to-r from-[#D97706]/15 via-[#10B981]/10 to-[#D97706]/15 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition duration-700 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Browser / Application Frame */}
      <div className="relative rounded-2xl bg-[#121417] border border-[#242830] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 group-hover:border-[#3A404A]">
        {/* Browser Top Navigation Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0A0B0D]/90 border-b border-[#242830] select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/80" />
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1A1D22] border border-[#242830] text-xs font-mono-tech text-[#9CA3AF] max-w-xs sm:max-w-md truncate">
            <span className="text-[#10B981]">https://</span>
            <span>custom-commerce.netlify.app/producto/mesa-tala</span>
          </div>
          <a
            href={businessData.urls.customCommerceDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#9CA3AF] hover:text-[#D97706] transition-colors flex items-center gap-1.5 font-medium"
            title="Abrir demo en vivo de Custom Commerce"
          >
            <span className="hidden sm:inline">Probar demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Real Product Customizer UI */}
        <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 bg-gradient-to-b from-[#121417] to-[#0A0B0D]">
          {/* Columna Izquierda: Fotografía real del producto en catálogo */}
          <div className="md:col-span-5 flex flex-col justify-between rounded-xl bg-[#1A1D22] border border-[#242830] overflow-hidden group/img">
            {/* Header del producto */}
            <div className="p-4 bg-[#121417]/80 border-b border-[#242830] flex items-center justify-between">
              <span className="text-[11px] font-mono-tech uppercase text-[#D97706] tracking-wider font-semibold">
                Taller Roble & Veta
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-live" />
                Catálogo Real
              </span>
            </div>

            {/* Fotografía real del producto desde la demo */}
            <div className="relative w-full aspect-[4/3] bg-[#0A0B0D] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80"
                alt="Mesa de comedor de Petiribí macizo en ambiente real"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0D] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] font-mono-tech text-[#9CA3AF] uppercase block">
                  SKU: MESA-TALA-01
                </span>
                <span className="text-sm font-bold text-white block drop-shadow-sm">
                  Mesa Comedor &quot;Tala&quot; en Petiribí
                </span>
              </div>
            </div>

            {/* Precio Base Configurado */}
            <div className="p-4 bg-[#121417] border-t border-[#242830] flex items-center justify-between">
              <span className="text-xs text-[#9CA3AF]">Precio configurado:</span>
              <span className="font-extrabold text-[#F3F4F6] text-base text-[#D97706]">
                $980.000 <span className="text-[11px] font-normal text-[#9CA3AF]">(base)</span>
              </span>
            </div>
          </div>

          {/* Columna Derecha: Opciones y selector a medida */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#D97706] font-medium mb-1">
                <Sliders className="w-4 h-4" />
                <span className="font-mono-tech uppercase tracking-wide">Configurador a Medida</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#F3F4F6] tracking-tight">
                El cliente personaliza antes de contactar
              </h3>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1 leading-relaxed">
                Selección de medidas exactas, especie de madera y terminación. El presupuesto se calcula al instante sin demoras por chat.
              </p>
            </div>

            {/* Opciones Interactivas reales */}
            <div className="space-y-3.5">
              {/* Madera */}
              <div>
                <label className="text-xs font-medium text-[#9CA3AF] block mb-1.5">
                  Especie de Madera Maciza
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="text-xs bg-[#D97706]/15 border border-[#D97706]/40 text-[#F3F4F6] px-3 py-2 rounded-lg flex items-center justify-between font-medium">
                    <span>Petiribí</span>
                    <Check className="w-3.5 h-3.5 text-[#D97706]" />
                  </div>
                  <div className="text-xs bg-[#1A1D22] border border-[#242830] text-[#9CA3AF] px-3 py-2 rounded-lg flex items-center justify-between">
                    <span>Guayubira</span>
                  </div>
                  <div className="text-xs bg-[#1A1D22] border border-[#242830] text-[#9CA3AF] px-3 py-2 rounded-lg flex items-center justify-between hidden sm:flex">
                    <span>Roble</span>
                  </div>
                </div>
              </div>

              {/* Medida */}
              <div>
                <label className="text-xs font-medium text-[#9CA3AF] block mb-1.5">
                  Dimensiones de la Tapa (Largo x Ancho)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-xs bg-[#D97706]/15 border border-[#D97706]/40 text-[#F3F4F6] px-3 py-2 rounded-lg flex items-center justify-between font-medium">
                    <span>2.20 x 1.00 m (8 pers.)</span>
                    <Check className="w-3.5 h-3.5 text-[#D97706]" />
                  </div>
                  <div className="text-xs bg-[#1A1D22] border border-[#242830] text-[#9CA3AF] px-3 py-2 rounded-lg flex items-center justify-between">
                    <span>2.60 x 1.10 m (10 pers.)</span>
                  </div>
                </div>
              </div>

              {/* Terminación */}
              <div>
                <label className="text-xs font-medium text-[#9CA3AF] block mb-1.5">
                  Protección & Terminación
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-xs bg-[#D97706]/15 border border-[#D97706]/40 text-[#F3F4F6] px-3 py-2 rounded-lg flex items-center justify-between font-medium">
                    <span>Hidrolaca Satinada</span>
                    <Check className="w-3.5 h-3.5 text-[#D97706]" />
                  </div>
                  <div className="text-xs bg-[#1A1D22] border border-[#242830] text-[#9CA3AF] px-3 py-2 rounded-lg flex items-center justify-between">
                    <span>Aceite de Tung & Cera</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de Presupuesto estructurado */}
            <div className="pt-2">
              <a
                href={businessData.urls.customCommerceDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 hover:bg-[#10B981]/25 hover:border-[#10B981]/60 transition-all p-3 flex items-center justify-between gap-3 group/btn"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 flex items-center justify-center shrink-0 text-[#10B981]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-semibold text-[#F3F4F6] group-hover/btn:text-white transition-colors">
                      Enviar solicitud de presupuesto a WhatsApp
                    </span>
                    <span className="text-[11px] text-[#9CA3AF]">
                      Incluye medidas exactas, madera elegida y SKU del producto
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#10B981] shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Status bar */}
        <div className="bg-[#0A0B0D] px-6 py-2.5 border-t border-[#242830] flex flex-wrap items-center justify-between text-xs text-[#6B7280]">
          <span>Flujo comercial: Catálogo categorizado → Opciones a medida → WhatsApp listo</span>
          <span className="text-[#10B981] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Demo operativa en Netlify
          </span>
        </div>
      </div>
    </div>
  );
};
