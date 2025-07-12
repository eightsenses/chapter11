'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/app/admin/posts/_components/PostForm';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { useAdminCategories } from '@/app/admin/_hooks/useAdminCategories';
import StatusMessage from '@/app/_components/StatusMessage';

export default function CreatePost() {
  const router = useRouter();
  const { token } = useSupabaseSession();
  const { isLoading, isError } = useAdminCategories(token ?? undefined);

  const [error, setError] = useState<string | null>(null);

  if (isLoading) return <StatusMessage message="読み込み中..." />;
  if (isError) return <StatusMessage message="カテゴリーの取得に失敗しました" />;

  const handleSubmit = async ({
    title,
    content,
    categories,
    thumbnailUrl
  }: {
    title: string;
    content: string;
    categories: number[];
    thumbnailUrl: string | null;
  }) => {
    if (!token) return;
    if (!title) {
      setError('タイトルは必須です');
      return;
    }

    setError(null);

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          title,
          content,
          thumbnailImageKey: thumbnailUrl || '',
          categories: categories.map((id) => ({ id }))
        })
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/admin/posts/${data.id}`);
        alert('記事を作成しました。');
      } else {
        setError(`作成に失敗しました: ${data.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '記事の作成に失敗しました');
    }
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">記事作成</h1>
      {error && <StatusMessage message={error} />}

      <PostForm
        onSubmit={handleSubmit}
        submitButtonText="作成する"
        cancelHref="/admin/posts"
        isEdit={false}
      />
    </>
  );
}
