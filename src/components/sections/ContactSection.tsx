"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { businessData } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(businessData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 relative">
      <Container size="narrow">
        <div className="rounded-2xl border border-[#242830] bg-gradient-to-b from-[#121417] via-[#15181D] to-[#1A1D22] p-8 sm:p-12 lg:p-14 text-center space-y-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D97706]/15 rounded-full blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#D97706] font-semibold bg-[#D97706]/10 px-3 py-1 rounded-full border border-[#D97706]/20 inline-block">
              Contacto Comercial Directo
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F3F4F6] tracking-tight leading-tight">
              Si tenés un proceso de venta o cotización que hoy resolvés a mano,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] to-[#F59E0B]">
                podemos mejorarlo.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Escribime directamente por WhatsApp contándome sobre tu negocio o enviame un correo. Te doy mi punto de vista técnico y comercial sin compromiso ni vueltas.
            </p>
          </div>

          {/* Botones de Contacto Directo */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href={businessData.whatsapp.url}
              isExternal
              size="lg"
              variant="primary"
              icon={<MessageSquare className="w-5 h-5 text-[#0A0B0D]" />}
              iconPosition="left"
              className="w-full sm:w-auto font-semibold"
            >
              Escribime por WhatsApp
            </Button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl text-sm font-medium bg-[#121417] text-[#F3F4F6] border border-[#242830] hover:border-[#3A404A] hover:bg-[#1A1D22] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] active:scale-[0.98]"
              aria-label="Copiar correo electrónico al portapapeles"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981] font-semibold">¡Email copiado al portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#9CA3AF]" />
                  <span>Copiar email ({businessData.email})</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-4 border-t border-[#242830]/80 flex flex-wrap items-center justify-center gap-6 text-xs text-[#9CA3AF]">
            <a
              href={`mailto:${businessData.email}`}
              className="hover:text-[#F3F4F6] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#D97706]" />
              <span>O abrir cliente de correo directamente</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <span className="text-[#242830] hidden sm:inline">•</span>
            <span>Respuesta en el día laboral · Sin intermediarios</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
