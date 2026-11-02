/**
 * Client-facing Services & Offerings (Phase 16).
 * Simplified into 5 clear business capabilities answering:
 * "¿Para qué puede contratarme un dueño de negocio?"
 *
 * Each service has: Title, 1 sentence, 2-3 concrete examples. No giant tech lists.
 */

export interface ServiceOffering {
  id: string;
  number: string;
  category: string;
  badge: string;
  title: string;
  commercialPitch: string;
  examples: string[];
}

export const servicesData: ServiceOffering[] = [
  {
    id: "software-a-medida",
    number: "01",
    category: "Desarrollo",
    badge: "Sistemas Propios",
    title: "Software a Medida",
    commercialPitch:
      "Desarrollo herramientas y aplicaciones diseñadas exactamente para la operativa de tu empresa, sin pagar licencias mensuales por funciones que no usás.",
    examples: [
      "Paneles de gestión y control operativo interno",
      "Cotizadores comerciales y calculadores de presupuesto",
      "Plataformas comerciales propias y sin comisiones de terceros",
    ],
  },
  {
    id: "sistemas-web-portales",
    number: "02",
    category: "Plataformas",
    badge: "Clientes & Proveedores",
    title: "Sistemas Web y Portales",
    commercialPitch:
      "Creo portales web seguros para que tus clientes o proveedores consulten información, carguen pedidos o gestionen comprobantes de forma autónoma.",
    examples: [
      "Portales de autogestión de clientes y seguimiento",
      "Catálogos digitales con toma de pedidos directa",
      "Áreas privadas para proveedores y descarga de comprobantes",
    ],
  },
  {
    id: "automatizacion-integraciones",
    number: "03",
    category: "Eficiencia",
    badge: "Cero Doble Carga",
    title: "Automatización e Integraciones",
    commercialPitch:
      "Conecto sistemas y elimino tareas manuales entre ventas, administración, reportes y operaciones.",
    examples: [
      "Conexión entre sistemas de gestión (ERPs) y plataformas web",
      "Generación y envío automático de reportes comerciales",
      "Procesamiento desatendido de planillas y archivos periódicos",
    ],
  },
  {
    id: "modernizacion-mantenimiento",
    number: "04",
    category: "Evolución",
    badge: "Sistemas Existentes",
    title: "Modernización y Mantenimiento",
    commercialPitch:
      "Mejoro, corrijo y acelero sistemas que ya tenés funcionando para que sigan siendo confiables sin tener que reconstruirlos de cero.",
    examples: [
      "Corrección de errores y lentitud en aplicaciones en uso",
      "Agregado de nuevos módulos y funciones sobre código existente",
      "Actualizaciones de seguridad y estabilidad en servidores",
    ],
  },
  {
    id: "ia-aplicada",
    number: "05",
    category: "IA Práctica",
    badge: "Datos Propios",
    title: "IA Aplicada a Procesos",
    commercialPitch:
      "Incorporo inteligencia artificial práctica sobre los datos y documentos de tu empresa para responder consultas internas o extraer información de comprobantes.",
    examples: [
      "Asistentes internos para consultar manuales o catálogos",
      "Extracción automática de datos desde PDFs y comprobantes",
      "Clasificación y derivación inteligente de consultas comerciales",
    ],
  },
];
