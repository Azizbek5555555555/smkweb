import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { isDesktop } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQComponentProps {
  faqData: FAQItem[];
}

export function FAQComponent({ faqData }: FAQComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs arrays
    answerRefs.current = answerRefs.current.slice(0, faqData.length);
    iconRefs.current = iconRefs.current.slice(0, faqData.length);
  }, [faqData.length]);

  const toggleFAQ = (index: number) => {
    const isCurrentlyOpen = openIndex === index;
    const newOpenIndex = isCurrentlyOpen ? null : index;
    
    // Close previous open answer
    if (openIndex !== null && answerRefs.current[openIndex]) {
      gsap.to(answerRefs.current[openIndex], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in"
      });
      
      if (iconRefs.current[openIndex]) {
        gsap.to(iconRefs.current[openIndex], {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }

    // Open new answer if different from current
    if (newOpenIndex !== null && answerRefs.current[newOpenIndex]) {
      gsap.to(answerRefs.current[newOpenIndex], {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      });
      
      if (iconRefs.current[newOpenIndex]) {
        gsap.to(iconRefs.current[newOpenIndex], {
          rotation: 45,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }

    setOpenIndex(newOpenIndex);
  };

  return (
    <div className="faq-container max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-colorDark mb-4">
          Часто задаваемые вопросы
        </h1>
        <p className="text-lg text-colorSecondaryDark max-w-2xl mx-auto">
          Ответы на самые популярные вопросы о наших услугах разработки
        </p>
      </div>

      <div className="faq-list space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="faq-item bg-colorLight border border-colorSecondaryLight/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div
              className="faq-question-header p-6 cursor-pointer flex items-center justify-between hover:bg-colorSecondaryHalfLight/10 transition-colors duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg md:text-xl font-semibold text-colorDark pr-4 flex-1">
                {item.question}
              </h3>
              <div
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className="faq-icon w-8 h-8 flex items-center justify-center bg-colorDark text-colorLight rounded-full text-lg font-bold transition-transform duration-300"
                style={{ transform: "rotate(0deg)" }}
              >
                +
              </div>
            </div>
            
            <div
              ref={(el) => {
                answerRefs.current[index] = el;
              }}
              className="faq-answer overflow-hidden"
              style={{ height: 0, opacity: 0 }}
            >
              <div className="p-6 pt-0 border-t border-colorSecondaryLight/10">
                <p className="text-colorSecondaryDark leading-relaxed text-base md:text-lg">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-colorSecondaryDark mb-6">
          Не нашли ответ на свой вопрос?
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-colorDark text-colorLight rounded-full font-semibold hover:bg-colorSecondaryDark transition-colors duration-300"
        >
          Свяжитесь с нами
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
