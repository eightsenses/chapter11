'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { adminFetchPosts } from '@/app/admin/_lib/adminPostApi';
import { Post } from '@/app/_types/posts';
import StatusMessage from '@/app/_components/StatusMessage';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export default function AdminPostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token } = useSupabaseSession();
  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        const data = await adminFetchPosts(token);
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '記事の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, [token]);

  if (isLoading) return <StatusMessage message="読み込み中..." />;
  if (error) return <StatusMessage message={error} className="text-2xl" />;

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
