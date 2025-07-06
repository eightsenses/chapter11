import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '記事詳細 | 【10章】NextJSでのバックエンド開発演習（前半）',
  description: '記事詳細のページです'
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
