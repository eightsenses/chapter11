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
export const adminFetchPosts = async (token?: string): Promise<Post[]> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = token;
  }

  const data = await fetchJson('/api/admin/posts', { headers });
  return data.posts;
};
//管理者_記事詳細
export const adminFetchPost = async (id: string, token?: string): Promise<Post> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = token;
  }

  const data = await fetchJson(`/api/admin/posts/${id}`, { headers });
  return data.post;
};
//管理者_記事作成
export const createPost = async (postData: PostInput, token?: string): Promise<Post> => {
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = token;
    }

    return await fetchJson('/api/admin/posts', {
      method: 'POST',
      headers,
      body: JSON.stringify(postData)
    });
  } catch (error) {
    console.error('記事作成エラー:', error);
    throw error;
  }
};
//管理者_記事更新
export const updatePost = async (
  id: string,
  postData: PostInput,
  token?: string
): Promise<Post> => {
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = token;
    }
    return await fetchJson(`/api/admin/posts/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(postData)
    });
  } catch (error) {
    console.error('記事更新エラー:', error);
    throw error;
  }
};
//管理者_記事削除
export const deletePost = async (id: string, token?: string): Promise<{ message: string }> => {
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = token;
    }
    return await fetchJson(`/api/admin/posts/${id}`, {
      method: 'DELETE',
      headers
    });
  } catch (error) {
    console.error('記事削除エラー:', error);
    throw error;
  }
};
