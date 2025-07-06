'use client';
import Link from 'next/link';
import React from 'react';
import { useSupabaseSession } from '../_hooks/useSupabaseSession';
import { supabase } from '@/utils/supabase';

const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const { session, isLoding } = useSupabaseSession();
  return (
    <header className="header flex justify-between p-3 font-bold tracking-wide md:p-5">
      <Link href="/">BLOG</Link>
      {!isLoding && (
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link href="/admin" className="header-link">
                管理画面
              </Link>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href="/contact" className="header-link">
                お問い合わせ
              </Link>
              <Link href="/login" className="header-link">
                ログイン
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
export default Header;
