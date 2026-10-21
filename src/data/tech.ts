/**
 * Technical capabilities as a seal of trust and reliability.
 * No percentages, no skill bars, no vanity metrics.
 */

export interface TechArea {
  area: string;
  badge: string;
  description: string;
  technologies: string[];
}

export const techCapabilities: TechArea[] = [
  {
    area: "Frontend & Interfaces",
    badge: "Velocidad & Experiencia",
    description: "Interfaces web rápidas, accesibles, fluidas en celular y optimizadas para buscadores.",
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    area: "Backend & Lógica",
    badge: "Robustez & Seguridad",
    description: "Servidores seguros, APIs estructuradas y validación estricta de datos comerciales.",
    technologies: ["NestJS", "Node.js", "Python", "APIs"],
  },
  {
    area: "Datos & Persistencia",
    badge: "Consistencia & Orden",
    description: "Bases de datos relacionales organizadas para catálogos, pedidos y clientes.",
    technologies: ["PostgreSQL", "MySQL"],
  },
  {
    area: "Infraestructura & Despliegue",
    badge: "Estabilidad 24/7",
    description: "Puesta en producción en servidores cloud/VPS con certificados SSL y monitoreo.",
    technologies: ["Docker", "Nginx"],
  },
];
