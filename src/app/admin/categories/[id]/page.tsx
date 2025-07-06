'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategory, updateCategory, deleteCategory } from '@/app/admin/_lib/adminCategoryApi';
import CategoriesForm from '../_components/CategoriesForm';

const EditCategory = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const category = await fetchCategory(params.id);
        setName(category.name);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'カテゴリーの取得に失敗しました');
      }
    };
    getCategory();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError('カテゴリー名は必須です');
      return;
    }
    setIsSubmitting(true);

    try {
      await updateCategory(params.id, { name });
      router.push('/admin/categories');
      alert('カテゴリーを更新しました。');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'カテゴリーの更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('本当にこのカテゴリーを削除しますか？')) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await deleteCategory(params.id);
      router.push('/admin/categories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'カテゴリーの削除に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const DeleteButton = (
    <button
      type="button"
      onClick={handleDelete}
      className={`rounded px-6 py-2 text-white ${isSubmitting ? 'cursor-not-allowed bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
      disabled={isSubmitting}
    >
      削除する
    </button>
  );

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">カテゴリー編集</h1>
      <CategoriesForm
        name={name}
        setName={setName}
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={handleSubmit}
        submitButtonText="作成する"
        onDelete={DeleteButton}
      />
    </>
  );
};
export default EditCategory;
