import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechSection } from "@/components/sections/TechSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <SolutionsSection />
      <ServicesSection />
      <ProcessSection />
      <TechSection />
      <ContactSection />
    </>
  );
}
