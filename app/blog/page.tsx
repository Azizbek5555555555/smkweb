"use client";
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { HeaderNavigation } from '@/components/headerNavigation';
import { Cursor } from '@/components/cursor';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { IBlogPost } from '@/lib/models/BlogPost';

export default function BlogPage() {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog?published=true');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-colorSecondaryHalfLight to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-colorPrimary mx-auto mb-4"></div>
          <p className="text-colorSecondaryDark">Загружаем блог...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-colorSecondaryHalfLight to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-colorDark mb-4">
            Ошибка загрузки
          </h2>
          <p className="text-colorSecondaryDark">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Cursor />
      <Header color="Dark" />
      <HeaderNavigation />
      <main>
        <BlogGrid posts={posts} />
      </main>
    </>
  );
}