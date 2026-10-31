import { businessData } from "@/data/business";

export type SolutionStatus = "live" | "prototype";

export interface SolutionItem {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  status: SolutionStatus;
  statusLabel: string;
  badge: string;
  headline: string;
  tagline: string;
  problemSummary: string;
  solutionSummary: string;
  audience: string;
  features: {
    title: string;
    description: string;
  }[];
  techStack: string[];
  metricsOrHighlights: {
    label: string;
    value: string;
    caption: string;
  }[];
  demoUrl: string | null;
  isExternalDemo: boolean;
  secondaryUrl?: string;
  secondaryLabel?: string;
  accentColor: "blue" | "cyan" | "emerald";
}

export const solutionsData: SolutionItem[] = [
  {
    id: "custom-commerce",
    name: "Catálogo y Ventas a Medida",
    subtitle: "Custom Commerce",
    slug: "custom-commerce",
    status: "live",
    statusLabel: "Demo funcional",
    badge: "Caso en Producción",
    headline: "Catálogo interactivo con cotizador por medidas y pedidos a WhatsApp",
    tagline:
      "Una solución para negocios que necesitan mostrar productos, permitir que el cliente elija medidas o acabados y recibir solicitudes de presupuesto listas para cotizar.",
    problemSummary:
      "Los comercios y fabricantes bajo pedido pasan horas respondiendo mensajes repetitivos de precios por WhatsApp, explicando medidas y cotizando a mano sin un catálogo estructurado.",
    solutionSummary:
      "Una plataforma web propia donde el comprador navega fotos reales, configura dimensiones exactas y envía su pedido prearmado directamente a WhatsApp con un solo click.",
    audience: "Comercios, carpinterías, herrerías, fabricantes de aberturas, muebles y productos personalizados.",
    features: [
      {
        title: "Configurador dinámico por medidas",
        description: "El comprador define dimensiones y terminaciones antes de consultar, reduciendo mensajes innecesarios.",
      },
      {
        title: "Cotización directa a WhatsApp",
        description: "Genera el mensaje comercial estructurado con los detalles del pedido para cerrar la venta rápido.",
      },
      {
        title: "Panel de administración autónomo",
        description: "Gestión completa de productos, categorías, fotos y precios sin necesidad de tocar código.",
      },
      {
        title: "Despliegue independiente",
        description: "Cada comercio cuenta con su base de datos, branding y dominio propio sin pagar comisiones por venta.",
      },
    ],
    techStack: ["Next.js (App Router)", "NestJS REST API", "PostgreSQL", "Tailwind CSS", "Docker / PM2"],
    metricsOrHighlights: [
      { label: "Tiempo de cotización", value: "-75%", caption: "Ahorro en tiempo respondiendo consultas iniciales" },
      { label: "Calidad de consultas", value: "+40%", caption: "Clientes que consultan con medidas y opciones claras" },
      { label: "Autonomía del dueño", value: "100%", caption: "Actualización de precios y fotos en segundos" },
    ],
    demoUrl: businessData.urls.customCommerceDemo,
    isExternalDemo: true,
    secondaryUrl: "/proyectos/custom-commerce",
    secondaryLabel: "Leer caso de estudio completo",
    accentColor: "emerald",
  },
  {
    id: "conciliador-pagos",
    name: "Control y Conciliación de Cobros",
    subtitle: "Conciliador de Pagos B2B",
    slug: "conciliador",
    status: "prototype",
    statusLabel: "Demo interactiva",
    badge: "Solución Operativa B2B",
    headline: "Centralización y auditoría automática de ventas con tarjetas y billeteras",
    tagline:
      "Centraliza ventas con tarjetas, billeteras y liquidaciones bancarias para detectar diferencias de dinero, sobrearanceles y comisiones indebidas de forma automática.",
    problemSummary:
      "Negocios con cobro digital masivo reciben extractos bancarios y de tarjetas en planillas dispersas. Conciliar a mano insume cientos de horas y oculta cupones no acreditados o sobretasas de aranceles.",
    solutionSummary:
      "Un sistema que cruza automáticamente las ventas registradas con los extractos de liquidación, aísla diferencias de montos y verifica que las comisiones cobradas coincidan con las pactadas.",
    audience: "Cadenas de retail, distribuidoras, mayoristas y empresas con alto volumen de cobros con tarjetas.",
    features: [
      {
        title: "Lectura de extractos multiformato",
        description: "Procesamiento de archivos CSV, XLSX y extractos de Visa, Mastercard, Naranja X y Mercado Pago.",
      },
      {
        title: "Cruce automático de cupones",
        description: "Emparejamiento determinístico entre ventas de sucursales y liquidaciones bancarias efectivas.",
      },
      {
        title: "Control de aranceles y sobretasas",
        description: "Detección inmediata de diferencias entre la tasa contractual pactada y la efectivamente descontada.",
      },
      {
        title: "Bandeja de revisión de discrepancias",
        description: "Gestión visual de excepciones para resolver diferencias antes del cierre contable.",
      },
    ],
    techStack: ["Next.js / TypeScript", "NestJS Core API", "Motor de Datos en Python", "PostgreSQL", "Colas en segundo plano"],
    metricsOrHighlights: [
      { label: "Detección de diferencias", value: "< 24h", caption: "Visibilidad inmediata de liquidaciones con discrepancias" },
      { label: "Cruce automático", value: "~94%", caption: "Emparejamiento automático sin intervención manual en lotes limpios" },
      { label: "Control de aranceles", value: "Exacto", caption: "Alerta automática ante sobretasas o cobros indebidos" },
    ],
    demoUrl: "/demos/conciliador",
    isExternalDemo: false,
    secondaryUrl: "/demos/conciliador/conciliacion",
    secondaryLabel: "Explorar grilla de cupones",
    accentColor: "cyan",
  },
  {
    id: "portal-proveedores",
    name: "Portal de Autogestión para Proveedores",
    subtitle: "Portal B2B Grupo Atlas",
    slug: "proveedores",
    status: "prototype",
    statusLabel: "Demo interactiva",
    badge: "Solución Corporativa B2B",
    headline: "Canal centralizado de pagos, comprobantes fiscales y compras",
    tagline:
      "Un espacio seguro donde tus proveedores consultan órdenes de pago, retenciones fiscales, órdenes de compra y reclamos sin saturar a tu equipo por teléfono ni correo.",
    problemSummary:
      "El área de cuentas a pagar de empresas medianas o holdings recibe cientos de correos pidiendo fechas de pago, certificados de retención impositiva y comprobantes, perdiendo horas valiosas.",
    solutionSummary:
      "Un portal privado donde cada proveedor consulta el estado de sus pagos, descarga certificados de retención (Ganancias, IIBB, SUSS) y gestiona consultas operativas en un canal estructurado.",
    audience: "Empresas medianas/grandes, industrias, contratistas y empresas con múltiples plantas o unidades.",
    features: [
      {
        title: "Consulta de Órdenes de Pago & Retenciones",
        description: "Desglose claro de facturas abonadas y certificados impositivos oficiales listos para descargar.",
      },
      {
        title: "Soporte multi-unidad corporativa",
        description: "Asignación de proveedores a distintas plantas o empresas de un mismo grupo comercial.",
      },
      {
        title: "Legajo y documentación fiscal",
        description: "Control de vigencia de constancias de inscripción, exenciones impositivas y seguros laborales.",
      },
      {
        title: "Mesa de ayuda y reclamos en línea",
        description: "Canal estructurado con trazabilidad de mensajes entre proveedor y administración.",
      },
    ],
    techStack: ["Next.js / TypeScript", "Node.js REST API", "Bases relacionales", "Integración Read-Only con ERP"],
    metricsOrHighlights: [
      { label: "Consultas manuales", value: "-60%", caption: "Menos llamadas y correos pidiendo comprobantes de retención" },
      { label: "Disponibilidad documental", value: "24/7", caption: "Acceso inmediato para el área contable del proveedor" },
      { label: "Trazabilidad de pagos", value: "100%", caption: "Historial completo de emisiones, fechas y formas de pago" },
    ],
    demoUrl: "/demos/proveedores",
    isExternalDemo: false,
    secondaryUrl: "/demos/proveedores/pagos",
    secondaryLabel: "Ver órdenes de pago demo",
    accentColor: "blue",
  },
];
