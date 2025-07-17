'use client';
import Link from 'next/link';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type CategoriesFormProps = {
  defaultValues: {
    name: string;
  };
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (data: { name: string }) => void;
  submitButtonText: string;
  cancelHref?: string;
  onDelete?: React.ReactNode;
};

const CategoriesForm: React.FC<CategoriesFormProps> = ({
  defaultValues,
  isSubmitting,
  error,
  onSubmit,
  submitButtonText,
  cancelHref,
  onDelete
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ name: string }>({
    defaultValues
  });

  const handleFormSubmit: SubmitHandler<{ name: string }> = (data) => {
    onSubmit(data);
  };

  return (
    <>
      {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            カテゴリー名 <span className="text-red-700">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'カテゴリー名は必須です' })}
            className={`w-full rounded border p-2 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.name && <p className="mt-1 text-sm text-red-700">{errors.name.message}</p>}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className={`rounded px-6 py-2 text-white ${
              isSubmitting ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isSubmitting}
          >
            {submitButtonText}
          </button>

          {cancelHref && (
            <Link
              href={cancelHref}
              className={`rounded border border-gray-300 px-6 py-2 ${
                isSubmitting ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
              }`}
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
