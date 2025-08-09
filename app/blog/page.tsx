"use client";

import React, { useEffect, useRef, useState } from "react";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Header } from "@/components/header";
import { Cursor } from "@/components/cursor";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  createdAt: string;
  published: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!loading && posts.length > 0) {
      initAnimations();
    }
  }, [loading, posts]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const initAnimations = () => {
    if (typeof window === "undefined") return;

    // Hero section animation
    if (titleRef.current && subtitleRef.current) {
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 50 });
      
      gsap.timeline()
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.5");
    }

    // Cards animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.blog-card');
      
      gsap.set(cards, { opacity: 0, y: 80, scale: 0.9 });
      
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
          });
        }
      });

      // Hover animations for cards
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(cardElement, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Cursor />
      <Header mode="hamburger" color="Dark" />
      <HeaderNavigation />
      
      <main className="min-h-screen bg-colorLight">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative pt-32 pb-20 px-6 text-center overflow-hidden"
        >
          <div className="max-w-4xl mx-auto">
            <h1 
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold text-colorDark mb-6"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Блог
            </h1>
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-colorSecondaryDark max-w-2xl mx-auto leading-relaxed"
            >
              Последние новости, статьи и инсайты из мира веб-разработки и дизайна
            </p>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-colorSecondaryLight/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-colorSecondaryLight/30 rounded-full blur-3xl"></div>
        </section>

        {/* Blog Posts Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-colorDark"></div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-colorSecondaryDark mb-4">
                  Пока нет публикаций
                </h3>
                <p className="text-colorSecondaryDark">
                  Скоро здесь появятся интересные статьи!
                </p>
              </div>
            ) : (
              <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="blog-card group block"
                  >
                    <article className="bg-white rounded-2xl overflow-hidden shadow-lg border border-colorSecondaryLight/20 h-full transition-all duration-300">
                      {/* Image */}
                      {post.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        {/* Meta info */}
                        <div className="flex items-center justify-between mb-3 text-sm text-colorSecondaryDark">
                          <span>{formatDate(post.createdAt)}</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-colorDark mb-3 line-clamp-2 group-hover:text-colorSecondaryDark transition-colors">
                          {post.title}
                        </h2>

                        {/* Description */}
                        <p className="text-colorSecondaryDark line-clamp-3 mb-4">
                          {post.description}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}