import React from "react";
import { ArrowRight, MessageCircleOff, FileSpreadsheet, Layers, ShoppingBag, Sliders, Cpu } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ProblemSolutionItem {
  id: string;
  problem: {
    badge: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  solution: {
    badge: string;
    title: string;
    description: string;
    outcome: string;
    icon: React.ReactNode;
  };
}

const items: ProblemSolutionItem[] = [
  {
    id: "catalogo",
    problem: {
      badge: "Situación habitual",
      title: "Venta informal por mensajes sin catálogo",
      description:
        "Enviar fotos sueltas por WhatsApp o Instagram, responder 20 veces al día los mismos precios y perder clientes que no esperan una respuesta manual.",
      icon: <MessageCircleOff className="w-5 h-5 text-[#EF4444]" />,
    },
    solution: {
      badge: "Solución implementada",
      title: "Catálogo comercial interactivo y estructurado",
      description:
        "Una plataforma web propia donde tus clientes navegan productos, ven descripciones claras, fotos reales y consultan con el pedido ya seleccionado.",
      outcome: "Menos tiempo respondiendo lo mismo, más conversaciones que terminan en venta.",
      icon: <ShoppingBag className="w-5 h-5 text-[#10B981]" />,
    },
  },
  {
    id: "personalizacion",
    problem: {
      badge: "Situación habitual",
      title: "Productos a medida difíciles de cotizar",
      description:
        "Muebles, aberturas o productos artesanales con diferentes medidas, maderas o telas que exigen cálculos manuales largos para pasar un presupuesto estimativo.",
      icon: <Layers className="w-5 h-5 text-[#EF4444]" />,
    },
    solution: {
      badge: "Solución implementada",
      title: "Configurador con presupuesto dinámico",
      description:
        "Campos personalizados donde el comprador elige largo, ancho, materiales y acabados, obteniendo una cotización transparente antes de contactarte.",
      outcome: "Recibís consultas con el requerimiento técnico completo y listo para fabricar.",
      icon: <Sliders className="w-5 h-5 text-[#10B981]" />,
    },
  },
  {
    id: "operacion",
    problem: {
      badge: "Situación habitual",
      title: "Procesos manuales y planillas dispersas",
      description:
        "Anotar pedidos en cuadernos, planillas de Excel desactualizadas y depender de la memoria del dueño para saber qué cotizaciones quedaron pendientes.",
      icon: <FileSpreadsheet className="w-5 h-5 text-[#EF4444]" />,
    },
    solution: {
      badge: "Solución implementada",
      title: "Panel de administración y seguimiento a medida",
      description:
        "Un panel privado y sencillo donde cargás productos, actualizás precios en un click y revisás todas las solicitudes recibidas en un solo lugar.",
      outcome: "Orden operativo y autonomía total para gestionar tu negocio sin depender de nadie.",
      icon: <Cpu className="w-5 h-5 text-[#10B981]" />,
    },
  },
];

export const ProblemSolutionSection: React.FC = () => {
  return (
    <section id="soluciones" className="py-20 sm:py-28 border-b border-[#242830]/60 relative">
      <Container>
        {/* Encabezado de Sección */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <span className="text-xs font-mono-tech uppercase tracking-wider text-[#D97706] font-semibold">
            Impacto Directo
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F3F4F6] mt-2">
            Qué puedo resolver para tu negocio
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
            No desarrollo sitios web estéticos sin propósito. Construyo herramientas pensadas para eliminar cuellos de botella reales en ventas y operación.
          </p>
        </div>

        {/* Lista de Relaciones Problema -> Solución */}
        <div className="space-y-6 sm:space-y-8">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-xl border border-[#242830] bg-[#121417] p-5 sm:p-7 transition-all duration-200 hover:border-[#3A404A]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Lado Problema (4 columnas) */}
                <div className="lg:col-span-5 rounded-lg bg-[#0A0B0D] border border-[#242830]/80 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                      {item.problem.badge}
                    </span>
                    <span className="text-[11px] text-[#6B7280] font-mono-tech">
                      0{idx + 1}A
                    </span>
                  </div>
                  <div className="flex items-start gap-3 pt-1">
                    <div className="p-2 rounded-md bg-[#1A1D22] border border-[#242830] shrink-0 mt-0.5">
                      {item.problem.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#F3F4F6]">
                        {item.problem.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1.5 leading-relaxed">
                        {item.problem.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flecha Conectora Central (1 columna) */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#1A1D22] border border-[#242830] flex items-center justify-center text-[#D97706]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Lado Solución (6 columnas) */}
                <div className="lg:col-span-6 rounded-lg bg-[#1A1D22]/60 border border-[#D97706]/30 p-5 space-y-3 shadow-[0_0_15px_-3px_rgba(217,119,6,0.06)]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      {item.solution.badge}
                    </span>
                    <span className="text-[11px] text-[#D97706] font-mono-tech">
                      0{idx + 1}B
                    </span>
                  </div>
                  <div className="flex items-start gap-3 pt-1">
                    <div className="p-2 rounded-md bg-[#D97706]/15 border border-[#D97706]/30 shrink-0 mt-0.5">
                      {item.solution.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-[#F3F4F6]">
                        {item.solution.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                        {item.solution.description}
                      </p>
                      <div className="pt-2 border-t border-[#242830]/60 flex items-center gap-2 text-xs text-[#10B981] font-medium">
                        <span>Resultado:</span>
                        <span className="text-[#F3F4F6] font-normal">{item.solution.outcome}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
