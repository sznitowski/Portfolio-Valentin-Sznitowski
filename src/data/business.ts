/**
 * Centralized business configuration for Valentín Sznitowski's Commercial Portfolio.
 * 
 * CONTACT CONFIGURATION:
 * - Email: Real verified address (vsznitowski@gmail.com).
 * - WhatsApp: Controlled via NEXT_PUBLIC_WHATSAPP_NUMBER environment variable.
 *   If not set, isConfigured is false to prevent broken or dead links,
 *   and all CTAs gracefully route to email contact until the commercial number is provided.
 */

export interface BusinessConfig {
  name: string;
  shortName: string;
  role: string;
  headline: string;
  subheadline: string;
  location: string;
  email: string;
  whatsapp: {
    number: string;
    isConfigured: boolean;
    defaultMessage: string;
    url: string;
  };
  urls: {
    portfolio: string;
    customCommerceDemo: string | null;
    github: string;
    linkedin: string;
  };
}

/**
 * Fuente canónica única para la demo pública de Custom Commerce.
 * Si no está definida en NEXT_PUBLIC_CUSTOM_COMMERCE_DEMO_URL o verificada con el negocio Taller Roble & Veta,
 * se fija en null para evitar redirecciones a sitios ajenos (como Commerce.js).
 */
export const CUSTOM_COMMERCE_DEMO_URL: string | null =
  process.env.NEXT_PUBLIC_CUSTOM_COMMERCE_DEMO_URL || null;

const envWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const isWhatsAppConfigured = Boolean(envWhatsapp && envWhatsapp.length > 8 && !envWhatsapp.includes("0000000"));
const cleanWhatsappNumber = envWhatsapp.replace(/\D/g, "");

const defaultWhatsAppMessage =
  "Hola Valentín, estuve viendo tu portfolio y me gustaría consultarte por el desarrollo de una solución digital para mi negocio.";

export const businessData: BusinessConfig = {
  name: "Valentín Sznitowski",
  shortName: "Valentín",
  role: "Desarrollo de Software & Soluciones Web para Negocios",
  headline: "Desarrollo software y soluciones web para negocios que necesitan vender, automatizar y operar mejor.",
  subheadline:
    "Sistemas web a medida, plataformas comerciales, automatización de tareas y modernización de aplicaciones existentes. Herramientas prácticas para resolver problemas operativos reales sin complicaciones técnicas.",
  location: "Argentina (Disponible para proyectos en todo el país y remoto)",
  email: "vsznitowski@gmail.com",
  whatsapp: {
    number: envWhatsapp,
    isConfigured: isWhatsAppConfigured,
    defaultMessage: defaultWhatsAppMessage,
    url: isWhatsAppConfigured
      ? `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(defaultWhatsAppMessage)}`
      : `mailto:vsznitowski@gmail.com?subject=${encodeURIComponent("Consulta sobre proyecto digital")}&body=${encodeURIComponent(defaultWhatsAppMessage)}`,
  },
  urls: {
    portfolio: "https://portfolio-valentin-sznitowski.netlify.app",
    customCommerceDemo: CUSTOM_COMMERCE_DEMO_URL,
    github: "https://github.com/sznitowski",
    linkedin: "https://www.linkedin.com/in/valent%C3%ADn-sznitowski/",
  },
};

