'use client';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useState } from 'react';
import StatusMessage from '@/app/_components/StatusMessage';
import CategoriesForm from '@/app/admin/categories/_components/CategoriesForm';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Category } from '@/app/_types/categories';

const useAdminCategory = (id: string, token?: string) => {
  const fetcher = async (url: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = token;
    }

    const res = await fetch(url, { headers });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'カテゴリの取得に失敗しました');
    }

    const data = await res.json();
    return data.category;
  };

  const { data, error, isLoading, mutate } = useSWR<Category>(
    token && id ? `/api/admin/categories/${id}` : null,
    fetcher
  );

  return {
    category: data,
    isLoading,
    isError: error,
    mutate
  };
};

export default function EditCategory() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { token } = useSupabaseSession();
  const { category, isLoading, isError, mutate } = useAdminCategory(id, token ?? undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <StatusMessage message="読み込み中..." />;
  if (isError) return <StatusMessage message="カテゴリーの取得に失敗しました" />;
  if (!category) return <StatusMessage message="カテゴリーが見つかりませんでした" />;

  const handleSubmit = async (data: { name: string }) => {
    if (!token) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ name: data.name })
      });

      const responseData = await res.json();

      if (res.ok) {
        await mutate();
        alert('カテゴリーを更新しました。');
      } else {
        throw new Error(`更新に失敗しました: ${responseData.status}`);
      }
    } catch (error) {
      console.error('作成中にエラーが発生しました', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!token) return;
    if (window.confirm('本当に削除しますか？')) {
      setIsSubmitting(true);
      try {
        const res = await fetch(`/api/admin/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        });

        if (res.ok) {
          router.push('/admin/categories');
        } else {
          const data = await res.json();
          throw new Error(`削除に失敗しました: ${data.status}`);
        }
      } catch (error) {
        console.error('削除中にエラーが発生しました', error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
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
        defaultValues={{ name: category.name }}
        isSubmitting={isSubmitting}
        error={null}
        onSubmit={handleSubmit}
        submitButtonText="更新する"
        onDelete={DeleteButton}
      />
    </>
  );
}
