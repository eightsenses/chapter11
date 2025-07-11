'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchCategories } from '@/app/admin/_lib/adminCategoryApi';
import { Category } from '@/app/_types/categories';
import StatusMessage from '@/app/_components/StatusMessage';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token } = useSupabaseSession();
  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      try {
        const data = await fetchCategories(token);
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'カテゴリーの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, [token]);

  if (isLoading) return <StatusMessage message="読み込み中..." />;
  if (error) return <StatusMessage message={error} className="text-2xl" />;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">カテゴリー一覧</h1>
        <Link
          href="/admin/categories/new"
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          カテゴリー作成
        </Link>
      </div>

      <ul className="flex flex-col">
        {categories.map((category) => (
          <li key={category.id} className="rounded border-t border-zinc-300 p-4 py-6 last:border-b">
            <Link href={`/admin/categories/${category.id}`} className="block">
              <div className="text-xl">{category.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
