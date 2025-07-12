'use client';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(
        'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );

      if (!res.ok) {
        throw new Error('送信に失敗しました');
      }

      alert('送信しました');
      reset();
    } catch (error) {
      alert(`エラー:${error instanceof Error ? error.message : '送信に失敗しました'}`);
    }
  };

  return (
    <>
      <h1 className="mb-10 text-xl font-bold">お問い合わせフォーム</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-2xl">
        <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between">
          <label htmlFor="name" className="mb-2 md:mb-0 md:w-[240px]">
            お名前
          </label>
          <div className="w-full">
            <input
              type="text"
              id="name"
              className={`border ${errors.name ? 'border-red-700' : 'border-gray-300'} w-full rounded-lg p-4`}
              {...register('name', {
                required: 'お名前は必須です。',
                maxLength: { value: 30, message: 'お名前は30文字以内で入力してください。' }
              })}
              disabled={isSubmitting}
            />
            {errors.name && <p className="mt-1 text-sm text-red-700">{errors.name.message}</p>}
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between">
          <label htmlFor="email" className="mb-2 md:mb-0 md:w-[240px]">
            メールアドレス
          </label>
          <div className="w-full">
            <input
              type="email"
              id="email"
              className={`border ${errors.email ? 'border-red-700' : 'border-gray-300'} w-full rounded-lg p-4`}
              {...register('email', {
                required: 'メールアドレスは必須です。',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'メールアドレスの形式が正しくありません。'
                }
              })}
              disabled={isSubmitting}
            />
            {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email.message}</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <label htmlFor="message" className="mb-2 md:mb-0 md:w-[240px]">
            本文
          </label>
          <div className="w-full">
            <textarea
              id="message"
              rows={8}
              className={`border ${errors.message ? 'border-red-700' : 'border-gray-300'} w-full rounded-lg p-4`}
              {...register('message', {
                required: '本文は必須です。',
                maxLength: { value: 500, message: '本文は500文字以内で入力してください。' }
              })}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-700">{errors.message.message}</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className={`${isSubmitting ? 'bg-gray-400' : 'bg-gray-800'} mr-4 rounded-lg px-4 py-2 font-bold text-white`}
            disabled={isSubmitting}
          >
            送信
          </button>
          <button
            type="button"
            className="rounded-lg bg-gray-200 px-4 py-2 font-bold"
            onClick={() => reset()}
            disabled={isSubmitting}
          >
            クリア
          </button>
        </div>
      </form>
    </>
  );
}
