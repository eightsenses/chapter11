import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | 【10章】NextJSでのバックエンド開発演習（前半）",
  description: "お問い合わせフォームのページです",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
