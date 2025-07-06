'use client';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header flex justify-between p-3 font-bold tracking-wide md:p-5">
      <Link href="/">BLOG</Link>
      <Link href="/contact">お問い合わせ</Link>
    </header>
  );
};
export default Header;
