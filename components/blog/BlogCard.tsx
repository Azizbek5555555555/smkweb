"use client";
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { IBlogPost } from '@/lib/models/BlogPost';

interface BlogCardProps {
  post: IBlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [index]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div ref={cardRef} className="opacity-0">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
          <div className="relative overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-colorPrimary bg-colorPrimary/10 px-3 py-1 rounded-full">
                Блог
              </span>
              <span className="text-sm text-colorSecondaryDark">
                {formatDate(post.createdAt)}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-colorDark mb-3 line-clamp-2 group-hover:text-colorPrimary transition-colors duration-300">
              {post.title}
            </h3>
            
            <p className="text-colorSecondaryDark line-clamp-3 mb-4">
              {post.description}
            </p>
            
            <div className="flex items-center text-colorPrimary font-medium">
              <span className="group-hover:mr-2 transition-all duration-300">
                Читать далее
              </span>
              <svg
                className="w-4 h-4 ml-1 group-hover:ml-3 transition-all duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}