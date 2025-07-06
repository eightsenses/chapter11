'use client';

import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert('ログインに失敗しました');
    } else {
      router.replace('/admin/posts');
    }
  };

  return (
    <div className="flex justify-center pt-[240px]">
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="name@company.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
            パスワード
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  );
}
