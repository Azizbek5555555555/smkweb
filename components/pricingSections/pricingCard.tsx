// pricingCard.tsx
import React, { useRef, useEffect } from "react";
import Magentic from "../ui/magentic";
import { gsap } from "gsap";
import { isDesktop } from "@/lib/utils";

interface PricingCardProps {
  item: {
    title: string;
    price: string | null;
    features: string[];
    buttonText: string;
    showContactForm?: boolean;
    popular?: boolean;
  };
  index: number;
  onContactClick?: () => void;
}

export function PricingCard({ item, index, onContactClick }: PricingCardProps): JSX.Element {
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
      className={`pricing-card relative overflow-hidden rounded-2xl transition-all duration-300 ${
        item.popular 
          ? "bg-colorDark text-colorLight border-2 border-colorLight" 
          : "bg-colorSecondaryHalfLight text-colorDark"
      }`}
    >
      {item.popular && (
        <div className="absolute top-0 right-0 bg-colorLight text-colorDark text-xs font-bold py-1 px-3 rounded-bl-lg">
          Популярный
        </div>
      )}
      
      <Magentic
        className="p-6 flex flex-col h-full"
        scrambleParams={{
          text: item.title,
        }}
        strength={30}
      >
        <h3 className="text-[1.3rem] md:text-[1.5rem] font-semibold mb-3 scrambleText">
          {item.title}
        </h3>
        
        {item.price ? (
          <div className="mb-4">
            <span className="text-[2rem] font-bold">{item.price}</span>
            <span className="text-sm opacity-70"> / проект</span>
          </div>
        ) : (
          <div className="mb-4">
            <span className="text-lg font-medium">Индивидуальная цена</span>
          </div>
        )}
        
        <ul className="mb-6 flex-grow">
          {item.features.map((feature, idx) => (
            <li key={idx} className="flex items-start mb-2">
              <svg 
                className={`w-5 h-5 mr-2 mt-0.5 ${item.popular ? "text-colorLight" : "text-colorDark"}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className={`text-sm ${item.popular ? "text-colorSecondaryHalfDark" : "text-colorSecondaryDark"}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        
        <button 
          onClick={onContactClick}
          className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            item.popular 
              ? "bg-colorLight text-colorDark hover:bg-colorSecondaryHalfDark" 
              : "bg-colorDark text-colorLight hover:bg-colorSecondaryDark"
          }`}
        >
          {item.buttonText}
        </button>
      </Magentic>
    </div>
  );
}