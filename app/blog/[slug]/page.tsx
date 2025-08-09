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
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  useEffect(() => {
    if (!loading && post) {
      initAnimations();
    }
  }, [loading, post]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${params.slug}`);
      if (!response.ok) {
        setPost(null);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setPost(null);
      setLoading(false);
    }
  };

  const initAnimations = () => {
    if (typeof window === "undefined") return;

    // Hero animation
    if (imageRef.current && titleRef.current) {
      gsap.set([imageRef.current, titleRef.current], { opacity: 0, y: 50 });
      
      gsap.timeline()
        .to(imageRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8");
    }

    // Content animation
    if (contentRef.current) {
      const contentElements = contentRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote');
      
      gsap.set(contentElements, { opacity: 0, y: 30 });
      
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(contentElements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          });
        }
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

  if (loading) {
    return (
      <>
        <Cursor />
        <HeaderNavigation />
        <main className="min-h-screen bg-colorLight flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-colorDark"></div>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Cursor />
        <HeaderNavigation />
        <main className="min-h-screen bg-colorLight flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-colorDark mb-4">
              Пост не найден
            </h1>
            <p className="text-colorSecondaryDark mb-8">
              Извините, запрашиваемая статья не существует или была удалена.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-colorDark text-colorLight px-6 py-3 rounded-lg font-semibold hover:bg-colorSecondaryDark transition-colors"
            >
              Вернуться к блогу
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Cursor />
      <Header mode="hamburger" color="Dark" />
      <HeaderNavigation />
      
      <main className="min-h-screen bg-colorLight">
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-16">
          {/* Back Button */}
          <div className="max-w-4xl mx-auto px-6 mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-colorSecondaryDark hover:text-colorDark transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад к блогу
            </Link>
          </div>

          {/* Image */}
          {post.image && (
            <div className="max-w-4xl mx-auto px-6 mb-8">
              <img
                ref={imageRef}
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          )}

          {/* Title & Meta */}
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              {/* Meta info */}
              <div className="flex items-center justify-center gap-6 text-colorSecondaryDark mb-6">
                <span>{formatDate(post.createdAt)}</span>
              </div>

              {/* Title */}
              <h1
                ref={titleRef}
                className="text-4xl md:text-6xl font-bold text-colorDark mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-colorSecondaryDark max-w-2xl mx-auto leading-relaxed">
                {post.description}
              </p>
            </div>
          </div>
        </section>

        {/* Back to Blog CTA */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-colorSecondaryLight/20">
              <h3 className="text-2xl font-bold text-colorDark mb-4">
                Читайте больше статей
              </h3>
              <p className="text-colorSecondaryDark mb-6">
                Ознакомьтесь с другими интересными материалами в нашем блоге
              </p>
              <Link
                href="/blog"
                className="inline-block bg-colorDark text-colorLight px-8 py-3 rounded-lg font-semibold hover:bg-colorSecondaryDark transition-colors"
              >
                Все статьи
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}