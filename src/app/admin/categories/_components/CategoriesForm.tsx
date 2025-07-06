'use client';
import Link from 'next/link';
import React from 'react';

type CategoriesFormProps = {
  name: string;
  setName: (name: string) => void;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  cancelHref?: string;
  onDelete?: React.ReactNode;
};

const CategoriesForm: React.FC<CategoriesFormProps> = ({
  name,
  setName,
  isSubmitting,
  error,
  onSubmit,
  submitButtonText,
  cancelHref,
  onDelete
}) => {
  return (
    <>
      {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            カテゴリー名 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
            required
            disabled={isSubmitting}
          />
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
export default CategoriesForm;
