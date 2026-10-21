import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Mail } from "lucide-react";
import { businessData } from "@/data/business";
import { Container } from "@/components/ui/Container";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#242830] bg-[#0A0B0D] pt-16 pb-12 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#242830]">
          {/* Columna Principal */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] rounded-md w-fit"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1A1D22] border border-[#242830] text-[#D97706] font-bold text-xs tracking-wider">
                VS
              </span>
              <span className="font-semibold text-base text-[#F3F4F6]">
                {businessData.name}
              </span>
            </Link>
            <p className="text-sm text-[#9CA3AF] max-w-sm leading-relaxed">
              Desarrollo de soluciones digitales y plataformas comerciales diseñadas para resolver necesidades reales de negocio, sin ataduras a plantillas rígidas ni comisiones abusivas.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={businessData.urls.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#121417] border border-[#242830] text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#3A404A] transition-colors"
                aria-label="Perfil de GitHub de Valentín Sznitowski"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href={businessData.urls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#121417] border border-[#242830] text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#3A404A] transition-colors"
                aria-label="Perfil de LinkedIn de Valentín Sznitowski"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F3F4F6]">
              Navegación
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#9CA3AF]">
              <li>
                <Link href="/#soluciones" className="hover:text-[#F3F4F6] transition-colors">
                  Qué resuelvo
                </Link>
              </li>
              <li>
                <Link href="/#proyecto" className="hover:text-[#F3F4F6] transition-colors">
                  Custom Commerce (Showcase)
                </Link>
              </li>
              <li>
                <Link href="/proyectos/custom-commerce" className="hover:text-[#D97706] transition-colors">
                  Case Study Custom Commerce
                </Link>
              </li>
              <li>
                <Link href="/#proceso" className="hover:text-[#F3F4F6] transition-colors">
                  Cómo trabajo
                </Link>
              </li>
              <li>
                <Link href="/#capacidades" className="hover:text-[#F3F4F6] transition-colors">
                  Respaldo técnico
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto Directo */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F3F4F6]">
              Contacto Comercial
            </span>
            <p className="text-sm text-[#9CA3AF]">
              ¿Tenés un proyecto o querés consultar la viabilidad de una solución para tu negocio?
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href={businessData.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#F3F4F6] hover:text-[#D97706] transition-colors group"
              >
                <MessageSquare className="w-4 h-4 text-[#10B981]" />
                <span>Escribime por WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={`mailto:${businessData.email}`}
                className="inline-flex items-center gap-2 text-sm text-[#F3F4F6] hover:text-[#D97706] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#D97706]" />
                <span>{businessData.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>© {currentYear} {businessData.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a
              href={businessData.urls.customCommerceDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9CA3AF] transition-colors flex items-center gap-1"
            >
              Demo Taller Roble & Veta <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
