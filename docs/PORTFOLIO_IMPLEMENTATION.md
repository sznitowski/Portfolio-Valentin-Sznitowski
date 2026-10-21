# Portfolio Commercial Implementation & Polish Record
> **Registro de Implementación y Pulido Visual/Comercial (Fase 2 & Fase 3)**  
> Repositorio: `Portfolio-Valentin-Sznitowski`  
> Fecha: Octubre 2026 | Versión: 1.1.0

---

## 1. Arquitectura Técnica

- **Framework:** Next.js 15.5+ (App Router) sobre React 19 y Node.js v20+.
- **TypeScript:** Modo estricto (`"strict": true`, cero uso de `any`).
- **Arquitectura de Renderizado:**
  - `src/app/page.tsx` es un **Server Component puro (`RSC`)** para garantizar máximo rendimiento, cero impacto de JavaScript innecesario en cliente y SEO óptimo.
  - Únicamente los componentes con interactividad en el cliente utilizan `"use client"` (`Navbar` para control de scroll y menú móvil, `ContactSection` para copiado en portapapeles).
- **Estructura Desacoplada de Datos:**
  - `src/data/business.ts`: Centraliza la configuración de negocio, datos de contacto verificados (`vsznitowski@gmail.com`) y fallback seguro de WhatsApp que redirige por correo con asunto preconfigurado en caso de no haberse inyectado aún el teléfono comercial vía `.env`.
  - `src/data/projects.ts`: Modelo extensible para proyectos reales, con `custom-commerce` como proyecto insignia.
  - `src/data/services.ts`: 3 áreas de servicios comerciales estrictamente orientadas a la contratación del cliente.
  - `src/data/process.ts`: Metodología comercial en 5 pasos orientada a bajo riesgo y acompañamiento.
  - `src/data/tech.ts`: Tecnologías permitidas como respaldo de confiabilidad.

---

## 2. Sistema de Diseño (Design Tokens)

Centralizados en `src/styles/globals.css`:
- **Fondo Base (`--bg-primary`):** `#0A0B0D` (carbón profundo de bajo cansancio visual).
- **Superficie (`--bg-surface`):** `#121417` (cards y contenedores).
- **Superficie Elevada (`--bg-surface-elevated`):** `#1A1D22` (hover, modales, chips).
- **Bordes (`--border-subtle` / `--border-hover`):** `#242830` y `#3A404A` (líneas de 1px precisas).
- **Texto Principal (`--text-primary`):** `#F3F4F6` (contraste superior a 12:1 sobre fondo base).
- **Texto Secundario (`--text-secondary`):** `#9CA3AF` (contraste superior a 5.5:1, WCAG AA).
- **Acento Primario (`--accent-primary`):** `#D97706` (ámbar profesional / oro cálido).
- **Acento Hover (`--accent-hover`):** `#F59E0B`.
- **Estado En Vivo (`--status-live`):** `#10B981` (verde esmeralda).

### Tipografía
- **Headings:** `Plus Jakarta Sans` mediante `next/font/google`.
- **Lectura Comercial (Body):** `Inter` mediante `next/font/google`.
- **Chips & Métricas:** `JetBrains Mono` con clase `.font-mono-tech`.

---

## 3. Pulido Visual y Comercial Implementado (Fase 3)

1. **Hero de Alta Fidelidad & Fotografía Real:**
   - Headline comercial enfocado en negocios: *"Desarrollo plataformas web y catálogos a medida para negocios que necesitan vender mejor."*
   - Subheadline que despeja cualquier duda sobre CV y plantea la propuesta de valor sin intermediarios ni comisiones.
   - Componente `HeroVisual` actualizado con fotografía real de alta resolución de la `Mesa Tala` en Petiribí macizo, campos del configurador dinámico y botón de cotización directa a WhatsApp.
2. **Custom Commerce Showcase Protagonista:**
   - Contexto de la instancia real (*Taller Roble & Veta*).
   - Incorporación de galería con productos reales de la demo (`Mesa Tala`, `Aparador Nativo` y `Isla Central de Cocina`).
   - Botón directo *"Probar demo pública"* abriendo `https://custom-commerce.netlify.app` en nueva pestaña.
3. **Case Study Editorial (`/proyectos/custom-commerce`):**
   - Enfoque Business First: el dolor de responder precios por chat, la solución interactiva, galería de productos reales y diagrama de arquitectura simplificado (`Storefront` $\rightarrow$ `API` $\rightarrow$ `PostgreSQL`).
4. **Servicios Concretos:**
   - 3 opciones claras respondiendo estrictamente a *"¿Qué puedo contratar?"*: Catálogos con cotizador a medida, Paneles de gestión interna, y Sitios web de alta velocidad.
5. **Proceso de 5 Pasos Transparente:**
   - Redacción que transmite orden, tranquilidad y bajo riesgo (desde la charla inicial sin compromiso hasta la puesta en marcha con acompañamiento).
6. **Seguridad y Fallback de Contacto (WhatsApp):**
   - Eliminación de cualquier enlace muerto o número placeholder visible en producción. Si `NEXT_PUBLIC_WHATSAPP_NUMBER` no está definido en el entorno, el sistema activa un fallback seguro por correo electrónico con mensaje pre-armado y botón de copiado rápido al portapapeles.

---

## 4. Decisiones de Motion y Accesibilidad

- **Propiedades animadas:** Estrictamente `transform` y `opacity` para garantizar 60fps sin reflows del DOM (`animation-performance`).
- **Duraciones:** 150-200ms para microinteracciones de botones y cards; 320ms para reveals de entrada.
- **Soporte `prefers-reduced-motion`:** Sobrescritura global en `globals.css` que desactiva animaciones y transformaciones para usuarios con sensibilidad al movimiento.
- **Accesibilidad WCAG 2.2 AA:**
  - Focus-visible con anillo ámbar contrastado y offset de 3px.
  - Targets táctiles de mínimo 44x44px en dispositivos móviles.
  - Etiquetas semánticas (`<header>`, `<main>`, `<article>`, `<footer>`, `<section>`).
  - Botones y enlaces con `aria-label` claros y enlaces externos protegidos con `rel="noopener noreferrer"`.

---

## 5. Estrategia Responsive y Viewports

- **Mobile (375x812):** Cero desbordamiento horizontal, menú móvil accesible, botones con targets amplios ($\ge 44\times44\text{px}$), altura dinámica `100dvh`.
- **Tablet (768px):** Grillas de 2 columnas fluidas con espaciado equilibrado.
- **Desktop (1440x900 y 1920x1080):** Contenedores centrados con anchos controlados (`max-w-6xl` y `max-w-4xl`), composición editorial rica y balanceada.

---

## 6. Estado de Verificación y Compilación

- `npm run typecheck`: **0 errores**
- `npm run lint`: **0 errores, 0 warnings**
- `npm run build`: **Exitoso (7/7 páginas estáticas pre-renderizadas)**
- Tamaño First Load JS: **113-116 kB**
- Ambas rutas (`/` y `/proyectos/custom-commerce`): **HTTP 200 OK**
