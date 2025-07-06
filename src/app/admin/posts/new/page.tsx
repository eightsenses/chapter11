'use client';
import { useState } from 'react';
import { createPost } from '@/app/admin/_lib/adminPostApi';
import { useRouter } from 'next/navigation';
import PostForm from '@/app/admin/posts/_components/PostForm';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { token } = useSupabaseSession();
  const handleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !token) {
      if (!title) return setError('タイトルは必須です');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createPost(
        {
          title,
          content,
          thumbnailImageKey: thumbnailImageUrl || '',
          categories: selectedCategories.map((id) => ({ id }))
        },
        token
      );

      router.push(`/admin/posts/${res.id}`);
      alert('記事を作成しました。');

      setTitle('');
      setContent('');
      setSelectedCategories([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '記事の作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">記事作成</h1>

      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailImageUrl={thumbnailImageUrl}
        setThumbnailImageUrl={setThumbnailImageUrl}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategory}
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={handleSubmit}
        submitButtonText="作成する"
        cancelHref="/admin/posts"
      />
    </>
  );
}
