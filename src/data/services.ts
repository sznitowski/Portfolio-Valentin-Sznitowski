/**
 * Commercial Services & Value Proposition.
 * Answers strictly: "¿Qué puedo contratar para mi negocio?"
 */

export interface CommercialService {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  businessValue: string;
  deliverables: string[];
}

export const servicesData: CommercialService[] = [
  {
    id: "catalogos-comercio",
    badge: "Ventas & Presupuestos",
    title: "Catálogos Digitales con Cotizador a Medida",
    tagline: "Para comercios y talleres que venden productos estándar o personalizados.",
    businessValue:
      "Mostrá tus productos con fotos reales, medidas y acabados. Tus clientes configuran lo que necesitan y te escriben con el pedido estructurado, sin perder horas respondiendo mensajes repetitivos de precios.",
    deliverables: [
      "Catálogo categorizado con fichas y fotos reales.",
      "Configurador de medidas, materiales y terminaciones.",
      "Cálculo de presupuesto estimado o transparente.",
      "Botón directo a WhatsApp con el pedido pre-armado.",
    ],
  },
  {
    id: "sistemas-gestion",
    badge: "Operación & Orden",
    title: "Paneles de Control & Sistemas de Gestión",
    tagline: "Para negocios que necesitan ordenar pedidos, clientes y stock interno.",
    businessValue:
      "Reemplazá planillas de cálculo dispersas por una herramienta web propia, segura y accesible desde el celular o la computadora, adaptada exactamente a cómo opera tu negocio.",
    deliverables: [
      "Panel para actualizar productos y precios en segundos.",
      "Bandeja centralizada de solicitudes recibidas.",
      "Seguimiento de pedidos y estados de clientes.",
      "Accesos protegidos y base de datos propia.",
    ],
  },
  {
    id: "sitios-experiencias",
    badge: "Presencia & Clientes",
    title: "Sitios Web Comerciales de Alta Velocidad",
    tagline: "Para profesionales y empresas que necesitan transmitir solidez y captar contactos.",
    businessValue:
      "Una presencia digital que genera confianza inmediata en clientes exigentes. Carga en menos de 1 segundo, diseño impecable en celular y estructura pensada para que te contacten.",
    deliverables: [
      "Diseño a medida sin plantillas prediseñadas.",
      "Velocidad extrema y optimización para buscadores (SEO).",
      "Puntos de contacto directo sin fricción.",
      "Dominio propio y certificados de seguridad SSL.",
    ],
  },
];
