import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '管理画面'
};

export default function AdminPage() {
  redirect('/admin/posts');
}
