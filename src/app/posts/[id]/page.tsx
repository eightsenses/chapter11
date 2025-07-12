'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import parse from 'html-react-parser';
import useSWR from 'swr';
import StatusMessage from '@/app/_components/StatusMessage';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Post } from '@/app/_types/posts';

const usePost = (id: string, token?: string | null) => {
  const fetcher = async (url: string) => {
    const headers: HeadersInit = {};
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

  const { data, error, isLoading } = useSWR<Post>(id ? `/api/posts/${id}` : null, fetcher);

  return {
    post: data,
    isLoading,
    isError: error
  };
};

export default function Posts() {
  const { id } = useParams<{ id: string }>();
  const { token } = useSupabaseSession();
  const { post, isLoading, isError } = usePost(id, token);

  if (isLoading) return <StatusMessage message="読み込み中..." />;
  if (isError) return <StatusMessage message="記事が見つかりませんでした" />;
  if (!post) return <StatusMessage message="記事が見つかりませんでした" />;

  return (
    <>
      <div className="py-4">
        <div>
          <Image
            src={post.thumbnailImageKey || '/images/no-image.jpg'}
            alt={post.title}
            width={800}
            height={400}
            priority
          />
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
