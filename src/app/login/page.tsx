'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import AuthForm from '@/app/_components/AuthForm';

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
      <AuthForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        buttonText="ログイン"
      />
    </div>
  );
}
