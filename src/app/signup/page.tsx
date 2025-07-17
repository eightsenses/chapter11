'use client';
import { supabase } from '@/utils/supabase';
import AuthForm from '@/app/_components/AuthForm';

export default function Page() {
  const handleSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;

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
      alert('確認メールを送信しました。');
    }
  };

  return (
    <div className="flex justify-center pt-[240px]">
      <AuthForm onSubmit={handleSubmit} buttonText="登録" />
    </div>
  );
}
