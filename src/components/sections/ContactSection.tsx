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
        <div className="rounded-2xl border border-[#1E293B] bg-gradient-to-b from-[#111827] via-[#131B2A] to-[#161F30] p-8 sm:p-12 lg:p-14 text-center space-y-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/15 rounded-full blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold bg-[#3B82F6]/10 px-3 py-1 rounded-full border border-[#3B82F6]/25 inline-block">
              Hablemos de tu Proyecto o Sistema
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
              ¿Necesitás construir algo nuevo o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#818CF8]">
                mejorar un sistema que ya tenés?
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Podemos coordinar una conversación directa para analizar tu situación actual, los plazos y la mejor forma técnica de encararlo, sin intermediarios ni compromisos.
            </p>
          </div>

          {/* Botones de Contacto Directo */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href={businessData.whatsapp.url}
              isExternal
              size="lg"
              variant="primary"
              icon={<MessageSquare className="w-5 h-5 text-white" />}
              iconPosition="left"
              className="w-full sm:w-auto font-semibold"
            >
              Escribime por WhatsApp
            </Button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl text-sm font-medium bg-[#111827] text-[#F8FAFC] border border-[#1E293B] hover:border-[#334155] hover:bg-[#1E293B] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] active:scale-[0.98]"
              aria-label="Copiar correo electrónico al portapapeles"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981] font-semibold">¡Email copiado al portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#94A3B8]" />
                  <span>Copiar email ({businessData.email})</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-4 border-t border-[#1E293B]/80 flex flex-wrap items-center justify-center gap-6 text-xs text-[#94A3B8]">
            <a
              href={`mailto:${businessData.email}`}
              className="hover:text-[#F8FAFC] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>O abrir cliente de correo directamente</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <span className="text-[#1E293B] hidden sm:inline">•</span>
            <span>Respuesta en el día laboral · Sin intermediarios</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
