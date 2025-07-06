'use client';

import AdminLayout from '@/app/admin/_components/AdminLayout';
import { useRouteGuard } from './_hooks/useRouteGuard';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  useRouteGuard();
  return <AdminLayout>{children}</AdminLayout>;
}
