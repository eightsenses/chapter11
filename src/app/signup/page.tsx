'use client';

import { supabase } from '@/utils/supabase';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`
      }
    });
    if (error) {
      alert('登録に失敗しました');
    } else {
      setEmail('');
      setPassword('');
      alert('確認メールを送信しました。');
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
            value={email}
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
            value={password}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
