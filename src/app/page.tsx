'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { fetchPosts } from '@/app/_lib/postApi';
import { Post } from '@/app/_types/posts';
import StatusMessage from '@/app/_components/StatusMessage';
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '記事の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, []);

  if (isLoading) return <StatusMessage message="読み込み中..." />;
  if (error) return <StatusMessage message={error} className="text-2xl" />;

  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li key={post.id} className="rounded border border-zinc-300 p-4">
          <Link href={`/posts/${post.id}`} className="block">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
              <div className="flex flex-wrap gap-2">
                {post.postCategories
                  .slice()
                  .sort((a, b) => a.category.id - b.category.id)
                  .map((cat, i) => (
                    <span key={i} className="rounded border border-blue-600 px-2 py-1 text-xs text-blue-600">
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
