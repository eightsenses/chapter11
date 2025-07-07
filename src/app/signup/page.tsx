'use client';
import { supabase } from '@/utils/supabase';
import { useState } from 'react';
import AuthForm from '@/app/_components/AuthForm';

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
      <AuthForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        buttonText="登録"
      />
    </div>
  );
}
