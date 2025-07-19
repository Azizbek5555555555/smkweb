"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Header } from '@/components/header';
import { HeaderNavigation } from '@/components/headerNavigation';
import { Cursor } from '@/components/cursor';
import { IBlogPost } from '@/lib/models/BlogPost';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Пост не найден');
          }
          throw new Error('Ошибка загрузки поста');
        }
        const data = await response.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    if (post && !loading) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      )
      .fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }
  }, [post, loading]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-colorSecondaryHalfLight to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-colorPrimary mx-auto mb-4"></div>
          <p className="text-colorSecondaryDark">Загружаем пост...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <>
        <Cursor />
        <Header color="Dark" />
        <HeaderNavigation />
        <main className="min-h-screen bg-gradient-to-br from-colorSecondaryHalfLight to-white flex items-center justify-center px-paddingX">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-colorDark mb-4">
              {error || 'Пост не найден'}
            </h1>
            <p className="text-colorSecondaryDark mb-8">
              Возможно, пост был удален или URL указан неверно
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-colorPrimary text-white rounded-xl font-medium hover:bg-opacity-90 transition-all duration-300"
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
      <Header color="Dark" />
      <HeaderNavigation />
      <main className="min-h-screen bg-gradient-to-br from-colorSecondaryHalfLight to-white">
        <article className="max-w-4xl mx-auto px-paddingX py-paddingY">
          {/* Back to blog link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-colorPrimary hover:text-colorSecondaryDark transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Назад к блогу
            </Link>
          </div>

          {/* Article header */}
          <header className="mb-12">
            <h1
              ref={titleRef}
              className="text-[clamp(36px,_4vw_+_16px,_64px)] font-bold text-colorDark mb-6 opacity-0"
            >
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-colorSecondaryDark mb-8">
              <span className="text-sm font-medium text-colorPrimary bg-colorPrimary/10 px-3 py-1 rounded-full">
                Блог
              </span>
              <span>{formatDate(post.createdAt)}</span>
            </div>

            <p className="text-xl text-colorSecondaryDark leading-relaxed">
              {post.description}
            </p>
          </header>

          {/* Featured image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              ref={imageRef}
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover opacity-0"
            />
          </div>

          {/* Article content */}
          <div
            ref={contentRef}
            className="prose prose-lg max-w-none opacity-0"
            style={{
              color: 'var(--colorDark)',
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-colorDark leading-relaxed"
            />
          </div>
        </article>
      </main>
    </>
  );
}