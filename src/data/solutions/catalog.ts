export type CommercialClassification =
  | "PRODUCT_CANDIDATE"
  | "PORTFOLIO_SOLUTION"
  | "CUSTOM_DEVELOPMENT_LEAD"
  | "EXPERIMENT_ONLY"
  | "REJECT";

export interface SolutionStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface SolutionBenefit {
  title: string;
  description: string;
  stat?: string;
}

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface SolutionUseCase {
  target: string;
  scenario: string;
}

export interface PortfolioSolution {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  oneLineProblem: string;
  targetUserShort: string;
  statusLabel: string;
  badgeType: "validation" | "concept";
  commercialClassification: CommercialClassification[];
  radarSlug: string;
  targetUser: string;
  headline: string;
  subheadline: string;
  problem: {
    statement: string;
    painPoints: string[];
  };
  solutionConcept: {
    summary: string;
    differentiator: string;
  };
  workflow: SolutionStep[];
  mockupType: "mobile-quote" | "inspection-checklist" | "route-dispatcher" | "inventory-parts";
  benefits: SolutionBenefit[];
  features: SolutionFeature[];
  useCases: SolutionUseCase[];
  customizationOptions: string[];
  techStack: string[];
  accentColor: "sky" | "amber" | "emerald" | "indigo";
  ctaText: string;
  whatsappMessage: string;
}

export const PORTFOLIO_SOLUTIONS: PortfolioSolution[] = [
  {
    id: "tradesquote",
    slug: "tradesquote",
    name: "TradesQuote",
    tagline: "Estimador y Aprobación de Trabajos Extra en Obra",
    oneLineProblem: "Aprobá trabajos extra y cambios de obra en el acto con foto y firma del cliente desde el celular.",
    targetUserShort: "Contratistas, electricistas y remodeladores",
    statusLabel: "EN VALIDACIÓN / PERSONALIZABLE",
    badgeType: "validation",
    commercialClassification: ["PRODUCT_CANDIDATE", "PORTFOLIO_SOLUTION", "EXPERIMENT_ONLY"],
    radarSlug: "contractors-quote_to_invoice",
    targetUser: "Electricistas, plomeros, remodeladores y contratistas de oficios independientes",
    headline: "Aprobá cambios de trabajo en obra en menos de 60 segundos con foto y firma del cliente",
    subheadline:
      "Una herramienta móvil para que contratistas documenten adicionales e imprevistos en el momento exacto en que ocurren, evitando horas no cobradas y discusiones al facturar.",
    problem: {
      statement:
        "En obra, el cliente suele pedir modificaciones verbales. El contratista hace el trabajo sin constancia firmada y al momento de cobrar surgen discusiones por el precio o el alcance.",
      painPoints: [
        "Horas de trabajo y materiales regalados por falta de constancia firmada.",
        "Discusiones incómodas al emitir la factura final de la obra.",
        "Pérdida de tiempo rehaciendo presupuestos a mano de noche.",
        "Falta de fotos fechadas que justifiquen el costo adicional.",
      ],
    },
    solutionConcept: {
      summary:
        "Flujo ultrarrápido desde el teléfono móvil: el contratista agrega el nuevo ítem en 30 segundos, toma una foto del imprevisto, le hace firmar la pantalla al cliente in-situ y la orden queda sellada y vinculada a la factura final.",
      differentiator:
        "Cero fricción in-situ: concebido para usarse con guantes de trabajo o una sola mano, funciona sin internet y sin necesidad de computadoras.",
    },
    workflow: [
      {
        step: 1,
        title: "Presupuesto Inicial",
        subtitle: "Base del proyecto",
        description: "Carga rápida del alcance original pactado con el cliente en 3 toques.",
        iconName: "FileText",
      },
      {
        step: 2,
        title: "Orden de Cambio In-Situ",
        subtitle: "Menos de 30 seg",
        description: "Adición del trabajo extra con nuevo precio unitario al momento del pedido.",
        iconName: "FileCheck",
      },
      {
        step: 3,
        title: "Foto de Evidencia",
        subtitle: "Respaldo visual",
        description: "Registro fotográfico con fecha y hora del estado de la instalación.",
        iconName: "Camera",
      },
      {
        step: 4,
        title: "Firma en Pantalla",
        subtitle: "Aprobación del cliente",
        description: "El cliente aprueba con el dedo en la pantalla antes de comenzar el extra.",
        iconName: "PenTool",
      },
      {
        step: 5,
        title: "Factura Actualizada",
        subtitle: "Cobro sin disputa",
        description: "El sistema unifica presupuesto original y adicionales en una factura lista para enviar.",
        iconName: "Receipt",
      },
    ],
    mockupType: "mobile-quote",
    benefits: [
      {
        title: "Cobro documentado de extras",
        description: "Elimina los acuerdos verbales que terminan en desacuerdos al momento de facturar.",
        stat: "Respaldado",
      },
      {
        title: "Aprobación in-situ",
        description: "El cliente confirma el adicional antes de que comiences a romper, cablear o instalar.",
        stat: "In-situ",
      },
      {
        title: "Respaldo con foto y firma",
        description: "Foto y firma digital integradas que dejan constancia del estado de obra y el acuerdo.",
        stat: "Con firma",
      },
      {
        title: "Cero traspaso nocturno de notas",
        description: "Los adicionales quedan cargados directamente en la orden desde el teléfono en obra.",
        stat: "Sin papeleo",
      },
    ],
    features: [
      {
        title: "Funciona sin internet",
        description: "Permite registrar datos y fotos en el dispositivo aun en zonas o subsuelos sin señal móvil.",
      },
      {
        title: "Firma digital en pantalla",
        description: "Captura de firma manuscrita con registro de fecha y hora de la confirmación.",
      },
      {
        title: "Catálogo de precios guardado",
        description: "Precios de mano de obra y materiales frecuentes precargados para cotizar en segundos.",
      },
      {
        title: "Exportación a PDF / WhatsApp",
        description: "Generación de comprobante claro que se envía al WhatsApp del cliente con un solo clic.",
      },
    ],
    useCases: [
      {
        target: "Electricistas",
        scenario: "El cliente pide mover el tablero general y agregar tomas tras abrir la pared.",
      },
      {
        target: "Plomeros e Instaladores",
        scenario: "Detección de cañería rota oculta que no formaba parte del presupuesto original.",
      },
      {
        target: "Climatización y Montajes",
        scenario: "Metros de cañería de cobre extra o soporte de ménsula especial requeridos en altura.",
      },
    ],
    customizationOptions: [
      "Adaptación a marcas, membrete corporativo y catálogo de ítems propios.",
      "Integración directa con tu sistema de facturación o gestión existente.",
      "Sincronización multi-técnico para cuadrillas con panel central de control.",
    ],
    techStack: ["Next.js / React", "Almacenamiento en el dispositivo", "Generador de reportes PDF", "API de sincronización"],
    accentColor: "sky",
    ctaText: "Quiero una solución así",
    whatsappMessage:
      "Hola Valentín, vi el concepto de TradesQuote en tu portfolio y me interesa evaluar el desarrollo de una solución similar para presupuestar y aprobar trabajos en obra.",
  },
  {
    id: "checklist-rapido",
    slug: "checklist-rapido",
    name: "Checklist Rápido",
    tagline: "Inspecciones Técnicas Digitales & Reportes Inmediatos",
    oneLineProblem: "Digitalizá inspecciones, fotos y reportes de tus técnicos sin depender de papel ni WhatsApp.",
    targetUserShort: "Empresas de mantenimiento, service y climatización",
    statusLabel: "CONCEPTO / PERSONALIZABLE",
    badgeType: "concept",
    commercialClassification: ["PORTFOLIO_SOLUTION", "CUSTOM_DEVELOPMENT_LEAD"],
    radarSlug: "field_inspections-digitalizar_checklists",
    targetUser: "Empresas de servicio técnico, mantenimiento preventivo, climatización y montajes",
    headline: "Digitalizá tus inspecciones y service técnico en campo sin planillas de papel",
    subheadline:
      "Un sistema ágil para que tus técnicos completen revisiones guiadas en el celular, adjunten fotos, firmen la conformidad y emitan el informe al cliente en el acto.",
    problem: {
      statement:
        "Técnicos de mantenimiento completan planillas en papel que se ensucian, se pierden o requieren que alguien en la oficina pase los datos a Excel manualmente horas después de terminada la visita.",
      painPoints: [
        "Planillas de papel ilegibles y fotos dispersas en chats de WhatsApp.",
        "Demora de días en entregar el reporte de mantenimiento o inspección al cliente.",
        "Dificultad para auditar si el técnico verificó todos los puntos críticos.",
        "Falta de historial unificado por cliente o equipo intervenido.",
      ],
    },
    solutionConcept: {
      summary:
        "Checklists dinámicos y adaptados a tu operativa: campos obligatorios, fotos del estado antes/después, captura de anomalías con nivel de gravedad y firma digital del encargado del sitio.",
      differentiator:
        "No requiere pagar licencias mensuales rígidas en dólares: se adapta con exactitud a los formularios y flujos operativos de tu empresa.",
    },
    workflow: [
      {
        step: 1,
        title: "Selección de Orden",
        subtitle: "Ficha del equipo",
        description: "El técnico elige el cliente y el protocolo de inspección a realizar.",
        iconName: "FileCheck",
      },
      {
        step: 2,
        title: "Revisión Guiada",
        subtitle: "Items obligatorios",
        description: "Puntos de control organizados por subsistemas con verificación paso a paso.",
        iconName: "CheckSquare",
      },
      {
        step: 3,
        title: "Captura de Hallazgos",
        subtitle: "Fotos y gravedad",
        description: "Adjunto de fotos con anotaciones sobre piezas desgastadas o no conformidades.",
        iconName: "Camera",
      },
      {
        step: 4,
        title: "Cierre y Firma",
        subtitle: "Recepción en sitio",
        description: "Firma del supervisor o cliente en la pantalla del celular o tablet.",
        iconName: "PenTool",
      },
      {
        step: 5,
        title: "Informe PDF Inmediato",
        subtitle: "Envío automático",
        description: "Generación automática del PDF institucional listo para enviar por correo o WhatsApp.",
        iconName: "FileText",
      },
    ],
    mockupType: "inspection-checklist",
    benefits: [
      {
        title: "Entrega de reporte al instante",
        description: "El cliente recibe el informe técnico profesional antes de que el técnico suba a la camioneta.",
        stat: "En el acto",
      },
      {
        title: "Eliminación de planillas físicas",
        description: "Evita la transcripción manual de planillas de papel a planillas Excel en la oficina.",
        stat: "Digital",
      },
      {
        title: "Control de puntos críticos",
        description: "Los puntos normativos se completan con verificación obligatoria antes del cierre.",
        stat: "Auditable",
      },
      {
        title: "Historial de intervenciones",
        description: "Trazabilidad completa de qué se inspeccionó o reparó en cada equipo en visitas previas.",
        stat: "Trazabilidad",
      },
    ],
    features: [
      {
        title: "Formularios de inspección dinámicos",
        description: "Campos de texto, selectores, checklists de verificación y rangos de tolerancia.",
      },
      {
        title: "Marcador sobre fotos",
        description: "Permite dibujar flechas o círculos sobre la foto para señalar exactamente la avería.",
      },
      {
        title: "Generación de PDF con tu marca",
        description: "Membrete de tu empresa, colores corporativos, fotos incrustadas y firmas selladas.",
      },
      {
        title: "Panel Web para Supervisores",
        description: "Mesa de control centralizada para ver en tiempo real los reportes emitidos por cada cuadrilla.",
      },
    ],
    useCases: [
      {
        target: "Mantenimiento HVAC / Climatización",
        scenario: "Inspección semestral de presiones, limpieza de filtros y consumo eléctrico.",
      },
      {
        target: "Service de Ascensores y Montacargas",
        scenario: "Control normativo mensual de frenos, cables de tracción y seguridades de puerta.",
      },
      {
        target: "Instalaciones de Gas y Calderas",
        scenario: "Prueba de hermeticidad, verificación de ventilaciones y entrega de constancia técnica.",
      },
    ],
    customizationOptions: [
      "Configuración de los formularios exactos que tu empresa usa hoy en papel.",
      "Integración con base de datos de clientes, números de serie y máquinas.",
      "Envío automático por correo a múltiples destinatarios según el tipo de cliente.",
    ],
    techStack: ["Next.js / React", "Generador de reportes PDF", "Almacenamiento seguro", "Panel web administrativo"],
    accentColor: "emerald",
    ctaText: "Quiero una solución así",
    whatsappMessage:
      "Hola Valentín, estuve viendo el concepto de Checklist Rápido en tu portfolio y quiero consultar por una aplicación de inspecciones a medida para mi equipo técnico.",
  },
  {
    id: "cleanroute",
    slug: "cleanroute",
    name: "CleanRoute",
    tagline: "Organización de Visitas, Rutas y Cuadrillas Móviles",
    oneLineProblem: "Organizá recorridos de cuadrillas y verificá llegadas a clientes sin planillas desactualizadas.",
    targetUserShort: "Empresas de limpieza, facilities y servicios en domicilio",
    statusLabel: "CONCEPTO / PERSONALIZABLE",
    badgeType: "concept",
    commercialClassification: ["PORTFOLIO_SOLUTION", "CUSTOM_DEVELOPMENT_LEAD"],
    radarSlug: "cleaning-route_optimize",
    targetUser: "Empresas de limpieza, servicios a domicilio, mantenimiento y repartos urbanos",
    headline: "Optimizá el recorrido diario de tus cuadrillas y reducí horas perdidas en tráfico",
    subheadline:
      "Una herramienta operativa para centralizar clientes, ordenar las visitas del día de forma geográfica y darle a cada cuadrilla su hoja de ruta directamente en el celular.",
    problem: {
      statement:
        "Coordinar cuadrillas en planillas y chats provoca viajes en zigzag por la ciudad, perdiendo combustible, tiempo y generando demoras ante los clientes.",
      painPoints: [
        "Cuadrillas atrapadas en el tráfico por rutas mal organizadas.",
        "Gasto excesivo de combustible por traslados cruzados innecesarios.",
        "Cambios de último momento que desorganizan toda la agenda del día.",
        "Falta de visibilidad sobre si el equipo completó o no el servicio asignado.",
      ],
    },
    solutionConcept: {
      summary:
        "Tablero de despacho central que agrupa visitas por zonas y calcula el orden más eficiente de paradas. Cada cuadrilla accede a su lista en el celular, con dirección, horarios, indicaciones y confirmación de llegada.",
      differentiator:
        "Sin la complejidad excesiva ni los costos de software de logística de gran escala: pensado para empresas de 2 a 15 vehículos que necesitan orden práctico.",
    },
    workflow: [
      {
        step: 1,
        title: "Carga de Turnos",
        subtitle: "Agenda semanal",
        description: "Planificación de visitas recurrentes y servicios eventuales en el calendario.",
        iconName: "Calendar",
      },
      {
        step: 2,
        title: "Agrupación por Zona",
        subtitle: "Orden geográfico",
        description: "El sistema organiza las direcciones cercanas para minimizar los tramos de viaje.",
        iconName: "MapPin",
      },
      {
        step: 3,
        title: "Asignación a Cuadrilla",
        subtitle: "Hoja de ruta diaria",
        description: "Envío de la secuencia de paradas directo al celular del líder de equipo.",
        iconName: "Truck",
      },
      {
        step: 4,
        title: "Confirmación en Destino",
        subtitle: "Control horario",
        description: "El operario marca inicio y fin del servicio con un solo toque al llegar al lugar.",
        iconName: "Clock",
      },
      {
        step: 5,
        title: "Control de Avance",
        subtitle: "Panel en oficina",
        description: "Visibilidad en vivo del estado de cada cuadrilla (En viaje, En servicio, Finalizado).",
        iconName: "Activity",
      },
    ],
    mockupType: "route-dispatcher",
    benefits: [
      {
        title: "Ordenamiento geográfico de visitas",
        description: "Agrupa clientes por cercanía para reducir traslados innecesarios por la ciudad.",
        stat: "Geográfico",
      },
      {
        title: "Hoja de ruta clara para la cuadrilla",
        description: "El operario visualiza la secuencia de turnos, horarios e indicaciones en su teléfono.",
        stat: "En el móvil",
      },
      {
        title: "Reprogramación ágil ante cambios",
        description: "Permite reordenar el itinerario ante cancelaciones o imprevistos de último momento.",
        stat: "Flexible",
      },
      {
        title: "Seguimiento del estado de paradas",
        description: "Visibilidad operativa sobre el cumplimiento de cada visita planificada.",
        stat: "Trazabilidad",
      },
    ],
    features: [
      {
        title: "Tablero de despacho visual",
        description: "Calendario con mapa que muestra las cuadrillas y sus recorridos planificados.",
      },
      {
        title: "Interfaz móvil para operarios",
        description: "Vista ultralimpia: solo muestra el próximo cliente, teléfono, instrucciones de acceso y mapa.",
      },
      {
        title: "Integración con GPS (Google Maps / Waze)",
        description: "Un toque en la dirección abre directamente el GPS preferido del conductor.",
      },
      {
        title: "Alertas y notas de acceso",
        description: "Registro de códigos de portón, piso o precauciones con mascotas visibles en la parada.",
      },
    ],
    useCases: [
      {
        target: "Limpieza Doméstica y Comercial",
        scenario: "Asignación de cuadrillas fijas y eventuales por zonas para cubrir 4 servicios diarios por equipo.",
      },
      {
        target: "Desinfección y Control de Plagas",
        scenario: "Planificación de visitas mensuales a comercios y consorcios dentro de una misma zona.",
      },
      {
        target: "Mantenimiento de Piletas y Parques",
        scenario: "Circuitos fijos de atención semanal en countries y barrios cerrados sin traslados cruzados.",
      },
    ],
    customizationOptions: [
      "Configuración de horarios de atención y ventanas horarias de clientes específicos.",
      "Integración con WhatsApp para avisar al cliente ('Tu cuadrilla está en camino').",
      "Métricas de tiempo promedio por tipo de servicio y rendimiento por cuadrilla.",
    ],
    techStack: ["Next.js / React", "Mapas interactivos", "API de geolocalización", "Panel de despacho central"],
    accentColor: "indigo",
    ctaText: "Quiero una solución así",
    whatsappMessage:
      "Hola Valentín, vi el concepto de CleanRoute en tu portfolio y me gustaría consultar por una solución para organizar las rutas y cuadrillas de mi negocio.",
  },
  {
    id: "truckstock-lite",
    slug: "truckstock-lite",
    name: "TruckStock Lite",
    tagline: "Inventario Móvil de Repuestos para Talleres y Flotas",
    oneLineProblem: "Controlá repuestos y materiales asignados a cada vehículo para evitar faltantes en obra.",
    targetUserShort: "Instaladores, talleres y service en campo",
    statusLabel: "CONCEPTO / PERSONALIZABLE",
    badgeType: "concept",
    commercialClassification: ["PORTFOLIO_SOLUTION", "CUSTOM_DEVELOPMENT_LEAD"],
    radarSlug: "truck_inventory-gestionar_piezas",
    targetUser: "Talleres mecánicos, técnicos de service oficial, instaladores y flotas ligeras",
    headline: "Control de repuestos y herramientas en el vehículo sin perder tiempo buscando piezas",
    subheadline:
      "Una herramienta ligera para saber qué insumos tiene cada camioneta, alertar cuando un stock crítico se agota y registrar consumos en 1 segundo.",
    problem: {
      statement:
        "Técnicos y mecánicos salen a obra sin saber qué piezas tienen arriba del vehículo. Cuando falta una pieza clave, deben frenar el trabajo y viajar a comprarla, perdiendo horas productivas.",
      painPoints: [
        "Viajes dobles y paradas improductivas en casas de repuestos.",
        "Piezas caras perdidas o duplicadas en el fondo de la camioneta.",
        "Falta de descuento automático de repuestos consumidos en los trabajos.",
        "Sistemas de stock tradicionales que nadie usa por ser complicados y lentos.",
      ],
    },
    solutionConcept: {
      summary:
        "Gestión de inventario pensada para el vehículo: catálogo de piezas frecuentes, lectura rápida de código de barras o QR con la cámara del celular, marcas de stock mínimo y lista de reposición.",
      differentiator:
        "Sin la sobrecarga de un software contable pesado: interfaz minimalista de alta velocidad pensada para registrar entradas y salidas con la punta del dedo.",
    },
    workflow: [
      {
        step: 1,
        title: "Carga del Vehículo",
        subtitle: "Stock inicial",
        description: "Revisión rápida del stock asignado a la camioneta o puesto técnico.",
        iconName: "Truck",
      },
      {
        step: 2,
        title: "Búsqueda o Escaneo",
        subtitle: "Cámara del celular",
        description: "Identificación de la pieza por código, número de parte o nombre corto.",
        iconName: "Scan",
      },
      {
        step: 3,
        title: "Registro de Consumo",
        subtitle: "1 toque",
        description: "Descuento del ítem utilizado y vinculación opcional al trabajo o cliente.",
        iconName: "MinusCircle",
      },
      {
        step: 4,
        title: "Alerta de Stock Bajo",
        subtitle: "Mínimos críticos",
        description: "El sistema marca en rojo las piezas que deben reponerse antes de la próxima salida.",
        iconName: "AlertTriangle",
      },
      {
        step: 5,
        title: "Pedido de Reposición",
        subtitle: "Hacia el depósito",
        description: "Generación automática de la lista de piezas faltantes para el pañol central.",
        iconName: "CheckCircle",
      },
    ],
    mockupType: "inventory-parts",
    benefits: [
      {
        title: "Visibilidad de insumos críticos",
        description: "Saber qué repuestos están en el vehículo antes de salir a atender un servicio.",
        stat: "Control",
      },
      {
        title: "Trazabilidad de herramientas y piezas",
        description: "Identificación de qué unidad o técnico tiene asignada cada herramienta o repuesto.",
        stat: "Asignado",
      },
      {
        title: "Lista de reposición para el pañol",
        description: "Generación de la lista de piezas faltantes para reponer stock al regresar al taller.",
        stat: "Reposición",
      },
      {
        title: "Registro rápido in-situ",
        description: "Descuento de piezas con un solo toque desde el móvil sin burocracia contable.",
        stat: "Ágil",
      },
    ],
    features: [
      {
        title: "Lector QR y código de barras con la cámara",
        description: "Usa la cámara del teléfono para escanear repuestos sin dispositivos adicionales.",
      },
      {
        title: "Niveles de stock mínimo y óptimo",
        description: "Indicadores visuales tipo semáforo (Verde / Amarillo / Rojo) para cada ítem del vehículo.",
      },
      {
        title: "Gestión multi-camioneta",
        description: "Permite ver desde la oficina el stock de todas las unidades de la flota en una sola pantalla.",
      },
      {
        title: "Historial de consumos",
        description: "Registro de quién usó cada pieza, en qué fecha y para qué trabajo específico.",
      },
    ],
    useCases: [
      {
        target: "Mecánicos Móviles & Auxilio",
        scenario: "Control de filtros, correas, aceites y bujías en la camioneta de auxilio en calle.",
      },
      {
        target: "Técnicos de Climatización y Calderas",
        scenario: "Válvulas, termocuplas y capacitores con control de stock crítico antes de ir a obra.",
      },
      {
        target: "Flotas de Mantenimiento Edilicio",
        scenario: "Control de luminarias, balastos y llaves térmicas repartidas en las camionetas.",
      },
    ],
    customizationOptions: [
      "Importación masiva de tu lista actual de repuestos desde Excel o CSV.",
      "Asociación de costos unitarios para calcular el costo de materiales por trabajo.",
      "Integración con proveedores para generar órdenes de compra directas.",
    ],
    techStack: ["Next.js / React", "Lector de código con cámara", "Base de datos sincronizada", "Panel de control central"],
    accentColor: "amber",
    ctaText: "Quiero una solución así",
    whatsappMessage:
      "Hola Valentín, vi el concepto de TruckStock Lite en tu portfolio y quiero consultar por una aplicación para controlar el stock de piezas y repuestos de mis vehículos.",
  },
];

export function getSolutionBySlug(slug: string): PortfolioSolution | undefined {
  return PORTFOLIO_SOLUTIONS.find((s) => s.slug === slug);
}
