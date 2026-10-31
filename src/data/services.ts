/**
 * Commercial Services & Offerings.
 * Grouped into 6 business-focused areas answering:
 * "¿Qué servicios profesionales puedo contratar para mi empresa o sistema?"
 */

export interface ServiceOffering {
  id: string;
  number: string;
  category: string;
  badge: string;
  title: string;
  commercialPitch: string;
  scopeSummary: string;
  deliverables: string[];
}

export const servicesData: ServiceOffering[] = [
  {
    id: "desarrollo-software",
    number: "01",
    category: "Desarrollo",
    badge: "Sistemas Nuevos",
    title: "Desarrollo de Software Web a Medida",
    commercialPitch:
      "Construyo aplicaciones web completas diseñadas específicamente para la operativa de tu negocio: plataformas comerciales, paneles de administración internos, catálogos interactivos y portales de clientes.",
    scopeSummary: "Desde la arquitectura inicial hasta la puesta en producción en servidores seguros.",
    deliverables: [
      "Sistemas web y paneles de control internos.",
      "Catálogos comerciales con cotizadores dinámicos.",
      "Portales de autogestión para clientes o proveedores.",
      "Bases de datos estructuradas y código propio sin comisiones.",
    ],
  },
  {
    id: "mantenimiento-evolucion",
    number: "02",
    category: "Evolución",
    badge: "Sistemas Existentes",
    title: "Mantenimiento y Evolución de Aplicaciones",
    commercialPitch:
      "Si ya tenés un sistema en funcionamiento, te ayudo a mantenerlo, corregir errores acumulados, optimizar su velocidad y agregar nuevas funciones sin la necesidad de empezar de cero ni reescribir todo.",
    scopeSummary: "Evolución continua, estabilidad operativa y resolución de problemas técnicos.",
    deliverables: [
      "Diagnóstico y corrección de bugs en sistemas productivos.",
      "Refactorización limpia y mejoras de rendimiento de carga.",
      "Actualización de dependencias y versiones de software.",
      "Desarrollo e incorporación de nuevos módulos funcionales.",
    ],
  },
  {
    id: "integraciones-sistemas",
    number: "03",
    category: "Conectividad",
    badge: "Interconexión",
    title: "Integración entre Sistemas y APIs",
    commercialPitch:
      "Conecto tus plataformas para que la información fluya automáticamente. Elimino la doble carga manual de datos vinculando tus sistemas web con software de gestión (ERPs), pasarelas de pago y servicios externos.",
    scopeSummary: "Comunicación fluida, segura y en tiempo real entre distintas aplicaciones.",
    deliverables: [
      "Integración de APIs REST y webhooks con servicios de terceros.",
      "Conexión segura de solo lectura o sincronización con ERPs.",
      "Vinculación de pasarelas de cobro y facturación electrónica.",
      "Sincronización automatizada de catálogos, pedidos y clientes.",
    ],
  },
  {
    id: "automatizacion-procesos",
    number: "04",
    category: "Automatización",
    badge: "Eficiencia Operativa",
    title: "Automatización de Procesos y Tareas Repetitivas",
    commercialPitch:
      "Diseño procesos desatendidos para que tu equipo deje de perder tiempo en tareas mecánicas. Generación automática de reportes, importación periódica de archivos bancarios y alertas operativas inmediatas.",
    scopeSummary: "Ahorro de horas hombre semanales y reducción drástica de errores humanos.",
    deliverables: [
      "Tareas programadas (schedulers) y procesamiento nocturno de archivos.",
      "Generación y envío automático de reportes comerciales y contables.",
      "Cruce determinístico y conciliación automática de registros.",
      "Notificaciones automáticas ante desvíos o vencimientos.",
    ],
  },
  {
    id: "inteligencia-artificial",
    number: "05",
    category: "Inteligencia Artificial",
    badge: "IA Práctica para Negocios",
    title: "Incorporación de IA sobre Datos Propios",
    commercialPitch:
      "Implemento herramientas de inteligencia artificial aplicadas a la realidad de tu empresa: asistentes internos para responder consultas sobre documentación, análisis de pedidos y extracción de datos de comprobantes.",
    scopeSummary: "Inteligencia artificial útil, determinística y con respuestas verificables.",
    deliverables: [
      "Asistentes internos para consultas de equipo sobre manuales y stock.",
      "Extracción y estructuración automática de datos desde archivos y PDFs.",
      "Búsqueda semántica sobre información histórica de la empresa.",
      "Integración de modelos de lenguaje mediante APIs controladas.",
    ],
  },
  {
    id: "seguridad-fortalecimiento",
    number: "06",
    category: "Seguridad Web",
    badge: "Protección & Confianza",
    title: "Revisión y Fortalecimiento de Seguridad Web",
    commercialPitch:
      "Protejo tus aplicaciones y la información de tu negocio revisando el control de accesos, roles de usuarios, permisos, protección contra ataques habituales y buenas prácticas de autenticación segura.",
    scopeSummary: "Tranquilidad operativa y resguardo de datos sensibles de clientes y empresa.",
    deliverables: [
      "Revisión de esquemas de autenticación y sesiones seguras.",
      "Control granular de permisos y segregación de roles de usuario.",
      "Protección de endpoints (validación estricta, rate limiting y CORS).",
      "Actualización de librerías vulnerables y configuración segura de servidores.",
    ],
  },
];
