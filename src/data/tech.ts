/**
 * Verified technologies and operational capabilities (Phase 16).
 * Grouped cleanly by capability instead of giant unorganized lists.
 */

export interface TechCapabilityCategory {
  category: string;
  badge: string;
  description: string;
  technologies: string[];
}

export const techCapabilities: TechCapabilityCategory[] = [
  {
    category: "Frontend",
    badge: "Interfaces & Web",
    description: "Aplicaciones web rápidas, adaptables a celulares y diseñadas para operar con agilidad.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    badge: "Lógica & APIs",
    description: "Servicios estables, APIs seguras y procesamiento confiable de la lógica de negocio.",
    technologies: ["Node.js", "NestJS", "Python", ".NET"],
  },
  {
    category: "Data",
    badge: "Persistencia & Bases de Datos",
    description: "Modelado ordenado, consistencia transaccional y consultas optimizadas para tu negocio.",
    technologies: ["PostgreSQL", "MySQL", "Supabase", "Redis"],
  },
  {
    category: "Infraestructura",
    badge: "Estabilidad & Despliegue",
    description: "Puesta en producción segura, servidores confiables y certificados SSL automáticos.",
    technologies: ["Linux", "Docker", "Nginx", "Cloudflare"],
  },
  {
    category: "IA & Automatización",
    badge: "Agilidad Operativa",
    description: "Modelos de lenguaje sobre datos propios, procesamiento de archivos y tareas desatendidas.",
    technologies: ["OpenAI API", "Anthropic", "Agentes", "Webhooks & Cron"],
  },
];
