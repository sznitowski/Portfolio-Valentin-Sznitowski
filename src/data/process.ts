/**
 * Working methodology in 5 clear, low-risk steps.
 * Designed to convey order, transparency, and personal accompaniment.
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
    title: "Entendemos tu forma de vender",
    subtitle: "Conversación inicial sin compromiso",
    description:
      "Charlamos sobre cómo opera tu negocio hoy: qué canales usás para vender, qué consultas repetitivas te quitan tiempo y qué necesita ver tu cliente antes de comprar.",
    keyOutcome: "Claridad sobre el objetivo comercial y el dolor prioritario a resolver.",
  },
  {
    step: "02",
    title: "Definimos qué hace falta",
    subtitle: "Propuesta concisa y presupuesto cerrado",
    description:
      "Acordamos un alcance concreto: qué pantallas, qué funciones y en qué plazos. Sabés desde el primer día qué vas a recibir y cuánto va a costar, sin sorpresas.",
    keyOutcome: "Plan de trabajo claro con entregables y tiempos definidos.",
  },
  {
    step: "03",
    title: "Construyo una primera versión",
    subtitle: "Pruebas reales en una demo funcional",
    description:
      "Desarrollo la plataforma y te entrego un enlace privado para que la pruebes desde tu celular y computadora con productos y fotos reales de tu negocio.",
    keyOutcome: "Plataforma funcional navegable y probada con tu propio equipo.",
  },
  {
    step: "04",
    title: "Ajustamos y publicamos",
    subtitle: "Puesta en marcha en tu propio dominio",
    description:
      "Ajustamos los últimos detalles, conectamos tu dominio web con certificados de seguridad SSL y te muestro cómo actualizar productos o precios en minutos.",
    keyOutcome: "Web publicada en producción, rápida y lista para recibir clientes.",
  },
  {
    step: "05",
    title: "Acompañamiento y soporte",
    subtitle: "Tu herramienta crece con tu negocio",
    description:
      "La plataforma es de tu propiedad. Cuando tu negocio lo requiera, podemos incorporar nuevas funciones (pagos online, más personalización o integraciones).",
    keyOutcome: "Tranquilidad operativa y una base tecnológica propia y escalable.",
  },
];
