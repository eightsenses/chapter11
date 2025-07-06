import type { Metadata } from 'next';
import AdminLayout from '@/app/admin/_components/AdminLayout';

export const metadata: Metadata = {
  title: '管理画面'
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
