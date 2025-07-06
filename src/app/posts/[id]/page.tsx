'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import parse from 'html-react-parser';
import { fetchPost } from '@/app/_lib/postApi';
import { Post } from '@/app/_types/posts';
import StatusMessage from '@/app/_components/StatusMessage';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export default function Posts() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token } = useSupabaseSession();
  useEffect(() => {
    if (!id) return;
    const fetcher = async () => {
      try {
        const data = await fetchPost(id, token ?? undefined);
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '記事が見つかりませんでした');
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, [id, token]);

  if (isLoading) return <StatusMessage message="読み込み中..." />;
  if (!post) return <StatusMessage message="記事が見つかりませんでした" className="text-2xl" />;
  if (error) return <StatusMessage message={error} className="text-2xl" />;

  return (
    <>
      <div className="py-4">
        <div>
          <Image src={post.thumbnailImageKey} alt={post.title} width={800} height={400} priority />
        </div>
        <div className="m-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
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
          <div>{parse(post.content)}</div>
        </div>
      </div>
    </>
  );
}
