/**
 * Working methodology in 4 clear, predictable steps.
 * Designed to convey order, low risk, and transparent communication.
 */

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  keyOutcome: string;
}

export const processData: ProcessStep[] = [
  {
    step: "01",
    title: "Conversación inicial y diagnóstico",
    subtitle: "Relevamiento sin compromiso",
    description:
      "Charlamos sobre cómo opera tu negocio hoy: qué consultas repetitivas te quitan tiempo, qué procesos manuales querés automatizar o qué problemas tiene tu sistema actual.",
    keyOutcome: "Entendimiento compartido del problema prioritario y de la solución adecuada.",
  },
  {
    step: "02",
    title: "Propuesta con alcance y presupuesto cerrado",
    subtitle: "Claridad total desde el primer día",
    description:
      "Definimos qué pantallas y funciones se van a construir o mejorar, los plazos de entrega y el costo exacto. Sabés qué vas a recibir y cuándo, sin costos ocultos.",
    keyOutcome: "Plan de trabajo definido con etapas claras y entregables medibles.",
  },
  {
    step: "03",
    title: "Desarrollo y pruebas intermedias",
    subtitle: "Demos navegables durante el proceso",
    description:
      "Construyo la solución y te comparto accesos para que puedas probarla desde tu celular y computadora con datos y casos reales antes de la entrega final.",
    keyOutcome: "Validación temprana con tu propio equipo para asegurar que resuelve la necesidad.",
  },
  {
    step: "04",
    title: "Puesta en marcha y soporte continuo",
    subtitle: "Tu herramienta lista para operar",
    description:
      "Publicamos la solución en tu propio dominio y servidor seguro, te capacito en su uso y quedo a disposición para mantenimiento, soporte y futuras mejoras.",
    keyOutcome: "Herramienta en producción, de tu propiedad y con acompañamiento técnico continuo.",
  },
];
