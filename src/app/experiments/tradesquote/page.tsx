import type { Metadata } from "next";
import { Suspense } from "react";
import { TradesQuoteLandingClient } from "./TradesQuoteLandingClient";

export const metadata: Metadata = {
  title: "TradesQuote — Acceso Anticipado para Oficios",
  description:
    "Aprobá cambios de trabajo en obra en menos de 60 segundos con foto y firma del cliente.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function TradesQuoteExperimentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090e] text-slate-400 flex items-center justify-center text-xs font-mono">
          Cargando TradesQuote...
        </div>
      }
    >
      <TradesQuoteLandingClient />
    </Suspense>
  );
}
