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
    customCommerceDemo: string;
    github: string;
    linkedin: string;
  };
}

const envWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const isWhatsAppConfigured = Boolean(envWhatsapp && envWhatsapp.length > 8 && !envWhatsapp.includes("0000000"));
const cleanWhatsappNumber = envWhatsapp.replace(/\D/g, "");

const defaultWhatsAppMessage =
  "Hola Valentín, estuve viendo tu portfolio y me gustaría consultarte por el desarrollo de una solución digital para mi negocio.";

export const businessData: BusinessConfig = {
  name: "Valentín Sznitowski",
  shortName: "Valentín",
  role: "Desarrollo de Soluciones Digitales para Negocios",
  headline: "Desarrollo plataformas web y catálogos a medida para negocios que necesitan vender mejor.",
  subheadline:
    "Soluciones digitales pensadas para comercios, talleres y pymes: catálogos interactivos, cotizaciones directas a WhatsApp y paneles de gestión propios. Sin comisiones por venta ni ataduras a plantillas rígidas.",
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
    customCommerceDemo: "https://custom-commerce.netlify.app",
    github: "https://github.com/sznitowski",
    linkedin: "https://www.linkedin.com/in/valent%C3%ADn-sznitowski/",
  },
};
