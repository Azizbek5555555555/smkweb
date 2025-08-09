import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { isDesktop } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  item: FAQItem;
  index: number;
  length: number;
  color: "Light" | "Dark";
}

export function FAQSection({ item, index, length, color }: FAQSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current) {
      if (isOpen) {
        gsap.to(answerRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        });
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in"
        });
      }
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: isOpen ? 45 : 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isOpen]);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (isDesktop() && questionRef.current) {
      gsap.to(questionRef.current, {
        x: 10,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop() && questionRef.current) {
      gsap.to(questionRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="section">
      <div className={`work work${color}`}>
        <div className="work__content">
          <div className="work__left">
            <div className="work__number">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="work__total">/{String(length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="work__center">
            <div 
              ref={questionRef}
              className="faq-question-container"
              onClick={toggleFAQ}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer" }}
            >
              <div className="work__title faq-question">
                <h2 className="mask">
                  {item.question}
                </h2>
              </div>
              
              <div 
                ref={iconRef}
                className="faq-icon"
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: color === "Light" ? "#0e0d0c" : "#fff",
                  marginLeft: "1rem",
                  transform: "rotate(0deg)"
                }}
              >
                +
              </div>
            </div>

            <div 
              ref={answerRef}
              className="faq-answer"
              style={{
                height: 0,
                opacity: 0,
                overflow: "hidden",
                marginTop: "2rem"
              }}
            >
              <p 
                className="work__description"
                style={{
                  color: color === "Light" ? "#404040" : "#bfbfbf",
                  lineHeight: "1.6",
                  fontSize: "clamp(16px, 1.2vw, 20px)",
                  maxWidth: "800px"
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>

          <div className="work__right">
            <div className="work__year">
              FAQ
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-question-container {
          display: flex;
          align-items: center;
          width: 100%;
          transition: all 0.3s ease;
        }

        .faq-question {
          flex: 1;
        }

        .faq-icon {
          transition: all 0.3s ease;
          user-select: none;
        }

        .faq-answer {
          width: 100%;
        }

        @media (max-width: 768px) {
          .faq-question-container {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .faq-icon {
            margin-left: 0 !important;
            margin-top: 1rem;
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
