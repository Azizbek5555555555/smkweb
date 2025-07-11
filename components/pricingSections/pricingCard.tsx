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
      className={`pricing-card relative overflow-hidden rounded-2xl transition-all duration-300 bg-colorSecondaryHalfLight text-colorDark border-2 w-full min-w-0 max-w-full ${
        item.popular ? "border-colorDark" : "border-transparent"
      }`}
    >
      {item.popular && (
        <div className="absolute top-0 right-0 bg-colorDark text-white text-xs font-bold py-1 px-3 rounded-bl-lg z-10">
          Популярный
        </div>
      )}
      
      <Magentic
        className="p-4 md:p-6 flex flex-col h-full min-h-[400px] md:min-h-[450px]"
        scrambleParams={{
          text: item.title,
        }}
        strength={30}
      >
        <h3 className="text-lg md:text-xl font-semibold mb-3 scrambleText text-black leading-tight">
          {item.title}
        </h3>
              
        {item.price ? (
          <div className="mb-4">
            <span className="text-2xl md:text-3xl font-bold text-black">{item.price}</span>
            <span className="text-xs md:text-sm opacity-70 text-black"> / проект</span>
          </div>
        ) : (
          <div className="mb-4">
            <span className="text-sm md:text-base font-medium text-black">Индивидуальная цена</span>
          </div>
        )}
        
        <ul className="mb-6 flex-grow space-y-2">
          {item.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <svg 
                className={`w-4 h-4 md:w-5 md:h-5 mr-2 mt-0.5 flex-shrink-0 ${item.popular ? "text-colorDark" : "text-colorDark"}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className={`text-xs md:text-sm leading-relaxed ${item.popular ? "text-colorSecondaryDark" : "text-colorSecondaryDark"}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        
        <button 
          onClick={onContactClick}
          className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 w-full text-sm md:text-base ${
            item.popular 
              ? "bg-colorDark text-white hover:bg-colorSecondaryDark" 
              : "bg-colorDark text-colorLight hover:bg-colorSecondaryDark"
          }`}
        >
          {item.buttonText}
        </button>
      </Magentic>
    </div>
  );
}