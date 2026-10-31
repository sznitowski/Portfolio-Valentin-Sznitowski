"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Info,
  Menu,
  X,
  ShieldAlert,
  Layers,
  Cpu,
  Database,
  ExternalLink,
} from "lucide-react";
import { DemoModal } from "./DemoModal";
import { DemoStatusBadge } from "./DemoStatusBadge";

export interface DemoNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface DemoAppShellProps {
  demoTitle: string;
  demoSubtitle: string;
  badgeLabel: string;
  productType: "conciliador" | "proveedores";
  navItems: DemoNavItem[];
  headerContextInfo?: {
    label: string;
    value: string;
  };
  aboutInfo: {
    title: string;
    problem: string;
    conceptualArchitecture: string[];
    productionStack: string[];
    syntheticDataDisclaimer: string;
  };
  children: React.ReactNode;
}

export const DemoAppShell: React.FC<DemoAppShellProps> = ({
  demoTitle,
  demoSubtitle,
  badgeLabel,
  productType,
  navItems,
  headerContextInfo,
  aboutInfo,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const theme = {
    conciliador: {
      accentText: "text-cyan-400",
      accentBorder: "border-cyan-500/30",
      accentActive: "bg-cyan-500/15 text-cyan-300 border-cyan-500/40",
      accentGlow: "from-cyan-500/10",
      shellBg: "bg-[#0A0E17]",
      sidebarBg: "bg-[#0D131F]",
      headerBg: "bg-[#0D131F]/90",
      badgeTone: "info" as const,
    },
    proveedores: {
      accentText: "text-blue-400",
      accentBorder: "border-blue-500/30",
      accentActive: "bg-blue-500/15 text-blue-300 border-blue-500/40",
      accentGlow: "from-blue-500/10",
      shellBg: "bg-[#080D1A]",
      sidebarBg: "bg-[#0C1427]",
      headerBg: "bg-[#0C1427]/90",
      badgeTone: "purple" as const,
    },
  }[productType];

  return (
    <div className={`min-h-screen flex flex-col ${theme.shellBg} text-slate-200 antialiased font-sans`}>
      {/* 1. Barra de Navegación de Portfolio Superior (Inmersiva pero conectada) */}
      <header className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#1E293B] px-4 sm:px-6 py-2.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/#soluciones"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Volver a la portada del portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al portfolio</span>
            </Link>

            <span className="hidden sm:inline-block text-slate-600">/</span>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200">{demoTitle}</span>
              <DemoStatusBadge label={badgeLabel} tone={theme.badgeTone} size="sm" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAboutModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden xs:inline">Acerca de esta solución</span>
              <span className="xs:hidden">Info</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Cuerpo Principal con Sidebar + Contenido */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* Sidebar Desktop */}
        <aside
          className={`hidden md:flex flex-col w-64 shrink-0 border-r border-[#1E293B] ${theme.sidebarBg} p-4 space-y-6`}
          aria-label="Navegación del producto"
        >
          {/* Título de la Solución */}
          <div className="px-2 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 font-semibold">
                Prototipo Activo
              </span>
            </div>
            <h1 className="text-base font-bold text-white tracking-tight mt-1">
              {demoTitle}
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              {demoSubtitle}
            </p>
          </div>

          {/* Menú de Módulos */}
          <nav className="flex-1 space-y-1" aria-label="Pantallas de la demo">
            <span className="px-2 text-[10px] font-mono-tech uppercase tracking-wider text-slate-500 font-semibold block mb-2">
              Módulos Operativos
            </span>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                    isActive
                      ? theme.accentActive
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? theme.accentText : "text-slate-500"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Contexto Ficticio en Sidebar */}
          {headerContextInfo && (
            <div className="rounded-lg bg-[#0B0F17] border border-slate-800 p-3 text-xs space-y-1">
              <span className="text-[10px] font-mono-tech uppercase text-slate-500 block">
                {headerContextInfo.label}
              </span>
              <span className="font-semibold text-slate-300 block truncate">
                {headerContextInfo.value}
              </span>
            </div>
          )}

          {/* Mini disclaimer en sidebar */}
          <div className="px-2 pt-2 border-t border-slate-800 text-[10px] text-slate-500 leading-normal flex items-start gap-1.5">
            <ShieldAlert className="w-3 h-3 text-amber-500/80 shrink-0 mt-0.5" />
            <span>Datos 100% sintéticos con fines ilustrativos.</span>
          </div>
        </aside>

        {/* Sidebar Mobile (Drawer deslizable) */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <div
              className={`relative flex-1 flex flex-col max-w-xs w-full ${theme.sidebarBg} border-r border-[#1E293B] p-5 shadow-2xl z-10`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-sm font-bold text-white">{demoTitle}</h2>
                  <span className="text-[11px] text-slate-400">Menú de navegación</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white"
                  aria-label="Cerrar menú móvil"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 py-4 space-y-1" aria-label="Navegación móvil de la demo">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium border transition-colors ${
                        isActive
                          ? theme.accentActive
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? theme.accentText : "text-slate-500"}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  href="/#soluciones"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Salir al portfolio</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 3. Área de Contenido Principal */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            {children}
          </div>

          {/* Footer del prototipo */}
          <footer className="mt-12 pt-6 border-t border-slate-800/80 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p className="max-w-2xl leading-relaxed">
              Demo conceptual con datos ficticios. Las funcionalidades representan una posible implementación técnica de software B2B y no procesan información real ni conectan a entidades financieras o ERPs productivos.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setAboutModalOpen(true)}
                className="text-slate-400 hover:text-slate-200 transition-colors underline"
              >
                Arquitectura conceptual
              </button>
              <span>•</span>
              <Link href="/#contacto" className="text-slate-400 hover:text-slate-200 transition-colors">
                Consultar desarrollo
              </Link>
            </div>
          </footer>
        </main>
      </div>

      {/* Modal Informativo: Acerca de esta Solución */}
      <DemoModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        title={aboutInfo.title}
        subtitle="Contexto comercial, arquitectura conceptual y alcance demostrativo"
        maxWidth="lg"
      >
        <div className="space-y-6 text-xs sm:text-sm">
          {/* Problema que resuelve */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Problema comercial que resuelve</span>
            </div>
            <p className="text-slate-300 leading-relaxed bg-[#111827] border border-slate-800 p-3.5 rounded-xl">
              {aboutInfo.problem}
            </p>
          </div>

          {/* Módulos conceptuales */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Flujo operativo implementado en el prototipo</span>
            </div>
            <ul className="space-y-1.5 pl-1">
              {aboutInfo.conceptualArchitecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400 font-mono-tech mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack productivo recomendado */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Database className="w-4 h-4 text-blue-400" />
              <span>Stack técnico en un despliegue real</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {aboutInfo.productionStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 font-mono-tech text-xs border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Transparencia y datos sintéticos */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs leading-relaxed space-y-1">
            <span className="font-semibold block">Aviso de Datos Ficticios & Alcance:</span>
            <p>{aboutInfo.syntheticDataDisclaimer}</p>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setAboutModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
            >
              Entendido, volver a la demo
            </button>
          </div>
        </div>
      </DemoModal>
    </div>
  );
};
