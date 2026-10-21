/**
 * Projects data configuration.
 * Only verified, real commercial products are included.
 * Architecture is designed to easily support additional projects in the future
 * without placeholder cards or "Coming Soon" sections.
 */

export interface ProjectDetail {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  clientContext: {
    businessName: string;
    rubro: string;
    description: string;
  };
  problem: {
    summary: string;
    points: string[];
  };
  solution: {
    summary: string;
    points: string[];
  };
  keyFeatures: {
    title: string;
    description: string;
  }[];
  architecture: {
    summary: string;
    layers: {
      layer: string;
      tech: string;
      purpose: string;
    }[];
  };
  demoUrl: string;
  caseStudyUrl: string;
  status: "live" | "in_development";
}

export const projectsData: ProjectDetail[] = [
  {
    slug: "custom-commerce",
    name: "Custom Commerce",
    badge: "Plataforma Comercial & Catálogo a Medida",
    tagline: "Plataforma web comercial para negocios que comercializan productos estándar y fabricados a medida.",
    clientContext: {
      businessName: "Taller Roble & Veta",
      rubro: "Carpintería y fabricación artesanal de muebles a medida",
      description:
        "Taller de diseño y producción artesanal de muebles que comercializaba principalmente a través de redes sociales y WhatsApp sin un catálogo digital estructurado.",
    },
    problem: {
      summary:
        "El taller invertía horas diarias respondiendo consultas repetitivas de precios por mensaje, explicando medidas, maderas disponibles y cotizando a mano pedidos personalizados.",
      points: [
        "Pérdida de consultas por demoras en responder cotizaciones manuales.",
        "Dificultad para que el cliente visualice opciones de materiales, lustres y medidas.",
        "Falta de un canal digital profesional que transmita la calidad artesanal del taller.",
        "Dependencia constante del titular para pasar un presupuesto inicial.",
      ],
    },
    solution: {
      summary:
        "Una plataforma web propia, rápida y configurable que combina catálogo interactivo, configurador dinámico de medidas y cotizaciones directas a WhatsApp.",
      points: [
        "Catálogo digital categorizado con fichas detalladas y galería de trabajos.",
        "Campos personalizados por producto: selección interactiva de medidas (ancho, alto, profundidad), tipo de madera y acabado.",
        "Generador de presupuestos instantáneo que envía a WhatsApp el pedido pre-formateado con todos los detalles técnicos.",
        "Panel de administración autónomo para actualizar productos, precios e imágenes sin necesidad de programar.",
      ],
    },
    keyFeatures: [
      {
        title: "Configurador Dinámico a Medida",
        description: "Permite al comprador elegir dimensiones exactas, maderas y terminaciones antes de consultar.",
      },
      {
        title: "Cotización & Conversión a WhatsApp",
        description: "Genera el mensaje comercial estructurado para cerrar la venta directamente en el chat.",
      },
      {
        title: "Modos Flexibles de Precio",
        description: "Soporta precio fijo, precio base 'Desde', 'A consultar' o cotización según medidas.",
      },
      {
        title: "Panel Administrativo Autónomo",
        description: "Gestión completa de categorías, stock simbólico, productos destacados e imágenes.",
      },
      {
        title: "Diseño Mobile-First de Alta Fidelidad",
        description: "Experiencia ágil y optimizada para el 85%+ de usuarios que navegan desde teléfonos móviles.",
      },
      {
        title: "Despliegue Independiente (Single-Tenant)",
        description: "Cada negocio cuenta con su propia instancia, base de datos y branding sin compartir recursos.",
      },
    ],
    architecture: {
      summary:
        "Arquitectura desacoplada de nivel productivo: Storefront moderno en Next.js conectado mediante API REST versionada a un backend NestJS robusto con PostgreSQL.",
      layers: [
        {
          layer: "Storefront Web",
          tech: "Next.js 15 (App Router), React, Tailwind CSS",
          purpose: "Interfaz pública de máxima velocidad, SEO técnico y experiencia mobile pulida.",
        },
        {
          layer: "API Backend",
          tech: "NestJS, TypeScript, Validaciones DTO estrictas",
          purpose: "Lógica de negocio, autenticación de administración y endpoints REST /api/v1.",
        },
        {
          layer: "Persistencia",
          tech: "PostgreSQL, Prisma ORM, Migraciones automáticas",
          purpose: "Almacenamiento relacional de productos, campos dinámicos y solicitudes comerciales.",
        },
        {
          layer: "Infraestructura",
          tech: "Docker, Nginx Reverse Proxy, PM2",
          purpose: "Orquestación en VPS con SSL, compresión y healthcheck continuo.",
        },
      ],
    },
    demoUrl: "https://custom-commerce.netlify.app",
    caseStudyUrl: "/proyectos/custom-commerce",
    status: "live",
  },
];

export const featuredProject = projectsData[0];
