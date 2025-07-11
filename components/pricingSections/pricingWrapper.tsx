// pricingWrapper.tsx
import React, { useEffect, useState, useRef } from "react";
import Magentic from "../ui/magentic";
import { gsap } from "gsap";
import { isDesktop } from "@/lib/utils";
import { PricingCard } from "./pricingCard";
import { ContactForm } from "./contactForm";

interface PricingWrapperProps {}

interface TextState {
  main: string;
  para: string;
}

interface PricingItem {
  title: string;
  price: string | null;
  features: string[];
  buttonText: string;
  showContactForm?: boolean;
  popular?: boolean;
}

export function PricingWrapper({}: PricingWrapperProps): JSX.Element {
  const [text, setText] = useState<TextState>({
    main: "Наши Тарифы",
    para: `Мы предлагаем прозрачные цены на наши услуги, чтобы вы могли выбрать оптимальное решение для вашего бизнеса.`,
  });
  
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>('');
  
  const pricingItems: PricingItem[] = [
    {
      title: "Лендинг",
      price: "199$",
      features: [
        "Современный дизайн",
        "Адаптивная вёрстка",
        "1 год хостинга",
        "Бесплатный домен",
        "SEO оптимизация"
      ],
      buttonText: "Заказать",
    },
    {
      title: "Стандартный Сайт",
      price: "450$",
      features: [
        "Современный дизайн",
        "Адаптивная вёрстка",
        "1 год хостинга",
        "Бесплатный домен",
        "SEO оптимизация",
        "Базовый функционал",
        "Техническая поддержка"
      ],
      buttonText: "Заказать",
      popular: true
    },
    {
      title: "3D Сайт",
      price: "599$",
      features: [
        "Всё из стандартного",
        "3D анимации",
        "Интерактивные элементы",
        "Премиум дизайн",
        "Улучшенная SEO оптимизация",
        "Расширенная поддержка"
      ],
      buttonText: "Заказать"
    },
    {
      title: "Веб-Приложение",
      price: "699$",
      features: [
        "Сложный бэкенд",
        "Структурированная база данных",
        "Админ-панель",
        "API интеграции",
        "Защита данных",
        "Масштабируемость"
      ],
      buttonText: "Заказать"
    },
    {
      title: "Мобиль Приложение",
      price: null,
      features: [
        "iOS и Android",
        "Нативная разработка",
        "Серверная интеграция",
        "Публикация в магазинах",
        "Техническая поддержка",
        "Индивидуальное решение"
      ],
      buttonText: "Связаться",
      showContactForm: true
    }
  ];
  
  const pricingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isDesktop()) {
      setText({
        main: "Тарифы",
        para: `Прозрачные цены для вашего бизнеса.`,
      });
    }
    
    // GSAP animation for pricing cards
    if (pricingRef.current) {
      gsap.from(".pricing-card", {
        y: 50,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 80%",
        }
      });
    }
  }, []);

  // Function to handle the contact form popup
  const handleContactClick = (type: string) => {
    setFormType(type);
    setShowContactForm(true);
    
    // Animate the form appearance
    gsap.fromTo(".contact-form-overlay", 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    
    gsap.fromTo(".contact-form", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  };
  
  // Function to close the contact form
  const closeContactForm = () => {
    gsap.to(".contact-form-overlay", { 
      opacity: 0, 
      duration: 0.3, 
      ease: "power2.in",
      onComplete: () => setShowContactForm(false)
    });
  };

  return (
    <main className="flex w-full max-w-maxWidth grow flex-col justify-center text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]">
      <div className="anime relative flex flex-col gap-[1em] md:flex-row-reverse md:gap-[2em]">
        <p
          className="text-left leading-[1.3] text-colorSecondaryDark md:w-[100%]"
        >
          {text.para}
        </p>
        <Magentic
          scrambleParams={{
            text: "Получить Консультацию",
          }}
          onMouseEnter={() => {
            if (isDesktop()) {
              gsap.to("body", {
                "--colorLight": "#0e0d0c",
                "--colorDark": "#fff",
                "--colorSecondaryDark": "#bfbfbf",
                "--colorSecondaryLight": "#404040",
                "--colorSecondaryHalfLight": "#1a1a1a",
                "--colorSecondaryHalfDark": "#f2f2f2",
                "--colorWhite": "#000",
              });
            }
          }}
          onMouseLeave={() => {
            if (isDesktop()) {
              gsap.to("body", {
                "--colorLight": "#fff",
                "--colorDark": "#0e0d0c",
                "--colorSecondaryDark": "#404040",
                "--colorSecondaryLight": "#bfbfbf",
                "--colorSecondaryHalfLight": "#f2f2f2",
                "--colorSecondaryHalfDark": "#1a1a1a",
                "--colorWhite": "#fff",
              });
            }
          }}
          className="mask group h-full items-center justify-center rounded-2xl bg-colorDark p-3 md:relative md:min-h-full md:w-[33%] md:rounded-full"
        >
          <p className="shapka !flex text-[0.9em] text-colorLight md:text-[0.7em]">
            <span className="scrambleText whitespace-nowrap">
              Получить Консультацию
            </span>
            <svg
              className="ml-4 w-[0.7em] -rotate-45 text-colorLight"
              viewBox="0 0 14 14"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>arrow-up-right</title>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="2.5"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Artboard"
                  transform="translate(-1019.000000, -279.000000)"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <g
                    id="arrow-up-right"
                    transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)"
                  >
                    <polyline
                      id="Path"
                      points="2.76923077 0 12 0 12 9.23076923"
                    ></polyline>
                    <line x1="12" y1="0" x2="0" y2="12" id="Path"></line>
                  </g>
                </g>
              </g>
            </svg>
          </p>
        </Magentic>
      </div>
      
      <div className="customBorder anime mx-auto my-[1.5em] h-[2px] w-[calc(100%_-_20px)] self-start rounded-full bg-colorSecondaryLight opacity-30"></div>

      <div className="anime relative w-full">
        <div className="flex flex-col items-center justify-center mb-[3rem]">
          <div className="anime">
            <h2 className="pricing_heading mask text-center text-[2.5rem] md:text-[3.5rem] font-bold">{text.main}</h2>
          </div>
        </div>
        
        {/* Pricing grid with improved responsive design and better card sizing */}
        <div ref={pricingRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 w-full max-w-[1500px] mx-auto">
          {pricingItems.map((item, index) => (
            <PricingCard 
              key={index} 
              item={item} 
              index={index} 
              onContactClick={() => item.showContactForm && handleContactClick(item.title)}
            />
          ))}
        </div>
        
        {/* Pricing note */}
        <div className="mt-8 mb-16 text-center text-colorSecondaryDark text-sm px-4">
          <p>* Цены указаны в качестве отправной точки и могут варьироваться в зависимости от сложности проекта</p>
        </div>
      </div>
      
      {/* Contact Form Overlay */}
      {showContactForm && (
        <div className="contact-form-overlay fixed inset-0 bg-colorDark bg-opacity-70 flex items-center justify-center z-50" onClick={closeContactForm}>
          <div className="contact-form bg-colorLight p-8 rounded-xl max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <ContactForm formType={formType} onClose={closeContactForm} />
          </div>
        </div>
      )}
    </main>
  );
}