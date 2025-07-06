import type { Metadata } from 'next';
import { Noto_Sans_JP, Open_Sans } from 'next/font/google';
import './globals.css';
import Header from './_components/Header';
import MainContents from './_components/MainContents';

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
  title: '【10章】NextJSでのバックエンド開発演習（前半）',
  description: '前章で学んだmicroCMSで作った部分を、 ハンズオン形式で0からコードを書いて作る'
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
