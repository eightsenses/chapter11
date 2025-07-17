'use client';
import { useRouter } from 'next/navigation';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import CategoriesForm from '@/app/admin/categories/_components/CategoriesForm';

export default function CreateCategory() {
  const router = useRouter();
  const { token } = useSupabaseSession();

  const handleSubmit = async (data: { name: string }) => {
    if (!token) return;

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ name: data.name })
      });

      const responseData = await res.json();

      if (res.ok) {
        router.push('/admin/categories');
        alert('カテゴリーを作成しました。');
      } else {
        throw new Error(`作成に失敗しました: ${responseData.status}`);
      }
    } catch (error) {
      console.error('作成中にエラーが発生しました', error);
      throw error;
    }
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">カテゴリー作成</h1>
      <CategoriesForm
        defaultValues={{ name: '' }}
        isSubmitting={false}
        error={null}
        onSubmit={handleSubmit}
        submitButtonText="作成する"
        cancelHref="/admin/categories"
      />
    </>
  );
}
