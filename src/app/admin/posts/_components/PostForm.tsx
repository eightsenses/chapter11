'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Category } from '@/app/_types/categories';
import { fetchCategories } from '@/app/admin/_lib/adminCategoryApi';

type PostFormProps = {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (thumbnailUrl: string) => void;
  selectedCategories: number[];
  onCategoryToggle: (categoryId: number) => void;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  cancelHref?: string;
  onDelete?: React.ReactNode;
};

const PostForm: React.FC<PostFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  selectedCategories,
  onCategoryToggle,
  isSubmitting,
  error,
  onSubmit,
  submitButtonText,
  cancelHref,
  onDelete
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetched = await fetchCategories();
        setCategories(fetched);
      } catch (err) {
        console.error('カテゴリーの取得に失敗しました', err);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-2 block font-medium">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block font-medium">
            内容
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-64 w-full rounded border border-gray-300 p-2 font-mono"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="thumbnailUrl" className="mb-2 block font-medium">
            サムネイルURL
          </label>
          <input
            id="thumbnailUrl"
            type="text"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
            placeholder="https://example.com/image.jpg"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="categories" className="mb-2 block font-medium">
            カテゴリー
          </label>
          <fieldset id="categories" className="flex flex-wrap gap-3" disabled={isSubmitting}>
            {categories.map(({ id, name }) => (
              <label key={id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(id)}
                  onChange={() => onCategoryToggle(id)}
                  className="mr-2"
                />
                {name}
              </label>
            ))}
          </fieldset>
          {categories.length === 0 && (
            <p className="text-sm text-gray-500">カテゴリーがありません</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className={`rounded px-6 py-2 text-white ${isSubmitting ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={isSubmitting}
          >
            {submitButtonText}
          </button>

          {cancelHref && (
            <Link
              href={cancelHref}
              className={`rounded border border-gray-300 px-6 py-2 ${isSubmitting ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
              tabIndex={isSubmitting ? -1 : 0}
            >
              キャンセル
            </Link>
          )}
          {onDelete}
        </div>
      </form>
    </>
  );
};

export default PostForm;
