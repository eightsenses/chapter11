'use client';
import Link from 'next/link';
import useSWR from 'swr';
import StatusMessage from '@/app/_components/StatusMessage';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Post } from '@/app/_types/posts';

const useAdminPosts = (token?: string | null) => {
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
    return data.posts;
  };

  const { data, error, isLoading } = useSWR<Post[]>(token ? '/api/admin/posts' : null, fetcher);

  return {
    posts: data,
    isLoading,
    isError: error
  };
};

export default function AdminPostsList() {
  const { token } = useSupabaseSession();
  const { posts, isLoading, isError } = useAdminPosts(token);

  if (isLoading) return <StatusMessage message="読み込み中..." />;
  if (isError) return <StatusMessage message="記事の取得に失敗しました" />;
  if (!posts || posts.length === 0) return <StatusMessage message="記事がありません" />;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">記事一覧</h1>
        <Link
          href="/admin/posts/new"
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          記事作成
        </Link>
      </div>

      <ul className="flex flex-col">
        {posts.map((post) => (
          <li key={post.id} className="rounded border-t border-zinc-300 last:border-b">
            <Link href={`/admin/posts/${post.id}`} className="block p-4 py-6 hover:bg-gray-50">
              <div className="mb-1 text-xl font-semibold">{post.title}</div>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
