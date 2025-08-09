"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  published: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    published: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog?all=true');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    const token = localStorage.getItem('adminToken');
    if (!token) return null;

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (response.ok) {
        return data.imageUrl;
      } else {
        alert(data.error || 'Ошибка загрузки изображения');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Ошибка загрузки изображения');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    setUploading(true);

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (imageFile) {
        console.log('Uploading image:', imageFile.name);
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
          console.log('Image uploaded successfully:', imageUrl);
        } else {
          console.log('Image upload failed, continuing without image');
          imageUrl = formData.image || '';
        }
      }

      const postData = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
        published: formData.published
      };

      console.log('Sending post data:', postData);

      const url = editingPost ? `/api/admin/blog/${editingPost._id}` : '/api/admin/blog';
      const method = editingPost ? 'PUT' : 'POST';
      
      console.log('Making request to:', url, 'with method:', method);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Success response:', result);
        setShowForm(false);
        setEditingPost(null);
        setImageFile(null);
        setFormData({
          title: "",
          description: "",
          image: "",
          published: false,
        });
        fetchPosts();
        alert('Post успешно сохранен!');
      } else {
        const error = await response.json();
        console.error('Error response:', error);
        alert(error.error || 'Ошибка сохранения');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Ошибка сохранения: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      image: post.image,
      published: post.published,
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту статью?')) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchPosts();
      } else {
        alert('Ошибка удаления');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Ошибка удаления');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-colorLight flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-colorDark"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-colorLight">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-colorSecondaryLight/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-colorDark">
              Админ-панель блога
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingPost(null);
                  setImageFile(null);
                  setFormData({
                    title: "",
                    description: "",
                    image: "",
                    published: false,
                  });
                }}
                className="bg-colorDark text-colorLight px-4 py-2 rounded-lg font-medium hover:bg-colorSecondaryDark transition-colors"
              >
                Добавить статью
              </button>
              <button
                onClick={handleLogout}
                className="text-colorSecondaryDark hover:text-colorDark transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Posts List */}
        {!showForm ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-colorDark">
              Все статьи ({posts.length})
            </h2>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-colorSecondaryDark mb-4">Пока нет статей</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-colorDark text-colorLight px-6 py-3 rounded-lg font-medium hover:bg-colorSecondaryDark transition-colors"
                >
                  Создать первую статью
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-lg p-6 shadow-sm border border-colorSecondaryLight/20"
                  >
                    <div className="flex items-start gap-4">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-colorSecondaryLight/30 rounded-lg flex items-center justify-center">
                          <span className="text-colorSecondaryDark text-xs">Нет фото</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-colorDark mb-2">
                              {post.title}
                            </h3>
                            <p className="text-colorSecondaryDark text-sm mb-2">
                              {post.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-colorSecondaryDark">
                              <span>{formatDate(post.createdAt)}</span>
                              <span
                                className={`px-2 py-1 rounded-full ${
                                  post.published
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-red-100 text-red-600'
                                }`}
                              >
                                {post.published ? 'Опубликовано' : 'Черновик'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(post)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Редактировать
                            </button>
                            <button
                              onClick={() => handleDelete(post._id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Blog Form */
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-colorDark">
                {editingPost ? 'Редактировать статью' : 'Новая статья'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-colorSecondaryDark hover:text-colorDark"
              >
                Назад к списку
              </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm border border-colorSecondaryLight/20 space-y-6">
              <div>
                <label className="block text-sm font-medium text-colorDark mb-2">
                  Заголовок
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-colorSecondaryLight/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-colorDark focus:border-transparent"
                  placeholder="Введите заголовок статьи"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-colorDark mb-2">
                  Описание
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-colorSecondaryLight/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-colorDark focus:border-transparent resize-none"
                  placeholder="Краткое описание статьи"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-colorDark mb-2">
                  Изображение
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border border-colorSecondaryLight/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-colorDark focus:border-transparent"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                {imageFile && (
                  <p className="mt-2 text-sm text-colorSecondaryDark">
                    Выбран файл: {imageFile.name}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-colorDark focus:ring-colorDark border-colorSecondaryLight/30 rounded"
                />
                <label className="ml-2 text-sm text-colorDark">
                  Опубликовать статью
                </label>
              </div>

              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-colorSecondaryLight/30 text-colorSecondaryDark rounded-lg hover:bg-colorSecondaryLight/10 transition-colors"
                  disabled={uploading}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-3 bg-colorDark text-colorLight rounded-lg font-medium hover:bg-colorSecondaryDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Загрузка...' : (editingPost ? 'Обновить' : 'Создать')}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
