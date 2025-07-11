// serviceCard.tsx
import React, { useRef, useEffect } from "react";
import Magentic from "../ui/magentic";
import { gsap } from "gsap";
import { isDesktop } from "@/lib/utils";

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: string;
  };
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isDesktop() && cardRef.current) {
      const card = cardRef.current;
      
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.3,
          ease: "power2.out",
        });
      };
      
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
      
      // Cleanup event listeners
      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      className="service-card group overflow-hidden rounded-2xl bg-colorSecondaryHalfLight transition-all duration-300 relative h-full min-h-[220px] flex flex-col"
    >
      <Magentic
        className="p-4 h-full flex flex-col flex-grow"
        scrambleParams={{
          text: service.title,
        }}
        strength={30}
      >
        <div className="w-12 h-12 mb-4 text-colorDark flex-shrink-0">
          <div className="w-full h-full rounded-full bg-colorSecondaryHalfDark flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300">
            <img src={service.icon} alt={service.title} className="w-full h-full object-contain" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-black flex-shrink-0">
          {service.title}
        </h3>
        
        <p className="text-colorSecondaryDark text-[0.85rem] md:text-[0.9rem] flex-grow leading-relaxed">
          {service.description}
        </p>
        
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-colorDark group-hover:w-full transition-all duration-500"></div>
      </Magentic>
    </div>
  );
}

export default ServiceCard;