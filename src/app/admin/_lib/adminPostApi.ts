import { Post, PostInput } from '@/app/_types/posts';

const fetchJson = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || '記事が見つかりません');
  }
  return res.json();
};

//管理者_記事一覧
export const adminFetchPosts = async (): Promise<Post[]> => {
  const data = await fetchJson('/api/admin/posts');
  return data.posts;
};
//管理者_記事詳細
export const adminFetchPost = async (id: string): Promise<Post> => {
  const data = await fetchJson(`/api/admin/posts/${id}`);
  return data.post;
};
//管理者_記事作成
export const createPost = async (postData: PostInput): Promise<Post> => {
  try {
    return await fetchJson('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
  } catch (error) {
    console.error('記事作成エラー:', error);
    throw error;
  }
};
//管理者_記事更新
export const updatePost = async (id: string, postData: PostInput): Promise<Post> => {
  try {
    return await fetchJson(`/api/admin/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
  } catch (error) {
    console.error('記事更新エラー:', error);
    throw error;
  }
};
//管理者_記事削除
export const deletePost = async (id: string): Promise<{ message: string }> => {
  try {
    return await fetchJson(`/api/admin/posts/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('記事削除エラー:', error);
    throw error;
  }
};
