'use client';
import { usePathname } from 'next/navigation';

const MainContents: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mainClass = usePathname()?.startsWith('/admin') ? '' : 'max-w-[800px] mx-auto my-10 px-4';
  return <main className={mainClass}>{children}</main>;
};
export default MainContents;
