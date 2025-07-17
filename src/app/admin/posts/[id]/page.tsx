'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import PostForm from '@/app/admin/posts/_components/PostForm';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { useAdminCategories } from '@/app/admin/_hooks/useAdminCategories';
import { Post } from '@/app/_types/posts';
import StatusMessage from '@/app/_components/StatusMessage';
const useAdminPost = (id: string, token?: string | null) => {
  const fetcher = async (url: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = token;
    }

    const res = await fetch(url, { headers });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || '記事が見つかりません');
    }

    const data = await res.json();
    return data.post;
  };

  const { data, error, isLoading, mutate } = useSWR<Post>(
    token && id ? `/api/admin/posts/${id}` : null,
    fetcher
  );

  return {
    post: data,
    isLoading,
    isError: error,
    mutate
  };
};

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { token } = useSupabaseSession();

  const {
    post,
    isLoading: isPostLoading,
    isError: isPostError,
    mutate: mutatePost
  } = useAdminPost(params.id, token);
  const { categories, isLoading: isCategoriesLoading } = useAdminCategories(token);

  const [error, setError] = useState<string | null>(null);

  if (isPostLoading || isCategoriesLoading) return <StatusMessage message="読み込み中..." />;
  if (isPostError) return <StatusMessage message="記事の取得に失敗しました" className="text-2xl" />;
  if (!post) return <StatusMessage message="記事が見つかりませんでした" className="text-2xl" />;
  if (!categories)
    return <StatusMessage message="カテゴリーの取得に失敗しました" className="text-2xl" />;

  const defaultValues = {
    title: post.title,
    content: post.content,
    categories: post.postCategories?.map((pc) => pc.category.id) ?? [],
    thumbnailUrl: post.thumbnailImageKey
  };

  const handleSubmitForm = async ({
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
      const res = await fetch(`/api/admin/posts/${params.id}`, {
        method: 'PUT',
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
        await mutatePost(); // SWRのキャッシュを更新
        alert('記事を更新しました。');
      } else {
        setError(`更新に失敗しました: ${data.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '記事の更新に失敗しました');
    }
  };

  const handleDelete = async () => {
    if (!token) return;
    if (!window.confirm('この記事を削除しますか？')) {
      return;
    }

    setError(null);

    try {
      const res = await fetch(`/api/admin/posts/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });

      if (res.ok) {
        router.push('/admin/posts');
      } else {
        const data = await res.json();
        setError(`削除に失敗しました: ${data.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '記事の削除に失敗しました');
    }
  };

  const DeleteButton = (
    <button
      type="button"
      onClick={handleDelete}
      className={`rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600`}
    >
      削除する
    </button>
  );

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">記事編集</h1>
      {error && <StatusMessage message={error} />}
      <PostForm
        defaultValues={defaultValues}
        onSubmit={handleSubmitForm}
        submitButtonText="更新する"
        onDelete={DeleteButton}
        isEdit={true}
      />
    </>
  );
}
