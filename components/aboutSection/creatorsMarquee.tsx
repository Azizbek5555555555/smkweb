// creatorsMarquee.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface CreatorsMarqueeProps {}

const creatorsLogos = [
  { name: "Arroziy", src: "/brands/Arroziy-Photoroom.png" },
  { name: "Burger", src: "/brands/burger-Photoroom.png" },
  { name: "Etravel", src: "/brands/Etravel-Photoroom.png" },
  { name: "Gumstar", src: "/brands/Gumstar-Photoroom.png" },
  { name: "Micco", src: "/brands/micco-Photoroom.png" },
  { name: "School", src: "/brands/School-Photoroom.png" },
  { name: "Silkroad", src: "/brands/silkroad-Photoroom.png" },
];

export function CreatorsMarquee({}: CreatorsMarqueeProps): JSX.Element {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;

    const marqueeInner = marqueeInnerRef.current;
    const marqueeContent = marqueeInner.querySelector('.marquee-content') as HTMLElement;
    
    if (!marqueeContent) return;

    // Clone the content for seamless loop
    const clone = marqueeContent.cloneNode(true) as HTMLElement;
    marqueeInner.appendChild(clone);

    // Get the width of the content
    const contentWidth = marqueeContent.offsetWidth;

    // Responsive animation duration based on screen size
    const getAnimationDuration = () => {
      if (window.innerWidth < 768) {
        return 15; // Faster on mobile/small screens
      } else if (window.innerWidth < 1024) {
        return 18; // Medium speed on tablets/small laptops
      } else {
        return 20; // Normal speed on desktop
      }
    };

    // Set up the animation
    const tl = gsap.timeline({ repeat: -1, ease: "none" });
    
    tl.set(marqueeInner, { x: 0 })
      .to(marqueeInner, {
        x: -contentWidth,
        duration: getAnimationDuration(),
        ease: "none"
      });

    // Handle window resize
    const handleResize = () => {
      const newContentWidth = marqueeContent.offsetWidth;
      const newDuration = getAnimationDuration();
      
      tl.kill();
      const newTl = gsap.timeline({ repeat: -1, ease: "none" });
      newTl.set(marqueeInner, { x: 0 })
        .to(marqueeInner, {
          x: -newContentWidth,
          duration: newDuration,
          ease: "none"
        });
    };

    // Pause animation on hover
    const handleMouseEnter = () => {
      tl.pause();
    };

    const handleMouseLeave = () => {
      tl.resume();
    };

    marqueeRef.current.addEventListener('mouseenter', handleMouseEnter);
    marqueeRef.current.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      tl.kill();
      if (marqueeRef.current) {
        marqueeRef.current.removeEventListener('mouseenter', handleMouseEnter);
        marqueeRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden py-4 md:py-6">
      <div className="mb-4 md:mb-6 text-center">
        <h3 className="text-colorSecondaryDark text-sm md:text-lg font-medium">
          Наши клиенты и партнеры
        </h3>
      </div>
      
      <div 
        ref={marqueeRef}
        className="marquee-container relative overflow-hidden cursor-pointer"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
      >
        <div 
          ref={marqueeInnerRef}
          className="marquee-inner flex"
        >
          <div className="marquee-content flex items-center space-x-6 md:space-x-8">
            {creatorsLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-2 md:p-3 bg-colorLight rounded-lg md:rounded-xl shadow-sm border border-colorSecondaryLight/20 hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={64}
                  height={64}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-3 md:mt-4 text-center text-colorSecondaryDark text-xs md:text-sm px-2">
        <p>Доверяют нам и выбирают качественные решения для своего бизнеса</p>
      </div>
    </div>
  );
}
