export interface BusinessUnit {
  id: string;
  name: string;
  code: string;
  cuit: string;
  location: string;
}

export interface SupplierProfile {
  companyName: string;
  tradeName: string;
  cuit: string;
  fiscalAddress: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  bankName: string;
  accountType: string;
  cbu: string;
  alias: string;
  assignedUnits: string[];
}

export interface PaymentOrderWithholding {
  concept: string;
  regime: string;
  ratePercent: number;
  taxableBase: number;
  amount: number;
  certificateNumber: string;
}

export interface PaymentOrderInvoice {
  invoiceNumber: string;
  date: string;
  grossAmount: number;
  netAmount: number;
  description: string;
}

export interface PaymentOrder {
  id: string;
  opNumber: string;
  businessUnitId: string;
  businessUnitName: string;
  issueDate: string;
  paymentDate: string;
  grossAmount: number;
  totalWithholdings: number;
  netAmount: number;
  status: "paid" | "scheduled" | "issued";
  statusLabel: string;
  paymentMethod: string;
  invoices: PaymentOrderInvoice[];
  withholdings: PaymentOrderWithholding[];
  receiptDocumentName: string;
}

export interface PurchaseOrder {
  id: string;
  ocNumber: string;
  businessUnitId: string;
  businessUnitName: string;
  issueDate: string;
  deliveryDate: string;
  totalAmount: number;
  buyerName: string;
  status: "completed" | "in_progress" | "pending";
  statusLabel: string;
  itemsCount: number;
  mainCategory: string;
}

export interface TaxDocument {
  id: string;
  title: string;
  documentType: string;
  issuedAt: string;
  expiresAt: string;
  status: "valid" | "expiring_soon" | "pending_update";
  statusLabel: string;
  filename: string;
  verifiedBy: string;
}

export interface ClaimMessage {
  id: string;
  author: string;
  role: "supplier" | "support_agent";
  timestamp: string;
  content: string;
}

export interface SupplierClaim {
  id: string;
  claimNumber: string;
  businessUnitName: string;
  subject: string;
  category: "payment_inquiry" | "withholding_difference" | "bank_update" | "purchase_order";
  status: "open" | "in_review" | "resolved";
  statusLabel: string;
  createdAt: string;
  lastUpdate: string;
  messages: ClaimMessage[];
}

export const supplierUnitsData: BusinessUnit[] = [
  {
    id: "unit-obras",
    name: "Atlas Construcción & Obras Civiles",
    code: "ATLAS-OBR",
    cuit: "30-65498123-8",
    location: "Planta Industrial Zárate, Bs. As.",
  },
  {
    id: "unit-metal",
    name: "Atlas Metalmecánica & Estructuras",
    code: "ATLAS-MET",
    cuit: "30-65498123-8",
    location: "Parque Industrial Pilar, Bs. As.",
  },
  {
    id: "unit-log",
    name: "Atlas Logística & Distribución",
    code: "ATLAS-LOG",
    cuit: "30-65498123-8",
    location: "Centro de Cargas Campana, Bs. As.",
  },
];

export const supplierProfileData: SupplierProfile = {
  companyName: "Sinergia Metalmecánica S.A.",
  tradeName: "Sinergia Industrial",
  cuit: "30-71999888-4",
  fiscalAddress: "Av. de los Talleres 4820, Córdoba Capital",
  contactName: "Ing. Roberto Calvo",
  contactEmail: "administracion@sinergiametal.com.ar",
  contactPhone: "+54 (351) 489-2200",
  bankName: "Banco Galicia",
  accountType: "Cuenta Corriente Especial en Pesos",
  cbu: "0070999920000014820199",
  alias: "SINERGIA.PAGOS.GAL",
  assignedUnits: ["ATLAS-OBR", "ATLAS-MET"],
};

export const supplierKpis = {
  recentPaymentOrdersCount: 6,
  monthlyPaidAmount: 14850000,
  scheduledAmount: 4320000,
  pendingDocumentsCount: 1,
  openClaimsCount: 1,
  nextPaymentDate: "30/10/2026",
  holdingName: "Grupo Atlas Industrial",
};

export const paymentOrdersData: PaymentOrder[] = [
  {
    id: "op-8421",
    opNumber: "OP-0001-00008421",
    businessUnitId: "unit-metal",
    businessUnitName: "Atlas Metalmecánica",
    issueDate: "27/10/2026",
    paymentDate: "28/10/2026",
    grossAmount: 4850000,
    totalWithholdings: 436500,
    netAmount: 4413500,
    status: "paid",
    statusLabel: "Acreditado",
    paymentMethod: "Transferencia Interbancaria Inmediata",
    invoices: [
      {
        invoiceNumber: "FAC-A-0004-00012840",
        date: "05/10/2026",
        grossAmount: 2850000,
        netAmount: 2593500,
        description: "Perfiles UPN 160 laminados y corte a medida según plano M-104",
      },
      {
        invoiceNumber: "FAC-A-0004-00012855",
        date: "12/10/2026",
        grossAmount: 2000000,
        netAmount: 1820000,
        description: "Servicio de granallado y pintura epoxi sobre vigas reticuladas",
      },
    ],
    withholdings: [
      {
        concept: "Impuesto a las Ganancias",
        regime: "RG 830 - Locaciones de Obra",
        ratePercent: 2.0,
        taxableBase: 4850000,
        amount: 97000,
        certificateNumber: "RET-GAN-2026-004192",
      },
      {
        concept: "Ingresos Brutos (Convenio Multilateral)",
        regime: "Pcia. de Buenos Aires - Alícuota General",
        ratePercent: 3.5,
        taxableBase: 4850000,
        amount: 169750,
        certificateNumber: "RET-IIBB-2026-009184",
      },
      {
        concept: "Seguridad Social (SUSS)",
        regime: "RG 1784 - Servicios y Obras",
        ratePercent: 3.5,
        taxableBase: 4850000,
        amount: 169750,
        certificateNumber: "RET-SUSS-2026-001830",
      },
    ],
    receiptDocumentName: "COMPROBANTE_OP_8421_GRUPO_ATLAS.pdf",
  },
  {
    id: "op-8410",
    opNumber: "OP-0001-00008410",
    businessUnitId: "unit-obras",
    businessUnitName: "Atlas Construcción",
    issueDate: "25/10/2026",
    paymentDate: "30/10/2026",
    grossAmount: 4320000,
    totalWithholdings: 388800,
    netAmount: 3931200,
    status: "scheduled",
    statusLabel: "Programada para pago",
    paymentMethod: "Echeq al día / Transferencia",
    invoices: [
      {
        invoiceNumber: "FAC-A-0004-00012810",
        date: "01/10/2026",
        grossAmount: 4320000,
        netAmount: 3931200,
        description: "Carpintería metálica pesada para nave 3 y cerramientos perimetrales",
      },
    ],
    withholdings: [
      {
        concept: "Impuesto a las Ganancias",
        regime: "RG 830 - Bienes y Suministros",
        ratePercent: 2.0,
        taxableBase: 4320000,
        amount: 86400,
        certificateNumber: "RET-GAN-2026-004110",
      },
      {
        concept: "Ingresos Brutos (Convenio Multilateral)",
        regime: "Pcia. de Buenos Aires",
        ratePercent: 3.5,
        taxableBase: 4320000,
        amount: 151200,
        certificateNumber: "RET-IIBB-2026-009088",
      },
      {
        concept: "Seguridad Social (SUSS)",
        regime: "RG 1784",
        ratePercent: 3.5,
        taxableBase: 4320000,
        amount: 151200,
        certificateNumber: "RET-SUSS-2026-001799",
      },
    ],
    receiptDocumentName: "ORDEN_DE_PAGO_8410_PROGRAMADA.pdf",
  },
  {
    id: "op-8395",
    opNumber: "OP-0001-00008395",
    businessUnitId: "unit-metal",
    businessUnitName: "Atlas Metalmecánica",
    issueDate: "15/10/2026",
    paymentDate: "16/10/2026",
    grossAmount: 5680000,
    totalWithholdings: 511200,
    netAmount: 5168800,
    status: "paid",
    statusLabel: "Acreditado",
    paymentMethod: "Transferencia Bancaria Directa",
    invoices: [
      {
        invoiceNumber: "FAC-A-0004-00012780",
        date: "20/09/2026",
        grossAmount: 5680000,
        netAmount: 5168800,
        description: "Mecanizado de piezas de alta precisión y bulonería de alta resistencia",
      },
    ],
    withholdings: [
      {
        concept: "Impuesto a las Ganancias",
        regime: "RG 830",
        ratePercent: 2.0,
        taxableBase: 5680000,
        amount: 113600,
        certificateNumber: "RET-GAN-2026-003890",
      },
      {
        concept: "Ingresos Brutos",
        regime: "Convenio Multilateral",
        ratePercent: 3.5,
        taxableBase: 5680000,
        amount: 198800,
        certificateNumber: "RET-IIBB-2026-008740",
      },
      {
        concept: "Seguridad Social (SUSS)",
        regime: "RG 1784",
        ratePercent: 3.5,
        taxableBase: 5680000,
        amount: 198800,
        certificateNumber: "RET-SUSS-2026-001640",
      },
    ],
    receiptDocumentName: "COMPROBANTE_OP_8395_PAGADO.pdf",
  },
  {
    id: "op-8350",
    opNumber: "OP-0001-00008350",
    businessUnitId: "unit-obras",
    businessUnitName: "Atlas Construcción",
    issueDate: "02/10/2026",
    paymentDate: "04/10/2026",
    grossAmount: 4320000,
    totalWithholdings: 388800,
    netAmount: 3931200,
    status: "paid",
    statusLabel: "Acreditado",
    paymentMethod: "Transferencia Interbancaria",
    invoices: [
      {
        invoiceNumber: "FAC-A-0004-00012710",
        date: "10/09/2026",
        grossAmount: 4320000,
        netAmount: 3931200,
        description: "Chapas plegadas y anclajes estructurales de hormigón",
      },
    ],
    withholdings: [
      {
        concept: "Retenciones impositivas globales",
        regime: "Régimen General Fiscal",
        ratePercent: 9.0,
        taxableBase: 4320000,
        amount: 388800,
        certificateNumber: "RET-CERT-2026-003120",
      },
    ],
    receiptDocumentName: "COMPROBANTE_OP_8350.pdf",
  },
];

export const purchaseOrdersData: PurchaseOrder[] = [
  {
    id: "oc-4910",
    ocNumber: "OC-2026-004910",
    businessUnitId: "unit-metal",
    businessUnitName: "Atlas Metalmecánica",
    issueDate: "20/10/2026",
    deliveryDate: "10/11/2026",
    totalAmount: 6200000,
    buyerName: "Lic. Andrea Frías (Compras Industriales)",
    status: "in_progress",
    statusLabel: "En fabricación / curso",
    itemsCount: 14,
    mainCategory: "Estructuras de acero normalizado",
  },
  {
    id: "oc-4880",
    ocNumber: "OC-2026-004880",
    businessUnitId: "unit-obras",
    businessUnitName: "Atlas Construcción",
    issueDate: "10/10/2026",
    deliveryDate: "28/10/2026",
    totalAmount: 4850000,
    buyerName: "Ing. Gonzalo Varela (Obras Civiles)",
    status: "completed",
    statusLabel: "Entregada & Aprobada",
    itemsCount: 8,
    mainCategory: "Vigas reticuladas y perfiles",
  },
  {
    id: "oc-4845",
    ocNumber: "OC-2026-004845",
    businessUnitId: "unit-metal",
    businessUnitName: "Atlas Metalmecánica",
    issueDate: "28/09/2026",
    deliveryDate: "15/10/2026",
    totalAmount: 5680000,
    buyerName: "Lic. Andrea Frías",
    status: "completed",
    statusLabel: "Entregada & Aprobada",
    itemsCount: 22,
    mainCategory: "Bulonería especial y anclajes",
  },
  {
    id: "oc-4925",
    ocNumber: "OC-2026-004925",
    businessUnitId: "unit-obras",
    businessUnitName: "Atlas Construcción",
    issueDate: "26/10/2026",
    deliveryDate: "20/11/2026",
    totalAmount: 3450000,
    buyerName: "Ing. Gonzalo Varela",
    status: "pending",
    statusLabel: "Pendiente de confirmación",
    itemsCount: 6,
    mainCategory: "Revestimientos metálicos ignífugos",
  },
];

export const taxDocumentsData: TaxDocument[] = [
  {
    id: "doc-01",
    title: "Constancia de Inscripción AFIP / ARCA",
    documentType: "Constancia Impositiva General",
    issuedAt: "01/10/2026",
    expiresAt: "30/11/2026",
    status: "valid",
    statusLabel: "Vigente",
    filename: "CONSTANCIA_AFIP_SINERGIA_2026.pdf",
    verifiedBy: "Cuentas a Pagar Grupo Atlas",
  },
  {
    id: "doc-02",
    title: "Certificado de No Retención de Ganancias",
    documentType: "Exención / Reducción Impositiva",
    issuedAt: "01/05/2026",
    expiresAt: "31/10/2026",
    status: "expiring_soon",
    statusLabel: "Vence en 2 días",
    filename: "CERT_NO_RET_GANANCIAS_AFIP.pdf",
    verifiedBy: "Dpto. Impuestos Corporativo",
  },
  {
    id: "doc-03",
    title: "Constancia de CBU Bancario Certificada",
    documentType: "Datos de Pago y Cobranzas",
    issuedAt: "15/01/2026",
    expiresAt: "Sin vencimiento",
    status: "valid",
    statusLabel: "Vigente & Validado",
    filename: "CERTIFICADO_CBU_BANCO_GALICIA.pdf",
    verifiedBy: "Tesorería Central",
  },
  {
    id: "doc-04",
    title: "Seguro de Accidentes de Trabajo (Cláusula de No Repetición)",
    documentType: "Seguridad e Higiene Industrial",
    issuedAt: "01/10/2026",
    expiresAt: "31/10/2026",
    status: "expiring_soon",
    statusLabel: "Vence a fin de mes",
    filename: "POLIZA_ART_CLAUSULA_ATLAS.pdf",
    verifiedBy: "Seguridad y Medio Ambiente",
  },
  {
    id: "doc-05",
    title: "Padrón Provincial IIBB (Convenio Multilateral)",
    documentType: "Constancia Fiscal Provincial",
    issuedAt: "01/09/2026",
    expiresAt: "31/12/2026",
    status: "valid",
    statusLabel: "Vigente",
    filename: "PADRON_CM05_2026.pdf",
    verifiedBy: "Dpto. Impuestos Corporativo",
  },
];

export const supplierClaimsData: SupplierClaim[] = [
  {
    id: "claim-01",
    claimNumber: "REC-2026-00481",
    businessUnitName: "Atlas Metalmecánica",
    subject: "Consulta sobre fecha de acreditación de OP-8410",
    category: "payment_inquiry",
    status: "open",
    statusLabel: "En gestión por Tesorería",
    createdAt: "28/10/2026 09:30",
    lastUpdate: "28/10/2026 11:15",
    messages: [
      {
        id: "msg-01",
        author: "Ing. Roberto Calvo (Sinergia Metal)",
        role: "supplier",
        timestamp: "28/10/2026 09:30",
        content:
          "Estimados, vemos la OP-8410 en estado programado para el 30/10. ¿Podrían confirmarnos si la acreditación se realizará mediante transferencia inmediata o emisión de Echeq?",
      },
      {
        id: "msg-02",
        author: "Mariana Rivas (Cuentas a Pagar - Grupo Atlas)",
        role: "support_agent",
        timestamp: "28/10/2026 11:15",
        content:
          "Hola Roberto. El lote de pagos del viernes 30/10 saldrá por transferencia bancaria directa a su CBU de Banco Galicia. En cuanto el banco procese la orden recibirán el aviso automático con el comprobante adjunto.",
      },
    ],
  },
  {
    id: "claim-02",
    claimNumber: "REC-2026-00465",
    businessUnitName: "Atlas Construcción",
    subject: "Adjunto nuevo Certificado de No Retención Ganancias",
    category: "withholding_difference",
    status: "resolved",
    statusLabel: "Resuelto & Actualizado",
    createdAt: "22/10/2026 14:00",
    lastUpdate: "23/10/2026 16:30",
    messages: [
      {
        id: "msg-03",
        author: "Ing. Roberto Calvo (Sinergia Metal)",
        role: "supplier",
        timestamp: "22/10/2026 14:00",
        content:
          "Buenas tardes, les comparto la renovación del certificado de no retención emitido por AFIP con vigencia hasta abril 2027 para evitar deducciones en las próximas órdenes de pago.",
      },
      {
        id: "msg-04",
        author: "Damián Ponce (Dpto. Impuestos - Grupo Atlas)",
        role: "support_agent",
        timestamp: "23/10/2026 16:30",
        content:
          "Certificado verificado y cargado en el legajo del proveedor. Se aplicará a partir de las liquidaciones de noviembre. Damos el ticket por cerrado.",
      },
    ],
  },
];
