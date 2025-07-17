'use client';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import AuthForm from '@/app/_components/AuthForm';

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;

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
      <AuthForm onSubmit={handleSubmit} buttonText="ログイン" />
    </div>
  );
}
