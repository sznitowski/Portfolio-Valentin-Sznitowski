import React from "react";
import {
  ShoppingBag,
  Cpu,
  Wrench,
  Network,
  Bot,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface BusinessProblemSolution {
  id: string;
  badge: string;
  need: string;
  resolution: string;
  deliverableSummary: string;
  icon: React.ReactNode;
}

const problemsAndSolutions: BusinessProblemSolution[] = [
  {
    id: "vender-mejor",
    badge: "Ventas & Presupuestos",
    need: "Necesito mostrar productos y vender mejor sin perder horas cotizando",
    resolution:
      "Construyo catálogos comerciales interactivos con cotizadores a medida (dimensiones, materiales o acabados) que envían el pedido estructurado directamente a WhatsApp o correo.",
    deliverableSummary: "Catálogo web propio, cotizador dinámico y pedidos listos para fabricar o entregar.",
    icon: <ShoppingBag className="w-5 h-5 text-blue-400" />,
  },
  {
    id: "procesos-manuales",
    badge: "Orden Operativo",
    need: "Tenemos planillas de cálculo dispersas y procesos manuales",
    resolution:
      "Reemplazo planillas desactualizadas y cuadernos por paneles web internos y seguros donde tu equipo carga productos, gestiona estados de pedidos y consulta información en tiempo real.",
    deliverableSummary: "Panel administrativo a medida, base de datos propia y acceso desde cualquier dispositivo.",
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: "sistema-existente",
    badge: "Mantenimiento & Evolución",
    need: "Nuestro sistema actual necesita mejoras, correcciones o nuevas funciones",
    resolution:
      "Si ya contás con una aplicación en producción, te ayudo a mantenerla, corregir errores, modernizar la interfaz y sumar nuevas capacidades sin tener que empezar de cero.",
    deliverableSummary: "Resolución de bugs, refactorización limpia, optimización de velocidad y nuevas funciones.",
    icon: <Wrench className="w-5 h-5 text-amber-400" />,
  },
  {
    id: "conectar-sistemas",
    badge: "Integración de Sistemas",
    need: "Necesitamos conectar plataformas y evitar la doble carga de datos",
    resolution:
      "Desarrollo integraciones seguras entre tus sistemas internos, software de gestión (ERPs), pasarelas de cobro o servicios de terceros para que los datos fluyan de forma automática.",
    deliverableSummary: "Conexión de APIs, sincronización de información y automatización de transferencias de datos.",
    icon: <Network className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: "inteligencia-artificial",
    badge: "Inteligencia Artificial Práctica",
    need: "Queremos incorporar inteligencia artificial sobre nuestros propios datos",
    resolution:
      "Implemento asistentes y herramientas de consulta sobre la documentación o base de datos de tu empresa, permitiendo responder dudas operativas y analizar información de forma segura.",
    deliverableSummary: "Asistentes internos, búsqueda inteligente sobre archivos y respuestas estructuradas.",
    icon: <Bot className="w-5 h-5 text-indigo-400" />,
  },
  {
    id: "tareas-repetitivas",
    badge: "Automatización",
    need: "Perdemos tiempo en tareas repetitivas que se podrían automatizar",
    resolution:
      "Programo procesos automáticos para procesar archivos periódicos, emitir reportes contables, enviar notificaciones o realizar cruces de información sin intervención humana.",
    deliverableSummary: "Tareas programadas, reportes automáticos, alertas de inconsistencias y jobs desatendidos.",
    icon: <Clock className="w-5 h-5 text-sky-400" />,
  },
];

export const ProblemSolutionSection: React.FC = () => {
  return (
    <section id="problemas" className="py-20 sm:py-28 border-b border-[#1E293B]/60 relative">
      <Container>
        {/* Encabezado Editorial */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#60A5FA] font-semibold">
              Casos Reales de Aplicación
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Enfoque centrado en resultados</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] mt-2">
            Qué puedo resolver para tu negocio
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
            No desarrollo páginas genéricas sin propósito comercial. Identificamos el problema operativo concreto que te quita tiempo o dinero y construimos la herramienta exacta para solucionarlo.
          </p>
        </div>

        {/* Grilla limpia de 6 Desafíos y Soluciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {problemsAndSolutions.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#1E293B] bg-[#111827] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-slate-700 hover:bg-[#131B2A] group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B0F17] border border-[#1E293B]">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono-tech text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#60A5FA] transition-colors">
                    &quot;{item.need}&quot;
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">
                    {item.resolution}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#1E293B] text-xs text-slate-400">
                <span className="text-[10px] uppercase font-mono-tech text-slate-500 font-semibold block mb-1">
                  Resultado tangible:
                </span>
                <span className="text-slate-300 font-medium leading-relaxed block">
                  {item.deliverableSummary}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
