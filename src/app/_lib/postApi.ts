import { Post } from '@/app/_types/posts';

const fetchJson = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || '記事が見つかりません');
  }
  return res.json();
};
//記事一覧
export const fetchPosts = async (): Promise<Post[]> => {
  const data = await fetchJson('/api/posts');
  return data.posts;
};
//記事詳細
export const fetchPost = async (id: string): Promise<Post> => {
  const data = await fetchJson(`/api/posts/${id}`);
  return data.post;
};
