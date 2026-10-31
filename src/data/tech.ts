/**
 * Verified technologies and operational stack.
 * Presented as real tools used to build, integrate, and maintain solutions.
 * No percentage bars, no skill rankings, no vanity metrics.
 */

export interface TechCategory {
  category: string;
  badge: string;
  description: string;
  technologies: {
    name: string;
    description: string;
  }[];
}

export const techCapabilities: TechCategory[] = [
  {
    category: "Backend y Servidores",
    badge: "Lógica & APIs",
    description: "Desarrollo de servicios robustos, lógica de negocio, validaciones y procesamiento de datos.",
    technologies: [
      { name: "Node.js", description: "Entorno de ejecución de alta velocidad para servicios y APIs" },
      { name: "NestJS", description: "Framework modular TypeScript para arquitecturas empresariales" },
      { name: "Python", description: "Procesamiento de datos, automatizaciones y scripting avanzado" },
      { name: ".NET", description: "Desarrollo de servicios robustos y sistemas corporativos" },
      { name: "JavaScript", description: "Lógica de servidor moderna, asincrónica y escalable" },
    ],
  },
  {
    category: "Frontend e Interfaces",
    badge: "Experiencia & Rapidez",
    description: "Interfaces web ágiles, accesibles, pensadas para celulares y con foco en conversión.",
    technologies: [
      { name: "Next.js", description: "Framework React con optimización de carga y renderizado rápido" },
      { name: "React", description: "Construcción de interfaces dinámicas y componentes interactivos" },
      { name: "TypeScript", description: "Tipado estricto para código libre de errores en producción" },
      { name: "Angular", description: "Desarrollo y mantenimiento de plataformas empresariales" },
      { name: "JavaScript Vanilla", description: "Control nativo del navegador sin dependencias innecesarias" },
    ],
  },
  {
    category: "Bases de Datos y Persistencia",
    badge: "Consistencia de Datos",
    description: "Almacenamiento ordenado, consultas optimizadas e integridad de la información comercial.",
    technologies: [
      { name: "PostgreSQL", description: "Base de datos relacional de nivel bancario para sistemas críticos" },
      { name: "MySQL", description: "Almacenamiento relacional extendido para portales y catálogos" },
      { name: "MongoDB", description: "Persistencia documental flexible para payloads dinámicos" },
    ],
  },
  {
    category: "Infraestructura e Integración",
    badge: "Estabilidad 24/7",
    description: "Conectividad entre plataformas, despliegue seguro y puesta en marcha en producción.",
    technologies: [
      { name: "APIs REST", description: "Contratos de comunicación e integración entre plataformas" },
      { name: "Docker", description: "Contenedores para despliegues reproducibles y aislados" },
      { name: "Nginx", description: "Servidor web, proxy inverso y certificados de seguridad SSL" },
      { name: "Git", description: "Control de versiones profesional y colaboración de código" },
      { name: "Integraciones", description: "Conexión con ERPs, pasarelas de pago y servicios externos" },
    ],
  },
];
