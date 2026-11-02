import React from "react";
import { techCapabilities } from "@/data/tech";
import { Container } from "@/components/ui/Container";
import { Server, Code, Database, Cpu, Bot } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code className="w-4 h-4 text-cyan-400" />,
  Backend: <Server className="w-4 h-4 text-blue-400" />,
  Data: <Database className="w-4 h-4 text-emerald-400" />,
  Infraestructura: <Cpu className="w-4 h-4 text-indigo-400" />,
  "IA & Automatización": <Bot className="w-4 h-4 text-purple-400" />,
};

export const TechSection: React.FC = () => {
  return (
    <section id="tecnologias" className="py-20 sm:py-28 border-b border-[#1E293B]/60 relative">
      <Container>
        {/* Encabezado Editorial Secundario */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
              Capacidades Técnicas
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Herramientas estándar y estables</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] mt-2">
            Tecnologías al servicio de la solución
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
            La tecnología es el medio, no el fin. Selecciono herramientas estándar y bien documentadas para que tus sistemas sean rápidos, seguros y no dependan de fórmulas propietarias cerradas.
          </p>
        </div>

        {/* Grilla Limpia por Capacidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {techCapabilities.map((cat) => (
            <div
              key={cat.category}
              className="rounded-2xl border border-[#1E293B] bg-[#111827] p-5 flex flex-col justify-between transition-all duration-200 hover:border-slate-700 hover:bg-[#131B2A] space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#1E293B]">
                  <div className="flex items-center gap-2">
                    {categoryIcons[cat.category]}
                    <span className="text-xs font-bold text-white tracking-tight">
                      {cat.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cat.description}
                </p>

                {/* Chips de Tecnologías */}
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {cat.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono-tech bg-[#0B0F17] border border-slate-800 text-slate-200 px-2 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#1E293B]/80 text-[10px] text-slate-500 font-mono-tech">
                {cat.badge}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
