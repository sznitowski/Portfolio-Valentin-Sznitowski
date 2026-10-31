"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { businessData } from "@/data/business";
import { Button } from "@/components/ui/Button";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Tecnologías", href: "/#tecnologias" },
  { label: "Contacto", href: "/#contacto" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#0B0F17]/90 backdrop-blur-md border-b border-[#1E293B]/80 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-4 sm:py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#F8FAFC] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-md px-1 py-0.5"
          aria-label="Valentín Sznitowski - Inicio"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#131B2A] border border-[#1E293B] text-[#60A5FA] font-bold text-xs tracking-wider group-hover:border-[#3B82F6]/50 transition-colors">
            VS
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[#F8FAFC] group-hover:text-white transition-colors">
              {businessData.name}
            </span>
            <span className="text-[10px] text-[#94A3B8] tracking-wide -mt-0.5 hidden sm:block">
              Software & Soluciones Web
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#111827]/70 border border-[#1E293B]/60 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-inner" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs lg:text-sm text-[#94A3B8] hover:text-[#F8FAFC] px-3 py-1.5 rounded-full transition-colors duration-150 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B82F6]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            href={businessData.whatsapp.url}
            isExternal
            size="sm"
            variant="primary"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            aria-label="Abrir WhatsApp para hablar sobre un proyecto"
          >
            Hablemos
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            href={businessData.whatsapp.url}
            isExternal
            size="sm"
            variant="primary"
            className="!px-3 !py-1.5 !min-h-[38px] text-xs"
          >
            Hablemos
          </Button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#111827] border border-[#1E293B] text-[#F8FAFC] hover:bg-[#1E293B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bg-[#0B0F17]/95 backdrop-blur-xl border-b border-[#1E293B] px-4 py-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-2" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-[#F8FAFC] hover:text-[#60A5FA] hover:bg-[#111827] px-4 py-3 rounded-lg border border-transparent hover:border-[#1E293B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-[#1E293B] flex flex-col gap-3">
              <Button
                href={businessData.whatsapp.url}
                isExternal
                size="md"
                variant="primary"
                className="w-full justify-center"
              >
                Hablemos por WhatsApp
              </Button>
              <Link
                href="/proyectos/custom-commerce"
                onClick={() => setIsOpen(false)}
                className="text-xs text-center text-[#9CA3AF] hover:text-[#F3F4F6] py-2"
              >
                Ver caso de estudio Custom Commerce →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
