'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={`block rounded p-2 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
      {children}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full w-full bg-gray-100 p-4">
      <h2 className="mb-6 text-xl font-bold">管理メニュー</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink href="/admin/posts">記事一覧</NavLink>
          </li>
          <li>
            <NavLink href="/admin/categories">カテゴリー一覧</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
