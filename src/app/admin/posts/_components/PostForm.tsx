'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { useAdminCategories } from '@/app/admin/_hooks/useAdminCategories';
import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

type PostFormValues = {
  title: string;
  content: string;
  categories: string[];
  thumbnailImage: FileList;
};

type PostFormProps = {
  defaultValues?: Partial<{
    title: string;
    content: string;
    categories: number[];
    thumbnailUrl: string;
  }>;
  isEdit?: boolean;
  error?: string | null;
  onSubmit: (data: {
    title: string;
    content: string;
    categories: number[];
    thumbnailUrl: string;
  }) => void;
  submitButtonText: string;
  cancelHref?: string;
  onDelete?: React.ReactNode;
};

const PostForm: React.FC<PostFormProps> = ({
  defaultValues,
  isEdit = false,
  error,
  onSubmit,
  submitButtonText,
  cancelHref,
  onDelete
}) => {
  const { token } = useSupabaseSession();
  const { categories, isLoading, isError } = useAdminCategories(token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PostFormValues>({
    defaultValues: {
      title: defaultValues?.title ?? '',
      content: defaultValues?.content ?? '',
      categories: defaultValues?.categories?.map(String) ?? []
    }
  });

  const handleFormSubmit: SubmitHandler<PostFormValues> = async (data) => {
    let thumbnailUrl = defaultValues?.thumbnailUrl ?? '';
    if (data.thumbnailImage && data.thumbnailImage.length > 0) {
      const file = data.thumbnailImage[0];
      const filePath = `private/${uuidv4()}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('post-thumbnail')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      if (uploadError) {
        alert(uploadError.message);
        return;
      }
      const {
        data: { publicUrl }
      } = supabase.storage.from('post-thumbnail').getPublicUrl(uploadData.path);
      thumbnailUrl = publicUrl;
    }

    const categoryIds = data.categories.map((c) => parseInt(c, 10));

    onSubmit({
      title: data.title,
      content: data.content,
      categories: categoryIds,
      thumbnailUrl
    });
  };

  if (isLoading) return <p>カテゴリーを読み込み中...</p>;
  if (isError) return <p>カテゴリーの取得に失敗しました。</p>;

  return (
    <>
      {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-2 block font-medium">
            タイトル <span className="text-red-700">*</span>
          </label>
          <input
            id="title"
            {...register('title', { required: 'タイトルは必須です' })}
            className={`w-full rounded border p-2 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.title && <p className="mt-1 text-sm text-red-700">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block font-medium">
            内容
          </label>
          <textarea
            id="content"
            {...register('content')}
            className="h-64 w-full rounded border border-gray-300 p-2 font-mono"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="thumbnailImage" className="mb-2 block font-medium">
            サムネイル画像
          </label>
          <input
            id="thumbnailImage"
            type="file"
            {...register('thumbnailImage')}
            accept="image/*"
            disabled={isSubmitting}
          />
        </div>
        {isEdit && (
          <div className="mt-2">
            <Image
              src={defaultValues?.thumbnailUrl || '/images/no-image.jpg'}
              alt="thumbnail"
              width={400}
              height={400}
            />
          </div>
        )}

        <div>
          <label htmlFor="categories" className="mb-2 block font-medium">
            カテゴリー
          </label>
          <fieldset id="categories" className="flex flex-wrap gap-3" disabled={isSubmitting}>
            {categories && categories.length > 0 ? (
              categories.map(({ id, name }) => (
                <label key={id} className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('categories')}
                    value={String(id)}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  {name}
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500">カテゴリーがありません</p>
            )}
          </fieldset>
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

export default PostForm;
