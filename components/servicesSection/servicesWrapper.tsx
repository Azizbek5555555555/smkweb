// servicesWrapper.tsx
import React, { useEffect, useState, useRef } from "react";
import Magentic from "../ui/magentic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isDesktop } from "@/lib/utils";
import ServiceCard from "./serviceCard";
import styles from './servicesWrapper.module.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Register ScrambleTextPlugin if available
if (typeof window !== "undefined" && "ScrambleTextPlugin" in gsap) {
  gsap.registerPlugin((gsap as any).ScrambleTextPlugin);
}

interface ServicesWrapperProps {}

interface TextState {
  main: string;
  para: string;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export function ServicesWrapper({}: ServicesWrapperProps): JSX.Element {
  const [text, setText] = useState<TextState>({
    main: "Наши Услуги",
    para: `Предоставляем передовые веб-решения для бизнеса любого масштаба, сочетая креативный дизайн с инновационными технологиями.`,
  });
  
  const services: ServiceItem[] = [
    {
      title: "Премиум Веб-сайты",
      description: "Создаем эксклюзивные веб-сайты с безупречным дизайном, адаптированные под все устройства.",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/internet.png"
    },
    {
      title: "3D Веб-сайты",
      description: "Разрабатываем интерактивные 3D веб-сайты, которые запоминаются и выделяют ваш бренд.",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/3d.png"
    },
    {
      title: "Веб-приложения",
      description: "Создаем масштабируемые веб-приложения с интуитивным интерфейсом и высокой производительностью.",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/web.png"
    },
    {
      title: "Мобильные приложения",
      description: "Разрабатываем нативные и кроссплатформенные мобильные приложения для iOS и Android.",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/smartphone-tablet.png"
    },
    {
      title: "CRM для школ",
      description: "Внедряем специализированные CRM-системы для управления образовательным процессом.",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/school.png"
    },
    {
      title: "CRM для бухгалтерии",
      description: "Разрабатываем CRM-системы для автоматизации бухгалтерского учета и финансовой отчетности.",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/accounting.png"
    },
    {
      title: "Telegram боты",
      description: "Создаем умных Telegram ботов для автоматизации бизнес-процессов и коммуникации с клиентами.",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/telegram-app.png"
    },
    {
      title: "SEO оптимизация",
      description: "Повышаем видимость вашего сайта в поисковых системах с помощью комплексной SEO-оптимизации.",
      icon: "https://img.icons8.com/ios-filled/50/ffffff/star--v1.png"
    }
  ];
  
  const servicesRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isDesktop()) {
      setText({
        main: "Услуги",
        para: `Разрабатываем современные веб-решения с использованием передовых технологий.`,
      });
    }
    
    // GSAP animation for services
    if (servicesRef.current && headingRef.current) {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Get all service cards within the services container
      const serviceCards = servicesRef.current.querySelectorAll(".service-card");
      
      // Set initial state for service cards
      gsap.set(serviceCards, {
        y: 50,
        opacity: 0,
        scale: 0.9,
      });

      // Create ScrollTrigger for service cards animation
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.to(serviceCards, {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(serviceCards, {
            y: 50,
            opacity: 0,
            scale: 0.9,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.in",
          });
        },
        onEnterBack: () => {
          gsap.to(serviceCards, {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(serviceCards, {
            y: 50,
            opacity: 0,
            scale: 0.9,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.in",
          });
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main 
      ref={containerRef}
      className="flex h-full w-full max-w-maxWidth grow flex-col justify-center text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)] pb-16 md:pb-20"
    >
      <div className="anime relative flex flex-col gap-[1em] md:flex-row-reverse md:gap-[2em]">
        <p
          className="text-left leading-[1.3] text-colorSecondaryDark md:w-[100%]"
        >
          {text.para}
        </p>
        <Magentic
          scrambleParams={{
            text: "Связаться с нами",
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
              Связаться с нами
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

      <div className="anime relative w-full min-h-fit mb-8">
        <div className="flex flex-col items-center justify-center mb-[2.5rem]">
          <div className="anime">
            <div className="relative flex items-center justify-center">
                <h2
                  ref={headingRef}
                  className="services_heading mask text-center text-[2.5rem] md:text-[3.5rem] font-bold"
                >
                  {text.main}
                </h2>
              </div>
          </div>
        </div>
        
        <div 
          ref={servicesRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-fit pb-8 -mt-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}