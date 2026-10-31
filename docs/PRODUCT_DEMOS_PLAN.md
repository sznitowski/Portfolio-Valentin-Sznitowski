# Plan de Arquitectura e Implementación: Catálogo de Soluciones y Prototipos B2B

> **Documento de Diseño y Roadmap Técnico**  
> Repositorio: `Portfolio-Valentin-Sznitowski`  
> Fecha: Octubre 2026  
> Objetivo: Expandir el portfolio comercial para posicionarlo como un catálogo de **Soluciones de Software a Medida**, integrando dos prototipos interactivos navegables B2B (Conciliador de Pagos y Portal de Proveedores) junto al caso insignia funcional en vivo (Custom Commerce).

---

## 1. Visión y Posicionamiento Comercial

### 1.1. Los Tres Niveles de Prueba Comercial
El portfolio evoluciona de un muestrario de proyecto único a una propuesta de valor integral para dueños de pymes y directores de operaciones:

1. **Custom Commerce (Producto Funcional Real):**
   - **Estado:** `Demo funcional en vivo`.
   - **Prueba técnica:** Storefront público desplegado en Netlify (`https://custom-commerce.netlify.app`), conectado a API NestJS y PostgreSQL en VPS.
   - **Case Study:** Estudio completo y técnico en `/proyectos/custom-commerce`.
   - **Rol:** Prueba irrefutable de capacidad full-stack e infraestructura en producción.

2. **Conciliador de Tarjetas & Liquidaciones (Prototipo Interactivo B2B):**
   - **Estado:** `Demo conceptual navegable`.
   - **Prueba técnica:** Simulación de software financiero operativo de alta complejidad (lotes de importación, cupones vs liquidaciones, matching determinístico, revisión de discrepancias, control de tasas bancarias, cierres periódicos y auditoría).
   - **Rol:** Demuestra solvencia en finanzas operativas, reglas de negocio rigurosas, reducción de trabajo manual y trazabilidad contable.

3. **Portal de Proveedores B2B (Prototipo Interactivo B2B):**
   - **Estado:** `Demo conceptual navegable`.
   - **Prueba técnica:** Plataforma de autoservicio para empresas y proveedores con múltiples unidades de negocio (Grupo Atlas), consulta de Órdenes de Pago con retenciones impositivas, Órdenes de Compra, gestión documental impositiva y centro de reclamos/soporte.
   - **Rol:** Demuestra experiencia en sistemas corporativos, integración conceptual con ERPs y optimización de canales administrativos.

### 1.2. Transparencia y Credibilidad (No Falso Producto)
Cada prototipo incluye:
- Discretas etiquetas de estado (`Demo conceptual`).
- Barra de navegación contextual con botón de retorno al portfolio (`← Volver al portfolio`).
- Botón modal "Acerca de esta solución" que explica el problema de negocio resuelto, la arquitectura que requeriría en producción y las tecnologías involucradas.
- Disclaimer visible en pie de página:
  > *"Demo conceptual con datos ficticios. Las pantallas representan una implementación navegable de software B2B para ilustrar capacidades técnicas y operativas. No procesa transacciones financieras reales ni conecta a bases de datos productivas."*

---

## 2. Auditoría del Portfolio Actual

- **Framework:** Next.js 15.5.28 (App Router), React 19, TypeScript 5.
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/postcss`) con tokens semánticos oscuros en `src/styles/globals.css`.
- **Iconografía:** `lucide-react`.
- **Rutas existentes:**
  - `/` (Home con Hero, Problem/Solution, Showcase de Custom Commerce, Servicios, Proceso, Tech, Contacto).
  - `/proyectos/custom-commerce` (Case study exhaustivo).
  - `robots.ts` y `sitemap.ts`.
- **Calidad de código actual:**
  - `npm run typecheck` pasa con 0 errores.
  - `npm run lint` pasa con 0 advertencias.
  - Arquitectura modular limpia en `src/components/`, `src/data/`, `src/app/`.

---

## 3. Arquitectura de Rutas Propuesta

Mantendremos el portfolio dentro de una única aplicación Next.js, sin paquetes externos pesados ni librerías de gráficos sobredimensionadas.

```
src/app/
├── (portfolio)/                   # Rutas del portfolio comercial
│   ├── page.tsx                  # Home con catálogo de soluciones destacado
│   ├── soluciones/page.tsx       # Catálogo completo de soluciones y casos
│   └── proyectos/custom-commerce/ # Case study existente
│
└── demos/                         # Product Prototypes navegables
    ├── layout.tsx                 # DemoRootLayout (limpieza de navbar/footer principal)
    ├── conciliador/               # Demo Conciliador de Tarjetas
    │   ├── layout.tsx             # Shell financiero (sidebar grafito/teal, contexto de lote)
    │   ├── page.tsx               # Dashboard (KPIs, volumen procesado, estado de conciliación)
    │   ├── importaciones/page.tsx # Lotes de archivos (Visa, Mastercard, Naranja X, MP) + modal carga
    │   ├── conciliacion/page.tsx  # Grilla de cupones vs liquidaciones, filtros y matching
    │   ├── excepciones/page.tsx   # Bandeja de revisión de discrepancias + drawer de resolución
    │   ├── tasas/page.tsx         # Control comparativo de tasas esperadas vs aplicadas
    │   └── cierres/page.tsx       # Cierres mensuales/quincenales + timeline de auditoría
    │
    └── proveedores/               # Demo Portal de Proveedores
        ├── layout.tsx             # Shell corporativo (sidebar slate/navy, selector de unidades)
        ├── page.tsx               # Dashboard proveedor (KPIs OP, pagos del mes, alertas)
        ├── pagos/page.tsx         # Listado de Órdenes de Pago + drawer con detalle y retenciones
        ├── compras/page.tsx       # Consulta de Órdenes de Compra e ítems
        ├── documentacion/page.tsx # Perfil impositivo y estados documentales (AFIP, CBU, ART)
        ├── reclamos/page.tsx      # Gestión de reclamos administrativos con hilo de mensajes
        └── perfil/page.tsx        # Ficha del proveedor demo y unidades asignadas
```

---

## 4. Componentes Compartidos para Demos (`src/components/demos/`)

Diseñados con alta modularidad sin sobreingeniería:

1. `DemoAppShell`: Estructura base que soporta:
   - Banner superior contextual con retorno a `/`, badge de tipo de demo y botón de información de arquitectura.
   - Sidebar responsive: fija en desktop (con opción de minimizar), drawer desplegable con overlay accesible en móvil (`Touch targets >= 44px`).
   - Header operativo con migas de pan (breadcrumbs), selector simulado de entidad/unidad y estado del sistema.
   - Footer discreto con aviso legal y técnico.
2. `DemoKpiCard`: Indicador numérico con tendencia, porcentaje de variación, etiqueta y micro-gráfico de barra o progreso.
3. `DemoTable`: Tabla interactiva con ordenamiento, paginación local en memoria, scroll horizontal fluido con sombras de desborde y visualización en tarjetas responsivas para teléfonos móviles (`< 768px`).
4. `DemoStatusBadge`: Etiquetas normalizadas de estados con colores accesibles (Conciliado, Pendiente, Diferencia, Emitida, Pagada, Vigente, etc.).
5. `DemoDrawer`: Panel lateral deslizante accesible con trampa de foco (`Esc` para cerrar, ARIA dialog) para examinar detalles de cupones, liquidaciones y órdenes de pago.
6. `DemoModal`: Modal para simular acciones (ej. "Importar archivo", "Nuevo reclamo", "Explicación de solución").
7. `DemoMiniChart`: Componente ligero basado en SVG/CSS puro para representar volumen diario y distribución de estados sin incurrir en dependencias pesadas como Recharts o Chart.js.

---

## 5. Diseño e Identidad Visual por Producto

| Entorno | Paleta Primaria | Acentos | Tipografía & Atmósfera |
|---|---|---|---|
| **Portfolio Principal** | Fondo `#0B0F17`, Superficie `#111827`, Borde `#1E293B` | Azul `#3B82F6`, Ámbar sutil | Editorial Tech, sofisticado y directo. |
| **Conciliador de Tarjetas** | Grafito `#0F172A`, Superficie `#131E2F`, Borde `#1E293B` | Cyan `#06B6D4`, Esmeralda `#10B981`, Ámbar `#F59E0B` | B2B Financiero, sobrio, alta densidad de datos legibles, precisión numérica. |
| **Portal de Proveedores** | Navy `#0A1120`, Superficie `#0F172A`, Borde `#1E293B` | Azul Corporativo `#2563EB`, Slate `#64748B`, Verde `#10B981` | Portal Empresarial Industrial, autoservicio claro, jerarquía documental. |

---

## 6. Datasets Sintéticos Centralizados (`src/data/demos/`)

Cumpliendo la regla estricta de no contener datos privados, nombres reales de empresas del sistema original (sin UNIBER, LEXIM, Supermat, Geomaco), CUITs reales ni montos de producción:

### 6.1. `src/data/demos/reconciliation.ts`
- **Lotes de importación:** 6 archivos sintéticos (Visa Crédito, Mastercard Débito, Naranja X Lote 402, Mercado Pago Checkout, Cabal Mayorista) con estados: `Procesado`, `Con advertencias`, `Pendiente`.
- **Cupones vs Liquidaciones:** 16 transacciones detalladas con fecha, número de cupón, número de comprobante ERP, monto bruto de venta, monto neto liquidado, retenciones calculadas, arancel aplicado, diferencia y estado (`Conciliado`, `Diferencia en tasa`, `Cupón no encontrado en ERP`, `Revisión manual requerida`).
- **Control de tasas:** Matriz sintética comparativa (ej. Arancel Pactado 1.80% vs Liquidado 2.15%, diferencia monetaria demostrativa).
- **Cierres & Auditoría:** Períodos quincenales/mensuales cerrados y abiertos, con timeline de eventos (carga de archivo, matching batch, resolución de discrepancia por supervisor, congelamiento de snapshot).

### 6.2. `src/data/demos/suppliers.ts`
- **Empresa Contratante:** `Grupo Atlas Industrial` (Holding ficticio con unidades: `Atlas Construcción y Obras`, `Atlas Metalmecánica`, `Atlas Logística`).
- **Proveedor Demo:** `Sinergia Metalmecánica S.A.` (CUIT sintético `30-71999888-4`, Cuenta CBU ficticia `0140999902000012345678`).
- **Órdenes de Pago:** 8 OP sintéticas con desglose de facturas abonadas, certificados de retención ficticios (Ganancias, IIBB Convenio Multilateral, SUSS) y estado (`Pagada`, `Programada`, `En emisión`).
- **Órdenes de Compra:** 5 OC con descripción de suministros industriales, fecha pactada y comprador asignado.
- **Documentación impositiva:** 6 legajos con estados de vigencia (`Vigente`, `Por vencer`, `Pendiente de actualización`).
- **Reclamos:** 3 hilos de conversación administrativa con mensajes entre proveedor y analista de cuentas a pagar de Grupo Atlas.

### 6.3. `src/data/demos/solutions.ts`
- Datos de catálogo para la Home y la página `/soluciones`, estructurando problema, solución, alcance, tags tecnológicos, tipo de demo y enlace de navegación para los 3 productos.

---

## 7. Plan de Ejecución por Etapas

1. **Etapa 1: Infraestructura de Demos y Componentes Compartidos**
   - Crear `src/data/demos/solutions.ts`, `reconciliation.ts` y `suppliers.ts`.
   - Implementar `DemoAppShell`, `DemoKpiCard`, `DemoTable`, `DemoStatusBadge`, `DemoDrawer`, `DemoModal` y `DemoMiniChart`.
2. **Etapa 2: Home del Portfolio & Catálogo de Soluciones**
   - Actualizar `ShowcaseSection.tsx` o crear `SolutionsCatalogSection.tsx` manteniendo Custom Commerce como estrella y sumando las 2 nuevas soluciones con sus respectivos accesos y badges de estado.
   - Crear `/soluciones/page.tsx` para permitir acceso directo y navegación estructurada.
   - Actualizar `Navbar.tsx` para enlazar adecuadamente al catálogo.
3. **Etapa 3: Demo Conciliador de Tarjetas**
   - Layout específico con navegación lateral y selector de estado.
   - Pantalla Dashboard con métricas, gráficos SVG y lotes recientes.
   - Pantallas de Importaciones, Conciliación, Excepciones, Tasas y Cierres.
   - Drawer de resolución interactiva y modal de importación simulada.
4. **Etapa 4: Demo Portal de Proveedores**
   - Layout corporativo Grupo Atlas con selector de unidades de negocio asignadas.
   - Pantalla Dashboard con resumen de pagos, avisos y documentación.
   - Pantallas de Mis Pagos (con desglose y retenciones), Compras, Documentación, Reclamos y Perfil.
5. **Etapa 5: Responsive, Accesibilidad y Motion Polish**
   - Validación móvil estricta (tablas que se transforman en cards o scroll touch guiado).
   - Touch targets de al menos 44px, foco accesible, soporte `prefers-reduced-motion`.
6. **Etapa 6: Verificación y Reporte**
   - `npm run typecheck`, `npm run lint`, `npm run build`.
   - Auditoría visual y recorrido interactivo completo con browser subagent.
   - Reporte final detallado.

---

## 8. Gestión de Riesgos y Supuestos

- **Riesgo:** Confundir a un visitante creyendo que los prototipos procesan pagos reales.  
  *Mitigación:* Badges permanentes de "Demo conceptual", modal informativo accesible en todo momento y banners descriptivos.
- **Riesgo:** Saturación de tablas en pantallas móviles (375px).  
  *Mitigación:* Diseño de vistas duales: tabla densa en desktop (`md:table`) y tarjetas compactas con jerarquía visual en móvil (`md:hidden`).
- **Riesgo:** Aumento innecesario de peso del bundle.  
  *Mitigación:* Cero dependencias nuevas; uso exclusivo de SVG puro y Tailwind CSS nativo.

---

## 9. Refinamiento UX, Identidades Cromáticas y Recorridos de 30-60 Segundos

### 9.1. Desacoplamiento del Hero
- Se eliminó del Hero todo mock o preview específica de Custom Commerce (producto Mesa Tala, selectores de petiribí, SKU y botón de cotización).
- Se implementó un Hero Visual abstracto y editorial (`HeroVisual.tsx`) que representa sistemas conectados en tiempo real (Entrada $\rightarrow$ Enlace de APIs $\rightarrow$ Automatización $\rightarrow$ Salida operativa), garantizando neutralidad y representatividad de toda la gama de servicios.

### 9.2. Identidades Cromáticas Diferenciadas
Cada producto cuenta con una paleta distintiva aplicada con sobriedad en bordes activos, badges, botones CTA, acentos y gráficos, manteniendo el fondo general oscuro (`#0B0F17` / `#111827`):
- **Catálogo y Ventas a Medida (Custom Commerce):** Verde esmeralda artesanal (`#10B981`, `#064E3B`, `#34D399`).
- **Control y Conciliación de Cobros (Conciliador):** Cyan financiero (`#06B6D4`, `#164E63`, `#22D3EE`).
- **Portal de Autogestión para Proveedores (Portal B2B):** Azul corporativo (`#3B82F6`, `#1E3A8A`, `#60A5FA`).

### 9.3. Recorridos de 30-60 Segundos en Demos Navegables
Se redujo la navegación a exactamente **4 módulos esenciales por producto**:

1. **Conciliador de Cobros:**
   - **Panel:** 4 métricas (Ventas procesadas, Cobros conciliados, Diferencias detectadas, Pendientes de revisión) + gráfico simple + botón directo a conciliaciones.
   - **Conciliaciones:** Grilla limpia (Fecha, Medio de pago, Venta, Cobro, Diferencia, Estado) con click a drawer lateral de detalle.
   - **Diferencias:** 3 casos típicos (Monto diferente, Pago no encontrado, Duplicado) con resolución asistida.
   - **Importaciones:** 4 procesadores (Visa, Mastercard, Mercado Pago, Naranja X) con botón instantáneo "Simular carga" y feedback claro.

2. **Portal de Proveedores:**
   - **Panel:** 4 métricas (Pagos recientes, Próximo pago, Documentos pendientes, Reclamos abiertos) + accesos directos.
   - **Pagos:** Grilla clara (Número, Fecha, Importe, Estado) con click a drawer lateral de facturas canceladas y certificados.
   - **Documentación:** 4 legajos (Constancia fiscal, Datos bancarios, Seguro ART, Certificado) con estados *Vigente*, *Por vencer* y *Pendiente*.
   - **Reclamos:** Lista de reclamos, conversación interactiva y modal de "Nuevo reclamo demo" con feedback claro.

