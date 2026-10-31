import React from "react";
import { Metadata } from "next";
import {
  LayoutDashboard,
  Receipt,
  ShoppingBag,
  FileText,
  MessageSquare,
  Building,
} from "lucide-react";
import { DemoAppShell, DemoNavItem } from "@/components/demos/DemoAppShell";

export const metadata: Metadata = {
  title: "Portal de Autogestión para Proveedores | Valentín Sznitowski",
  description:
    "Prototipo interactivo de autoservicio de proveedores: consulta de órdenes de pago, certificados de retención, órdenes de compra y reclamos.",
};

const navItems: DemoNavItem[] = [
  {
    label: "Panel",
    href: "/demos/proveedores",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Pagos",
    href: "/demos/proveedores/pagos",
    icon: <Receipt className="w-4 h-4" />,
    badge: "4 OPs",
  },
  {
    label: "Documentación",
    href: "/demos/proveedores/documentacion",
    icon: <FileText className="w-4 h-4" />,
    badge: "1 pendiente",
  },
  {
    label: "Reclamos",
    href: "/demos/proveedores/reclamos",
    icon: <MessageSquare className="w-4 h-4" />,
    badge: "1 abierto",
  },
];

export default function ProveedoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoAppShell
      demoTitle="Portal de Autogestión para Proveedores"
      demoSubtitle="Consulta de órdenes de pago, retenciones y compras corporativas"
      badgeLabel="Demo interactiva"
      productType="proveedores"
      navItems={navItems}
      headerContextInfo={{
        label: "Holding Corporativo",
        value: "Grupo Atlas Industrial",
      }}
      aboutInfo={{
        title: "Portal B2B de Autoservicio para Proveedores",
        problem:
          "En empresas con múltiples unidades de negocio o plantas productivas, el área de cuentas a pagar se encuentra saturada respondiendo consultas reiteradas de proveedores sobre fechas estimadas de pago, envío manual de certificados de retención impositiva (Ganancias, IIBB, SUSS) y confirmación de recepción de facturas.",
        conceptualArchitecture: [
          "Autoservicio segmentado: el proveedor ingresa a su panel y consulta exclusivamente la información de sus órdenes autorizadas.",
          "Soporte multi-unidad: asignación lógica entre el proveedor y distintas empresas o plantas del grupo (Grupo Atlas).",
          "Módulo de Órdenes de Pago con desglose de comprobantes fiscales cancelados y certificados de retención listos para descargar.",
          "Control de legajo impositivo: alertas tempranas cuando una constancia o certificado de no retención está por vencer.",
          "Mesa de ayuda estructurada: canal formal de reclamos que sustituye los hilos caóticos de correos electrónicos.",
          "Integración de solo lectura con ERP: protege la base transaccional productiva sin permitir escrituras directas externas.",
        ],
        productionStack: [
          "Next.js (App Router) / TypeScript",
          "Node.js / Express o NestJS Backend API",
          "MySQL / PostgreSQL para datos propios del portal",
          "ERP Connector (acceso seguro de solo lectura)",
          "Generador de PDFs de comprobantes de retención",
          "Servidor de notificaciones SMTP",
        ],
        syntheticDataDisclaimer:
          "Esta demo interactiva presenta una identidad corporativa ficticia (Grupo Atlas Industrial y Sinergia Metalmecánica S.A.) con números de CUIT, CBU y montos 100% sintéticos para exhibir las capacidades del producto.",
      }}
    >
      {children}
    </DemoAppShell>
  );
}
