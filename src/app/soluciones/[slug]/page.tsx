import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PORTFOLIO_SOLUTIONS, getSolutionBySlug } from "@/data/solutions/catalog";
import { businessData } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { SolutionHero } from "@/components/solutions/SolutionHero";
import { SolutionWorkflow } from "@/components/solutions/SolutionWorkflow";
import { SolutionMockup } from "@/components/solutions/SolutionMockup";
import { SolutionBenefits } from "@/components/solutions/SolutionBenefits";
import { SolutionCustomization } from "@/components/solutions/SolutionCustomization";
import { SolutionDisclaimer } from "@/components/solutions/SolutionDisclaimer";
import { SolutionCTA } from "@/components/solutions/SolutionCTA";
import { SolutionViewTracker } from "@/components/solutions/SolutionViewTracker";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_SOLUTIONS.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const solution = getSolutionBySlug(resolvedParams.slug);

  if (!solution) {
    return {
      title: "Solución no encontrada | Valentín Sznitowski",
    };
  }

  const url = `${businessData.urls.portfolio}/soluciones/${solution.slug}`;

  return {
    title: `${solution.name} — ${solution.tagline} | Valentín Sznitowski`,
    description: solution.subheadline,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${solution.name} — Solución de Software para Negocios`,
      description: solution.subheadline,
      url,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const resolvedParams = await params;
  const solution = getSolutionBySlug(resolvedParams.slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="py-20 sm:py-28 min-h-screen">
      <SolutionViewTracker solutionSlug={solution.slug} />
      <Container>
        <div className="space-y-16 max-w-5xl mx-auto">
          {/* 1. Hero */}
          <SolutionHero solution={solution} />

          {/* 2. Problem & Solution Concept */}
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem */}
              <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/25 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>El Problema Operativo</span>
                </div>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {solution.problem.statement}
                </p>
                <div className="space-y-2 pt-2 border-t border-rose-500/20">
                  <span className="text-[10px] font-mono-tech uppercase text-rose-300 font-bold block">
                    Fricciones habituales:
                  </span>
                  <ul className="space-y-1.5 text-xs text-rose-200/90">
                    {solution.problem.painPoints.map((pp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{pp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Solution Concept */}
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cómo lo resolvemos</span>
                </div>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {solution.solutionConcept.summary}
                </p>
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed">
                  <strong className="block text-[10px] font-mono-tech text-emerald-400 uppercase mb-0.5">
                    Diferenciador para tu empresa:
                  </strong>
                  {solution.solutionConcept.differentiator}
                </div>
              </div>
            </div>
          </section>

          {/* 3. How it would work (Visual Workflow) */}
          <section id="flujo-y-mockup">
            <SolutionWorkflow workflow={solution.workflow} accentColor={solution.accentColor} />
          </section>

          {/* 4. Main benefits */}
          <section>
            <SolutionBenefits benefits={solution.benefits} accentColor={solution.accentColor} />
          </section>

          {/* 5. Interactive concept/demo */}
          <section>
            <SolutionMockup solution={solution} />
          </section>

          {/* 6. Adaptation options */}
          <section>
            <SolutionCustomization
              options={solution.customizationOptions}
              techStack={solution.techStack}
              accentColor={solution.accentColor}
            />
          </section>

          {/* Transparency Disclaimer */}
          <section>
            <SolutionDisclaimer />
          </section>

          {/* 7. CTA */}
          <section>
            <SolutionCTA solution={solution} />
          </section>
        </div>
      </Container>
    </div>
  );
}
