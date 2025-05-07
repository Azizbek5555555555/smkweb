// Create a file called serviceCard.tsx

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
      // Create hover animation
      const card = cardRef.current;
      
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      
      // Cleanup event listeners
      return () => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      };
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      className="service-card group overflow-hidden rounded-2xl bg-colorSecondaryHalfLight transition-all duration-300 relative"
    >
      <Magentic
        className="p-6 h-full flex flex-col"
        scrambleParams={{
          text: service.title,
        }}
        strength={30}
      >
        <div className="w-14 h-14 mb-5 text-colorDark">
          <div className="w-full h-full rounded-full bg-colorSecondaryHalfDark flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
            <img src={service.icon} alt={service.title} className="w-full h-full object-contain" />
          </div>
        </div>
        
        <h3 className="text-[1.3rem] md:text-[1.5rem] font-semibold mb-3 scrambleText group-hover:text-colorDark transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-colorSecondaryDark text-[0.9rem] md:text-[1rem] flex-grow">
          {service.description}
        </p>
        
        {/* <div className="mt-4 flex items-center text-[0.9rem] font-medium text-colorDark opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="mr-2">Подробнее</span>
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transform -rotate-45"
          >
            <path 
              d="M1 13L13 1M13 1H1M13 1V13" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div> */}
        
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-colorDark group-hover:w-full transition-all duration-500"></div>
      </Magentic>
    </div>
  );
}

export default ServiceCard;