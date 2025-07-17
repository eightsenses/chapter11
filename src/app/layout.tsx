import type { Metadata } from 'next';
import { Noto_Sans_JP, Open_Sans } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/app/_components/Header';
import MainContents from '@/app/_components/MainContents';

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto',
  display: 'swap'
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-open',
  display: 'swap'
});

export const metadata: Metadata = {
  title: '【11章】NextJSでのバックエンド開発演習（後半）',
  description: 'データベースをローカル環境からSupabaseに移行'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${openSans.variable} antialiased`}>
        <Header />
        <MainContents>{children}</MainContents>
      </body>
    </html>
  );
}
