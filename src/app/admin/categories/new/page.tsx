'use client';
import { useState } from 'react';
import { createCategory } from '@/app/admin/_lib/adminCategoryApi';
import { useRouter } from 'next/navigation';
import CategoriesForm from '../_components/CategoriesForm';

export default function CreateCategory() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError('カテゴリー名は必須です');
      return;
    }

    setIsSubmitting(true);

    try {
      await createCategory({ name });
      router.push('/admin/categories');
      alert('カテゴリーを作成しました。');

      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'カテゴリーの作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">カテゴリー作成</h1>
      <CategoriesForm
        name={name}
        setName={setName}
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={handleSubmit}
        submitButtonText="作成する"
        cancelHref="/admin/categories"
      />
    </>
  );
}
