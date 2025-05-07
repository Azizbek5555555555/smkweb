
// ServicesSection.tsx
import React from "react";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";
import { ServicesWrapper } from "./servicesWrapper";
// import { ServicesWrapper } from "@/components/servicesSection/servicesWrapper";

interface ServicesSectionProps {}

export function ServicesSection({}: ServicesSectionProps): JSX.Element {
  return (
    <section className="section section__3 third lightGradient items-center justify-center px-paddingX pb-10 pt-paddingY text-colorDark">
      <Bulge type="Dark" />
      <Header color="Dark"></Header>
      <ServicesWrapper />
    </section>
  );
}
