"use client";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { BlogCard } from '@/components/blog/BlogCard';
import { IBlogPost } from '@/lib/models/BlogPost';

interface BlogGridProps {
  posts: IBlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-colorSecondaryHalfLight to-white py-paddingY px-paddingX">
      <div className="max-w-maxWidth mx-auto">
        <h1
          ref={titleRef}
          className="text-[clamp(48px,_5vw_+_24px,_120px)] font-bold text-colorDark mb-16 opacity-0"
        >
          Наш блог
        </h1>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-colorSecondaryDark mb-4">
              Пока нет постов
            </h2>
            <p className="text-colorSecondaryDark">
              Мы работаем над новым контентом. Скоро здесь появятся интересные статьи!
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post, index) => (
              <BlogCard key={post._id.toString()} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}