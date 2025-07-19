"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPostForm } from '@/components/admin/BlogPostForm';
import { IBlogPost } from '@/lib/models/BlogPost';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<IBlogPost | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog?published=false');
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (formData: FormData) => {
    setFormLoading(true);
    try {
      // For now, we'll handle image as URL since we don't have file upload setup
      const imageUrl = formData.get('image') as string;
      
      const postData = {
        title: formData.get('title'),
        description: formData.get('description'),
        content: formData.get('content'),
        image: imageUrl || '/placeholder-image.jpg',
        published: formData.get('published') === 'true',
      };

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      await fetchPosts();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditPost = async (formData: FormData) => {
    if (!editingPost) return;
    
    setFormLoading(true);
    try {
      const imageUrl = formData.get('image') as string;
      
      const postData = {
        title: formData.get('title'),
        description: formData.get('description'),
        content: formData.get('content'),
        image: imageUrl || editingPost.image,
        published: formData.get('published') === 'true',
      };

      const response = await fetch(`/api/blog/${editingPost.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      await fetchPosts();
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот пост?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-colorPrimary mx-auto mb-4"></div>
          <p className="text-colorSecondaryDark">Загружаем панель...</p>
        </div>
      </div>
    );
  }

  if (showForm || editingPost) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-colorDark mb-8">
              {editingPost ? 'Редактировать пост' : 'Создать новый пост'}
            </h1>
            
            <BlogPostForm
              post={editingPost || undefined}
              onSubmit={editingPost ? handleEditPost : handleCreatePost}
              onCancel={() => {
                setShowForm(false);
                setEditingPost(null);
              }}
              loading={formLoading}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-colorDark">
                Админ панель
              </h1>
              <p className="text-colorSecondaryDark">
                Управление блогом SMKWeb
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="text-colorPrimary hover:text-colorSecondaryDark transition-colors"
              >
                Посмотреть блог
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-colorSecondaryDark hover:text-colorDark transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-colorPrimary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
          >
            Создать новый пост
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-colorDark">
              Все посты ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-colorSecondaryDark">
                Пока нет постов. Создайте первый пост!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Пост
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post._id.toString()} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-colorDark">
                              {post.title}
                            </div>
                            <div className="text-sm text-colorSecondaryDark">
                              {post.description.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.published ? 'Опубликован' : 'Черновик'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-colorSecondaryDark">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingPost(post)}
                            className="text-colorPrimary hover:text-colorSecondaryDark"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.slug)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}