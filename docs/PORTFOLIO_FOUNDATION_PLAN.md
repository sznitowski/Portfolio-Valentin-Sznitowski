# PORTFOLIO COMMERCIAL FOUNDATION PLAN
> **Documento Canónico de Arquitectura, Estrategia Comercial y Diseño**  
> Repositorio: `Portfolio-Valentin-Sznitowski`  
> Fecha: Octubre 2026 | Versión: 1.0.0

---

## 1. Auditoría del Repositorio
- **Estado Inicial:** Repositorio limpio, prácticamente vacío (`LICENSE` MIT, `README.md` minimalista).
- **Deuda Técnica:** Cero código legado, cero dependencias obsoletas.
- **Entorno de Trabajo:** Windows 11, Node.js v20+, npm, shell PowerShell.
- **Destino del Código:** Todo el desarrollo se ubicará en la raíz de `Portfolio-Valentin-Sznitowski`.

---

## 2. Auditoría y Selección de Skills

Se realizó una búsqueda exhaustiva en el registro abierto de skills para agentes (`skills.sh`). Siguiendo la premisa de **no instalar indiscriminadamente**, se seleccionaron e instalaron 8 skills especializadas de máxima reputación y complementariedad en `.agents/skills/`:

| Skill | Autor / Origen | Propósito y Justificación |
| :--- | :--- | :--- |
| **`frontend-design`** | Anthropic | Dirección estética intencional, evitando interfaces genéricas tipo plantilla SaaS o clones de Bootstrap. |
| **`emil-design-eng`** | Emil Kowalski | Filosofía de design engineering: refinamiento de componentes, jerarquía, espaciado y calidad invisible. |
| **`animate`** | Emil Kowalski | Diseño de movimiento con propósito: física de resortes, curvas bezier y transiciones no intrusivas. |
| **`animation-performance`** | Emil Kowalski | Garantía de 60fps: uso estricto de propiedades compuestas por GPU (`transform`, `opacity`) sin provocar layout thrashing. |
| **`mobile-native`** | Emil Kowalski | Adaptabilidad mobile-first de nivel nativo: gestión de `100dvh`, eliminación de sticky-hover en touch, targets mínimos de 44x44px. |
| **`web-design-guidelines`** | Vercel Labs | Cumplimiento de estándares de interfaz web moderna, contraste y consistencia de controles interactivos. |
| **`vercel-react-best-practices`** | Vercel Labs | Optimización técnica en Next.js (App Router, Server Components para contenido estático, bundle size reducido). |
| **`accessibility`** | Addy Osmani | Cumplimiento WCAG 2.2 AA: navegación por teclado, focus visible, HTML semántico y respeto estricto de `prefers-reduced-motion`. |

---

## 3. Stack Tecnológico Recomendado

1. **Framework:** Next.js 15 (App Router) con TypeScript en modo estricto (`"strict": true`).
   - Generación estática optimizada para máxima velocidad en CDN (Lighthouse 95+).
   - Server Components por defecto para SEO y rendimiento.
2. **Estilos:** Tailwind CSS con arquitectura de **Design Tokens semánticos** en variables CSS (`:root`).
3. **Iconos:** `lucide-react` (icons SVG ultra-ligeros, consistentes y con soporte para accesibilidad).
4. **Animaciones:** Enfoque híbrido de alta fidelidad:
   - 80% CSS moderno acelerado por hardware para microinteracciones, hover states y reveals.
   - Utilidades de motion ligeras para scroll-driven storytelling sin librerías pesadas innecesarias.
5. **Estructura de Datos:** Modelado desacoplado en TypeScript (`src/data/`) para centralizar la información de contacto, demo links y proyectos sin necesidad de bases de datos o backend en esta etapa.
6. **Despliegue Objetivo:** Netlify / Vercel con integración continua y archivo `netlify.toml` preconfigurado.

---

## 4. Posicionamiento Comercial y Dirección Visual

### 4.1. Enfoque Comercial vs CV Tradicional
- **Prohibido:** No utilizar formato de currículum ("Sobre mí", "Mis estudios", "Buscando empleo", logos de tecnologías en fila como única prueba de valor).
- **Propuesta Comercial:** "Desarrollo soluciones digitales a medida para negocios que necesitan vender, ordenar su operación y crecer."
- **Identidad de Marca:** **Valentín Sznitowski** · *Desarrollo de Soluciones Digitales para Negocios*.
- **Tono de Comunicación:** Español argentino profesional y cercano (uso moderado de "vos", sin modismos exagerados, sin traducciones corporativas artificiales y sin sonar a texto generado por IA).

### 4.2. Sistema de Diseño (Editorial Tech & Minimalismo Cálido)
- **Fondo:** Tonos oscuros profundos y confortables (no negro plano `#000` que fatiga la vista, sino carbón grafito `#0C0D0E` y elevaciones en `#141619`).
- **Acento:** Ámbar cálido / ocre dorado sobrio (`#D97706` / `#E5A93C`), transmitiendo solidez artesanal y precisión técnica (conectando armónicamente con el rubro de *Taller Roble & Veta* de la demo).
- **Tipografías:**
  - *Headings:* `Plus Jakarta Sans` (geométrica, moderna, editorial).
  - *Body:* `Inter` (legibilidad contrastada y ritmo de lectura natural).
  - *Badges & Data:* `JetBrains Mono` (exclusivo para chips de estado, métricas o detalles técnicos discretos).

### 4.3. Paleta de Tokens Semánticos
```css
:root {
  --bg-primary: #0a0b0d;
  --bg-surface: #121417;
  --bg-surface-elevated: #1a1d22;
  --border-subtle: #242830;
  --border-hover: #383e4a;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --accent-primary: #d97706;
  --accent-hover: #f59e0b;
  --accent-subtle: rgba(217, 119, 6, 0.12);
  --status-live: #10b981;
}
```

---

## 5. Arquitectura de Información y Sitemap

```
/ (Home Comercial)
├── Navbar Flotante (Marca, Soluciones, Proyecto Destacado, Proceso, CTA WhatsApp)
├── 1. Hero Comercial (Propuesta de valor, CTAs de acción, Mini-preview interactivo)
├── 2. Dolores Reales vs Soluciones para Negocios (De qué manera ayudo)
├── 3. Proyecto Destacado: Custom Commerce (Taller Roble & Veta - Narrativa comercial, métricas y CTA a Demo)
├── 4. Servicios y Capacidades de Desarrollo (3 ejes claros)
├── 5. Metodología de Trabajo en 5 Pasos (Claridad y tranquilidad para el cliente)
├── 6. Garantía Técnica (Stack moderno como respaldo)
├── 7. Contacto Directo y Cierre Comercial (WhatsApp directo + Email)
└── Footer Minimalista

/proyectos/custom-commerce (Case Study Detallado)
├── Cabecera & Enlace directo a demo (custom-commerce.netlify.app)
├── El Negocio & Contexto (Taller de carpintería y fabricación a medida)
├── El Problema Comercial (Ventas por chat desordenadas, cotizaciones lentas)
├── La Solución Implementada (Catálogo dinámico, campos a medida, cotizador automático)
├── Impacto y Capacidades Clave
├── Arquitectura Técnica (Next.js, NestJS, Prisma, PostgreSQL, Docker)
└── CTA Final para proyectos similares
```

---

## 6. Proyecto Destacado: Custom Commerce

La demo en vivo ([https://custom-commerce.netlify.app](https://custom-commerce.netlify.app)) es el centro neurálgico del portfolio inicial. No se presentará como un "proyecto de estudio", sino como una **plataforma comercial desarrollada y lista para producción**.

- **Ejes de comunicación:**
  1. *Catálogo configurable:* Permite a cualquier taller o comercio exhibir productos con medidas, materiales y acabados reales.
  2. *Presupuestos automáticos:* El cliente final configura su producto y genera la solicitud en WhatsApp con los datos exactos.
  3. *Autonomía del comerciante:* Panel administrativo para gestionar productos sin depender de un programador en el día a día.
- **Acciones:**
  - Botón principal: `"Probar demo pública"` (abre en nueva pestaña con `rel="noopener noreferrer"`).
  - Botón secundario: `"Ver análisis del proyecto"` (dirige al case study).

---

## 7. Estrategia de Motion y Accesibilidad

- **Principios de Animación:**
  - Curvas de desaceleración naturales (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Duraciones ajustadas: 150ms a 250ms para microinteracciones (hover, focus), 280ms a 350ms para reveals de scroll.
  - Cero jank: animación exclusiva de `transform` y `opacity`.
- **Accesibilidad y Rendimiento:**
  - `@media (prefers-reduced-motion: reduce)` integrado en los tokens globales para deshabilitar desplazamientos físicos.
  - Navegación completa por teclado con `:focus-visible` de alto contraste.
  - Dimensiones táctiles mínimas de 44x44px en mobile.
  - Cumplimiento estricto de contrastes de texto (ratios superiores a 4.5:1).

---

## 8. Estrategia de Configuración Centralizada

Para evitar hardcodear datos sensibles o de contacto, se define un módulo de configuración:
`src/data/business.ts`:
- Número de WhatsApp comercial con mensaje preformateado (ej. *"Hola Valentín, estuve viendo tu portfolio y me gustaría consultarte por un proyecto para mi negocio"*).
- Correo electrónico comercial.
- Enlaces a la demo de `custom-commerce`.
- Perfil de LinkedIn / GitHub.

---

## 9. Hoja de Ruta de Implementación (Roadmap)

1. **Paso 1 (Cimientos):** Inicializar proyecto Next.js 15 + TypeScript + Tailwind CSS en `Portfolio-Valentin-Sznitowski`.
2. **Paso 2 (Design System & Config):** Configurar `globals.css` con variables CSS semánticas, tipografías y `business.ts`.
3. **Paso 3 (Componentes Core):** Crear Navbar flotante, Footer, botones accesibles, badges de estado y contenedores.
4. **Paso 4 (Home - Bloque Superior):** Implementar Hero comercial, badge de disponibilidad y sección de problemas/soluciones.
5. **Paso 5 (Home - Showcase Protagonista):** Implementar la sección editorial de `custom-commerce` con enlace directo a la demo.
6. **Paso 6 (Home - Servicios, Proceso y Contacto):** Implementar secciones de servicios agrupados, metodología de trabajo y bloque de contacto por WhatsApp.
7. **Paso 7 (Case Study):** Crear la ruta `/proyectos/custom-commerce` con el desglose comercial y técnico.
8. **Paso 8 (Validación Multidispositivo y QA):**
   - Validación en navegador real: Desktop (1440x900) y Mobile (375x812).
   - Auditoría de accesibilidad, contrastes y comportamiento con teclado.
   - Verificación de builds limpios (`next build`, `typecheck`, `lint`).
