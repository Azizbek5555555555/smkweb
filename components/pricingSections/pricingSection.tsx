// PricingSection.tsx
import React from "react";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";
import { PricingWrapper } from "./pricingWrapper";
// import { PricingWrapper } from "@/components/pricingSection/pricingWrapper";

interface PricingSectionProps {}

export function PricingSection({}: PricingSectionProps): JSX.Element {
  return (
    <section className="section section__4 fourth lightGradient items-center justify-center px-paddingX pb-10 pt-paddingY text-colorDark">
      <Bulge type="Dark" />
      <Header color="Dark"></Header>
      <PricingWrapper />
    </section>
  );
}