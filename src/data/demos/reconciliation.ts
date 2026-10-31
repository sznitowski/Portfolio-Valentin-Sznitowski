export interface ImportBatch {
  id: string;
  provider: string;
  filename: string;
  format: "CSV" | "XLSX" | "TXT";
  uploadedAt: string;
  recordsCount: number;
  totalGrossAmount: number;
  status: "processed" | "warning" | "pending";
  statusLabel: string;
  sha256: string;
  summaryNote: string;
}

export interface ReconciliationTransaction {
  id: string;
  provider: string;
  date: string;
  settlementDate: string;
  couponNumber: string;
  terminalNumber: string;
  erpInvoiceNumber: string;
  erpGrossAmount: number;
  settledGrossAmount: number;
  feeAmount: number;
  expectedFeeRate: number;
  appliedFeeRate: number;
  taxWithholdings: number;
  netSettledAmount: number;
  difference: number;
  status: "matched" | "difference_fee" | "difference_amount" | "missing_erp" | "pending_review";
  statusLabel: string;
  explanation: string;
  settlementBatchId: string;
}

export interface RateAuditItem {
  id: string;
  provider: string;
  cardType: string;
  plan: string;
  expectedRate: number;
  appliedRate: number;
  rateDifference: number;
  periodVolume: number;
  monetaryImpact: number;
  status: "compliant" | "overcharge";
  statusLabel: string;
  note: string;
}

export interface AccountingPeriodClosure {
  id: string;
  periodName: string;
  dateRange: string;
  totalOperations: number;
  matchedCount: number;
  exceptionsCount: number;
  totalAmountProcessed: number;
  status: "closed" | "reviewing" | "open";
  statusLabel: string;
  responsible: string;
  closedAt: string | null;
  snapshotHash: string;
}

export interface AuditTimelineEvent {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  category: "import" | "matching" | "exception" | "rate_audit" | "closure";
  details: string;
}

export const reconciliationKpis = {
  totalProcessedAmount: 18450200,
  settlementsProcessedCount: 1420,
  autoMatchedRate: 94.2,
  pendingReviewCount: 38,
  totalDetectedDifferences: 128450,
  pendingSettlementAmount: 1180000,
  lastBatchUploaded: "Hoy, 10:45 hs",
};

export const importBatchesData: ImportBatch[] = [
  {
    id: "batch-01",
    provider: "Visa / Prisma",
    filename: "LIQ_VISA_20261028_L481.csv",
    format: "CSV",
    uploadedAt: "28/10/2026 18:30",
    recordsCount: 482,
    totalGrossAmount: 6420800,
    status: "processed",
    statusLabel: "Procesado sin errores",
    sha256: "e7c41bf2890ad67f...b3a1",
    summaryNote: "482 cupones leídos, 461 emparejados automáticamente con ventas ERP.",
  },
  {
    id: "batch-02",
    provider: "Mastercard",
    filename: "MC_SETTLEMENT_OCT26_BATCH3.xlsx",
    format: "XLSX",
    uploadedAt: "28/10/2026 14:15",
    recordsCount: 315,
    totalGrossAmount: 4190500,
    status: "processed",
    statusLabel: "Procesado sin errores",
    sha256: "8a1e2049d5bf1c90...72c8",
    summaryNote: "315 registros procesados con normalidad determinística.",
  },
  {
    id: "batch-03",
    provider: "Naranja X",
    filename: "EXTRACTO_NARANJA_20261027.txt",
    format: "TXT",
    uploadedAt: "27/10/2026 21:05",
    recordsCount: 290,
    totalGrossAmount: 3840100,
    status: "warning",
    statusLabel: "Con advertencias",
    sha256: "4b92c4819d0e74f1...55da",
    summaryNote: "12 cupones presentan discrepancia en arancel pactado (Plan Z).",
  },
  {
    id: "batch-04",
    provider: "Mercado Pago Point & QR",
    filename: "MP_REPORT_SETTLEMENT_20261027.csv",
    format: "CSV",
    uploadedAt: "27/10/2026 11:20",
    recordsCount: 218,
    totalGrossAmount: 2650800,
    status: "processed",
    statusLabel: "Procesado sin errores",
    sha256: "c1984fb0e1239aa8...99df",
    summaryNote: "Conciliación determinística contra ventas de sucursales físicas.",
  },
  {
    id: "batch-05",
    provider: "Cabal Mayorista",
    filename: "CABAL_BATCH_LIQ_1026.csv",
    format: "CSV",
    uploadedAt: "26/10/2026 09:00",
    recordsCount: 115,
    totalGrossAmount: 1348000,
    status: "pending",
    statusLabel: "Pendiente de revisión",
    sha256: "3d55ba70c84112e0...81cb",
    summaryNote: "Pendiente validación de certificados de retención provincial.",
  },
];

export const reconciliationTransactionsData: ReconciliationTransaction[] = [
  {
    id: "tx-101",
    provider: "Visa Crédito",
    date: "26/10/2026",
    settlementDate: "28/10/2026",
    couponNumber: "48201",
    terminalNumber: "TERM-04",
    erpInvoiceNumber: "FAC-B-0002-00041829",
    erpGrossAmount: 125000,
    settledGrossAmount: 125000,
    feeAmount: 2250,
    expectedFeeRate: 1.8,
    appliedFeeRate: 1.8,
    taxWithholdings: 3125,
    netSettledAmount: 119625,
    difference: 0,
    status: "matched",
    statusLabel: "Conciliado",
    explanation: "Coincidencia exacta 1:1 por cupón, terminal y monto bruto. Tasa arancelaria correcta.",
    settlementBatchId: "batch-01",
  },
  {
    id: "tx-102",
    provider: "Naranja X",
    date: "25/10/2026",
    settlementDate: "27/10/2026",
    couponNumber: "91844",
    terminalNumber: "TERM-01",
    erpInvoiceNumber: "FAC-A-0001-00019283",
    erpGrossAmount: 240000,
    settledGrossAmount: 240000,
    feeAmount: 7200,
    expectedFeeRate: 2.1,
    appliedFeeRate: 3.0,
    taxWithholdings: 6000,
    netSettledAmount: 226800,
    difference: -2160,
    status: "difference_fee",
    statusLabel: "Diferencia de arancel",
    explanation: "Cupón validado. Tasa aplicada (3.00%) superior a la pactada para Plan Z (2.10%). Desvío detectado.",
    settlementBatchId: "batch-03",
  },
  {
    id: "tx-103",
    provider: "Mastercard Débito",
    date: "26/10/2026",
    settlementDate: "28/10/2026",
    couponNumber: "33910",
    terminalNumber: "TERM-03",
    erpInvoiceNumber: "FAC-B-0002-00041855",
    erpGrossAmount: 85400,
    settledGrossAmount: 85400,
    feeAmount: 683.2,
    expectedFeeRate: 0.8,
    appliedFeeRate: 0.8,
    taxWithholdings: 1708,
    netSettledAmount: 83008.8,
    difference: 0,
    status: "matched",
    statusLabel: "Conciliado",
    explanation: "Matching automático determinístico 1:1 verificado.",
    settlementBatchId: "batch-02",
  },
  {
    id: "tx-104",
    provider: "Mercado Pago Point",
    date: "26/10/2026",
    settlementDate: "27/10/2026",
    couponNumber: "77219",
    terminalNumber: "POINT-02",
    erpInvoiceNumber: "No hallado en ERP",
    erpGrossAmount: 0,
    settledGrossAmount: 98500,
    feeAmount: 2955,
    expectedFeeRate: 3.0,
    appliedFeeRate: 3.0,
    taxWithholdings: 2462.5,
    netSettledAmount: 93082.5,
    difference: 98500,
    status: "missing_erp",
    statusLabel: "Cupón ausente en ERP",
    explanation: "Cobro liquidado por procesador sin registro de venta fiscal correspondiente en ERP de sucursal.",
    settlementBatchId: "batch-04",
  },
  {
    id: "tx-105",
    provider: "Visa Crédito",
    date: "25/10/2026",
    settlementDate: "28/10/2026",
    couponNumber: "48150",
    terminalNumber: "TERM-02",
    erpInvoiceNumber: "FAC-A-0001-00019250",
    erpGrossAmount: 310000,
    settledGrossAmount: 295000,
    feeAmount: 5310,
    expectedFeeRate: 1.8,
    appliedFeeRate: 1.8,
    taxWithholdings: 7375,
    netSettledAmount: 282315,
    difference: -15000,
    status: "difference_amount",
    statusLabel: "Monto divergente",
    explanation: "Cupón coincide pero monto bruto liquidado ($295.000) difiere de la factura ERP ($310.000). Posible nota de crédito parcial.",
    settlementBatchId: "batch-01",
  },
  {
    id: "tx-106",
    provider: "Cabal",
    date: "24/10/2026",
    settlementDate: "26/10/2026",
    couponNumber: "10592",
    terminalNumber: "TERM-04",
    erpInvoiceNumber: "FAC-B-0002-00041790",
    erpGrossAmount: 64200,
    settledGrossAmount: 64200,
    feeAmount: 1155.6,
    expectedFeeRate: 1.8,
    appliedFeeRate: 1.8,
    taxWithholdings: 1605,
    netSettledAmount: 61439.4,
    difference: 0,
    status: "matched",
    statusLabel: "Conciliado",
    explanation: "Conciliado determinísticamente con retención provincial debidamente atribuida.",
    settlementBatchId: "batch-05",
  },
  {
    id: "tx-107",
    provider: "Visa Débito",
    date: "26/10/2026",
    settlementDate: "28/10/2026",
    couponNumber: "48230",
    terminalNumber: "TERM-01",
    erpInvoiceNumber: "FAC-B-0002-00041840",
    erpGrossAmount: 42000,
    settledGrossAmount: 42000,
    feeAmount: 336,
    expectedFeeRate: 0.8,
    appliedFeeRate: 0.8,
    taxWithholdings: 840,
    netSettledAmount: 40824,
    difference: 0,
    status: "matched",
    statusLabel: "Conciliado",
    explanation: "Conciliación directa sin observaciones.",
    settlementBatchId: "batch-01",
  },
  {
    id: "tx-108",
    provider: "Mastercard Crédito",
    date: "25/10/2026",
    settlementDate: "28/10/2026",
    couponNumber: "33880",
    terminalNumber: "TERM-02",
    erpInvoiceNumber: "FAC-A-0001-00019270",
    erpGrossAmount: 180000,
    settledGrossAmount: 180000,
    feeAmount: 3240,
    expectedFeeRate: 1.8,
    appliedFeeRate: 1.8,
    taxWithholdings: 4500,
    netSettledAmount: 172260,
    difference: 0,
    status: "matched",
    statusLabel: "Conciliado",
    explanation: "Coincidencia 1:1 verificada.",
    settlementBatchId: "batch-02",
  },
];

export const rateAuditsData: RateAuditItem[] = [
  {
    id: "rate-01",
    provider: "Naranja X",
    cardType: "Crédito Propia",
    plan: "Plan Z (3 cuotas cero interés)",
    expectedRate: 2.1,
    appliedRate: 3.0,
    rateDifference: 0.9,
    periodVolume: 3840100,
    monetaryImpact: -34560,
    status: "overcharge",
    statusLabel: "Sobrearancel detectado",
    note: "Se aplicó arancel genérico de 3.00% en lugar de la tasa promocional pactada en contrato.",
  },
  {
    id: "rate-02",
    provider: "Visa",
    cardType: "Crédito 1 Pago",
    plan: "Comercio Tradicional",
    expectedRate: 1.8,
    appliedRate: 1.8,
    rateDifference: 0.0,
    periodVolume: 6420800,
    monetaryImpact: 0,
    status: "compliant",
    statusLabel: "Conforme a contrato",
    note: "Arancel liquidado exactamente según alícuota máxima regulada por Banco Central.",
  },
  {
    id: "rate-03",
    provider: "Visa",
    cardType: "Débito",
    plan: "Electrón / Contactless",
    expectedRate: 0.8,
    appliedRate: 0.8,
    rateDifference: 0.0,
    periodVolume: 2890000,
    monetaryImpact: 0,
    status: "compliant",
    statusLabel: "Conforme a contrato",
    note: "Alícuota debito verificada en todos los lotes del mes.",
  },
  {
    id: "rate-04",
    provider: "Mastercard",
    cardType: "Crédito Cuotas",
    plan: "Cuotas Simples 3 pagos",
    expectedRate: 2.4,
    appliedRate: 2.85,
    rateDifference: 0.45,
    periodVolume: 1950000,
    monetaryImpact: -8775,
    status: "overcharge",
    statusLabel: "Sobrearancel detectado",
    note: "Diferencia atribuible a costo financiero total no acordado en liquidaciones quincenales.",
  },
  {
    id: "rate-05",
    provider: "Mercado Pago",
    cardType: "Cobro QR con saldo",
    plan: "Acreditación instantánea",
    expectedRate: 0.8,
    appliedRate: 0.8,
    rateDifference: 0.0,
    periodVolume: 1250000,
    monetaryImpact: 0,
    status: "compliant",
    statusLabel: "Conforme a contrato",
    note: "Comisión fintech verificada contra tabla de aranceles.",
  },
];

export const accountingPeriodClosuresData: AccountingPeriodClosure[] = [
  {
    id: "period-2026-10-q1",
    periodName: "Octubre 2026 — Quincena 1",
    dateRange: "01/10/2026 al 15/10/2026",
    totalOperations: 1840,
    matchedCount: 1812,
    exceptionsCount: 28,
    totalAmountProcessed: 24190000,
    status: "closed",
    statusLabel: "Cerrado & Congelado",
    responsible: "Valeria Morales (Jefa de Tesorería)",
    closedAt: "18/10/2026 17:30",
    snapshotHash: "sha256:7f991bce401a89c3...112e",
  },
  {
    id: "period-2026-10-q2",
    periodName: "Octubre 2026 — Quincena 2",
    dateRange: "16/10/2026 al 31/10/2026",
    totalOperations: 1420,
    matchedCount: 1338,
    exceptionsCount: 38,
    totalAmountProcessed: 18450200,
    status: "reviewing",
    statusLabel: "En revisión de excepciones",
    responsible: "Martín Gómez (Analista Conciliaciones)",
    closedAt: null,
    snapshotHash: "En cálculo dinámico...",
  },
  {
    id: "period-2026-09-full",
    periodName: "Septiembre 2026 — Mes Completo",
    dateRange: "01/09/2026 al 30/09/2026",
    totalOperations: 3650,
    matchedCount: 3641,
    exceptionsCount: 9,
    totalAmountProcessed: 47820500,
    status: "closed",
    statusLabel: "Cerrado & Contabilizado",
    responsible: "Valeria Morales (Jefa de Tesorería)",
    closedAt: "05/10/2026 12:15",
    snapshotHash: "sha256:3c881fa9900be421...98ab",
  },
];

export const auditTimelineEventsData: AuditTimelineEvent[] = [
  {
    id: "ev-01",
    timestamp: "Hoy, 10:45 hs",
    action: "Lote de liquidación importado",
    actor: "Sistema Automático (SFTP Ingest)",
    category: "import",
    details: "Archivo LIQ_VISA_20261028_L481.csv ingerido con 482 cupones. Hash SHA-256 verificado.",
  },
  {
    id: "ev-02",
    timestamp: "Hoy, 10:46 hs",
    action: "Matching determinístico ejecutado",
    actor: "Motor de Conciliación Determinística v2",
    category: "matching",
    details: "461 operaciones emparejadas automáticamente (95.6% éxito). 21 derivadas a bandeja de excepciones.",
  },
  {
    id: "ev-03",
    timestamp: "Hoy, 09:15 hs",
    action: "Sobrearancel detectado en Naranja X",
    actor: "Regla RateAuditor_Rule04",
    category: "rate_audit",
    details: "Diferencia de 0.90% detectada en 12 cupones Plan Z. Reclamo comercial precargado por -$34.560.",
  },
  {
    id: "ev-04",
    timestamp: "Ayer, 18:20 hs",
    action: "Excepción resuelta manualmente",
    actor: "Martín Gómez (Finanzas)",
    category: "exception",
    details: "Cupón 48150 vinculado a Nota de Crédito NC-B-0001-00000412 tras verificación de devolución.",
  },
  {
    id: "ev-05",
    timestamp: "18/10/2026 17:30",
    action: "Período cerrado y snapshot congelado",
    actor: "Valeria Morales (Jefa de Tesorería)",
    category: "closure",
    details: "Período Octubre Q1 congelado con 1.840 operaciones. Imposibilidad de mutación posterior sin reapertura auditada.",
  },
];
