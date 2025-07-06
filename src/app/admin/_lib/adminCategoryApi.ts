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
export const fetchCategories = async (): Promise<Category[]> => {
  const data = await fetchJson('/api/admin/categories');
  return Array.isArray(data.categories) ? data.categories : [];
};
//管理者_カテゴリー詳細
export const fetchCategory = async (id: string): Promise<Category> => {
  const data = await fetchJson(`/api/admin/categories/${id}`);
  return data.categories;
};
//管理者_カテゴリー作成
export const createCategory = async (categoryData: Pick<Category, 'name'>): Promise<Category> => {
  return await fetchJson('/api/admin/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData)
  });
};
//管理者_カテゴリー更新
export const updateCategory = async (id: string, categoryData: Pick<Category, 'name'>): Promise<Category> => {
  return await fetchJson(`/api/admin/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData)
  });
};
//管理者_カテゴリー削除
export const deleteCategory = async (id: string): Promise<void> => {
  await fetchJson(`/api/admin/categories/${id}`, {
    method: 'DELETE'
  });
};
