'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetchPost, updatePost, deletePost } from '@/app/admin/_lib/adminPostApi';
import PostForm from '@/app/admin/posts/_components/PostForm';

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializePage = async () => {
      try {
        const post = await adminFetchPost(params.id);

        setTitle(post.title);
        setContent(post.content);
        setThumbnailUrl(post.thumbnailUrl);
        setSelectedCategories(post.postCategories.map((pc) => pc.category.id));
      } catch (err) {
        setError('データの取得に失敗しました');
        console.error(err);
      }
    };

    initializePage();
  }, [params.id]);

  const handleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setError('タイトルは必須です');
      return;
    }

    setIsSubmitting(true);

    try {
      await updatePost(params.id, {
        title,
        content,
        thumbnailUrl,
        categories: selectedCategories.map((id) => ({ id }))
      });
      alert('記事を更新しました。');
    } catch (err) {
      setError(err instanceof Error ? err.message : '記事の更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('この記事を削除しますか？')) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await deletePost(params.id);
      router.push('/admin/posts');
    } catch (err) {
      setError(err instanceof Error ? err.message : '記事の削除に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const DeleteButton = (
    <button
      type="button"
      onClick={handleDelete}
      className={`rounded px-6 py-2 text-white ${isSubmitting ? 'cursor-not-allowed bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
      disabled={isSubmitting}
    >
      削除する
    </button>
  );

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">記事編集</h1>

      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategory}
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={handleSubmit}
        submitButtonText="更新する"
        onDelete={DeleteButton}
      />
    </>
  );
}
