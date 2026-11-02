import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechSection } from "@/components/sections/TechSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <TechSection />
      <ContactSection />
    </>
  );
}
