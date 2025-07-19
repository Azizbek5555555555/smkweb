"use client";
import React, { useState, useRef } from 'react';
import { IBlogPost } from '@/lib/models/BlogPost';

interface BlogPostFormProps {
  post?: IBlogPost;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function BlogPostForm({ post, onSubmit, onCancel, loading = false }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    description: post?.description || '',
    content: post?.content || '',
    published: post?.published || false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(post?.image || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('content', formData.content);
    data.append('published', formData.published.toString());
    
    if (imageFile) {
      data.append('image', imageFile);
    } else if (post?.image) {
      data.append('image', post.image);
    }

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-colorDark mb-2">
          Заголовок
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-colorPrimary focus:border-colorPrimary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-colorDark mb-2">
          Описание
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-colorPrimary focus:border-colorPrimary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-colorDark mb-2">
          Изображение
        </label>
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-colorPrimary focus:border-colorPrimary"
          />
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-colorDark mb-2">
          Контент
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={10}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-colorPrimary focus:border-colorPrimary"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
          className="h-4 w-4 text-colorPrimary focus:ring-colorPrimary border-gray-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-colorDark">
          Опубликовать
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-colorPrimary text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 transition-all duration-200"
        >
          {loading ? 'Сохраняем...' : post ? 'Обновить' : 'Создать'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-colorDark rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}