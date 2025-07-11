import { Category } from '@/app/_types/categories';

const fetchJson = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'カテゴリーが見つかりません');
  }
  return res.json();
};
//管理者_カテゴリー一覧
export const fetchCategories = async (token?: string): Promise<Category[]> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = token;
  }

  const data = await fetchJson('/api/admin/categories', { headers });
  return Array.isArray(data.categories) ? data.categories : [];
};
//管理者_カテゴリー詳細
export const fetchCategory = async (id: string, token?: string): Promise<Category> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = token;
  }

  const data = await fetchJson(`/api/admin/categories/${id}`, { headers });
  return data.categories;
};
//管理者_カテゴリー作成
export const createCategory = async (
  categoryData: Pick<Category, 'name'>,
  token?: string
): Promise<Category> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = token;
  }

  return await fetchJson('/api/admin/categories', {
    method: 'POST',
    headers,
    body: JSON.stringify(categoryData)
  });
};
//管理者_カテゴリー更新
export const updateCategory = async (
  id: string,
  categoryData: Pick<Category, 'name'>,
  token?: string
): Promise<Category> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = token;
  }

  return await fetchJson(`/api/admin/categories/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(categoryData)
  });
};
//管理者_カテゴリー削除
export const deleteCategory = async (id: string, token?: string): Promise<void> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = token;
  }

  await fetchJson(`/api/admin/categories/${id}`, {
    method: 'DELETE',
    headers
  });
};
