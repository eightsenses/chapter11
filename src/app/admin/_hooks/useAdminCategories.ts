import useSWR from 'swr';
import { Category } from '@/app/_types/categories';

export const useAdminCategories = (token?: string | null) => {
  const fetcher = async (url: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = token;
    }

    const res = await fetch(url, { headers });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'カテゴリの取得に失敗しました');
    }

    const data = await res.json();
    return data.categories;
  };

  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    token ? '/api/admin/categories' : null,
    fetcher
  );

  return {
    categories: data,
    isLoading,
    isError: error,
    mutate
  };
};
