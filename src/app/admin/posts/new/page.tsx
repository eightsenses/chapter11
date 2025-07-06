'use client';
import { useState } from 'react';
import { createPost } from '@/app/admin/_lib/adminPostApi';
import { useRouter } from 'next/navigation';
import PostForm from '@/app/admin/posts/_components/PostForm';

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://placehold.jp/800x400.png');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return setError('タイトルは必須です');

    setIsSubmitting(true);

    try {
      const res = await createPost({
        title,
        content,
        thumbnailUrl,
        categories: selectedCategories.map((id) => ({ id }))
      });

      router.push(`/admin/posts/${res.id}`);
      alert('記事を作成しました。');

      setTitle('');
      setContent('');
      setThumbnailUrl('https://placehold.jp/800x400.png');
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
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
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
