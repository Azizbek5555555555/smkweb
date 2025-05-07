import React from "react";
import { WorkSection } from "@/components/workSection/workSection";
import { HeroSection } from "@/components/heroSection/heroSection";
import { AboutSection } from "@/components/aboutSection/aboutSection";
import { ContactSection } from "@/components/contactSection/contactSection";
import ProjectCard from "./aboutSection/projectCard";
import { ServicesSection } from "./servicesSection/servicesSection";
import { PricingSection } from "./pricingSections/pricingSection";

export function Main() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection/>
      <PricingSection/>
      {/* <WorkSection /> */}
      <ContactSection />
    </>
  );
}
