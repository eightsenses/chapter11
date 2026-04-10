# ブログ管理システム

Next.js 14とSupabaseを使用したブログ管理システムです。

## 主な機能

- 📝 ブログ記事の閲覧
- 🔐 Supabaseによるユーザー認証
- 👨‍💼 管理者機能
  - 記事の作成・編集・削除
  - カテゴリーの管理
- 📧 お問い合わせページ

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **認証**: Supabase Auth
- **データベース**: PostgreSQL (Prisma ORM)
- **スタイリング**: Tailwind CSS
- **フォーム管理**: React Hook Form
- **データフェッチング**: SWR

## セットアップ

1. 依存パッケージのインストール:

```bash
npm install
```

2. 環境変数の設定:
   `.env.local`ファイルを作成し、以下の変数を設定してください:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Database
DATABASE_URL=your-database-url
DIRECT_URL=your-direct-database-url
```

3. データベースのマイグレーション:

```bash
npx prisma migrate dev
```

4. 開発サーバーの起動:

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認します。

## プロジェクト構成

```
src/
├── app/
│   ├── admin/          # 管理者機能
│   ├── api/            # APIルート
│   ├── posts/          # 記事ページ
│   ├── contact/        # お問い合わせ
│   ├── login/          # ログイン
│   └── signup/         # 新規登録
├── utils/              # ユーティリティ
└── _components/        # 共通コンポーネント
```

## データベーススキーマ

- **Post**: ブログ記事
- **Category**: カテゴリー
- **PostCategory**: 記事とカテゴリーの関連付け（多対多）

詳細は `prisma/schema.prisma` を参照してください。

## 管理者機能

管理者機能にアクセスするには、Supabaseで認証されたユーザーでログインしてください:

- 記事管理: `/admin/posts`
- カテゴリー管理: `/admin/categories`
