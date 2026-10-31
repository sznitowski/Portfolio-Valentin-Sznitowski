import React from "react";
import { Metadata } from "next";
import {
  LayoutDashboard,
  UploadCloud,
  FileCheck2,
  AlertTriangle,
  Percent,
  Lock,
} from "lucide-react";
import { DemoAppShell, DemoNavItem } from "@/components/demos/DemoAppShell";

export const metadata: Metadata = {
  title: "Control y Conciliación de Cobros | Valentín Sznitowski",
  description:
    "Prototipo interactivo de conciliación automatizada de cupones, liquidaciones de tarjetas, control de tasas y auditoría.",
};

const navItems: DemoNavItem[] = [
  {
    label: "Panel",
    href: "/demos/conciliador",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Conciliaciones",
    href: "/demos/conciliador/conciliacion",
    icon: <FileCheck2 className="w-4 h-4" />,
  },
  {
    label: "Diferencias",
    href: "/demos/conciliador/excepciones",
    icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
    badge: "38 desvíos",
  },
  {
    label: "Importaciones",
    href: "/demos/conciliador/importaciones",
    icon: <UploadCloud className="w-4 h-4" />,
    badge: "4 fuentes",
  },
];

export default function ConciliadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoAppShell
      demoTitle="Control y Conciliación de Cobros"
      demoSubtitle="Centralización de ventas con tarjetas y liquidaciones bancarias"
      badgeLabel="Demo interactiva"
      productType="conciliador"
      navItems={navItems}
      headerContextInfo={{
        label: "Período Operativo",
        value: "Octubre 2026 — Quincena 2",
      }}
      aboutInfo={{
        title: "Conciliador de Pagos, Tarjetas & Liquidaciones",
        problem:
          "Las empresas que procesan cobros con múltiples tarjetas y billeteras reciben extractos en formatos dispares (CSV, XLSX, TXT) con fechas de acreditación desfasadas. Conciliar manualmente en planillas insume cientos de horas al mes, oculta cupones no acreditados y no permite detectar retenciones impositivas erróneas o cobros de comisiones superiores a las pactadas.",
        conceptualArchitecture: [
          "Ingesta de extractos multiformato con hash SHA-256 para garantizar idempotencia y evitar duplicaciones.",
          "Esquema canónico unificado de cupones, ventas de sucursales y liquidaciones bancarias.",
          "Motor determinístico explicable: cruce 1:1 y 1:N por número de cupón, lote, terminal y monto bruto.",
          "Módulo de auditoría de tasas pactadas contra aranceles reales debitados por los adquirentes.",
          "Bandeja de revisión de discrepancias con registro auditable de decisiones tomadas por analistas.",
          "Cierres periódicos con generación de snapshot inmutable para posterior asiento contable.",
        ],
        productionStack: [
          "Next.js / TypeScript",
          "NestJS REST API Core",
          "FastAPI Data Parsing Engine",
          "PostgreSQL",
          "Redis Queues",
          "S3-compatible Object Storage",
        ],
        syntheticDataDisclaimer:
          "Esta demo interactiva utiliza un dataset 100% ficticio generado en memoria. Los números de cupón, importes, alícuotas arancelarias y nombres de archivos no corresponden a ningún negocio real ni ejecutan transacciones financieras.",
      }}
    >
      {children}
    </DemoAppShell>
  );
}
