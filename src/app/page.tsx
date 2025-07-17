'use client';
import Link from 'next/link';
import parse from 'html-react-parser';
import useSWR from 'swr';
import StatusMessage from '@/app/_components/StatusMessage';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Post } from '@/app/_types/posts';

const usePosts = (token?: string | null) => {
  const fetcher = async (url: string) => {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = token;
    }
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || '記事が見つかりません');
    }
    const json = await res.json();
    return json.posts as Post[];
  };
  const { data, error, isLoading } = useSWR<Post[]>('/api/posts', fetcher);
  return { posts: data, isLoading, isError: error };
};

export default function Home() {
  const { token } = useSupabaseSession();
  const { posts, isLoading, isError } = usePosts(token);

  if (isLoading) return <StatusMessage message="読み込み中..." />;
  if (isError) return <StatusMessage message="記事の取得に失敗しました" />;
  if (!posts || posts.length === 0)
    return <StatusMessage message="記事がありません" className="text-2xl" />;

  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li key={post.id} className="rounded border border-zinc-300 p-4">
          <Link href={`/posts/${post.id}`} className="block">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.postCategories
                  .slice()
                  .sort((a, b) => a.category.id - b.category.id)
                  .map((cat, i) => (
                    <span
                      key={i}
                      className="rounded border border-blue-600 px-2 py-1 text-xs text-blue-600"
                    >
                      {cat.category.name}
                    </span>
                  ))}
              </div>
            </div>
            <div className="mb-4 mt-2 text-2xl">{post.title}</div>
            <div className="line-clamp-2">{parse(post.content)}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
