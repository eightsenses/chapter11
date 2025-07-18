import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PostInput } from '@/app/_types/posts';
import { checkAuth } from '@/utils/supabase';

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  // 認証チェック
  const { isAuthorized, response } = await checkAuth(request);
  if (!isAuthorized) return response;

  try {
    const posts = await prisma.post.findMany({
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ status: 'OK', posts: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// POSTという命名にすることで、POSTリクエストの時にこの関数が呼ばれる
export const POST = async (request: NextRequest, context: any) => {
  // 認証チェック
  const { isAuthorized, response } = await checkAuth(request);
  if (!isAuthorized) return response;

  try {
    // リクエストのbodyを取得
    const body = await request.json();

    // bodyの中からtitle, content, categories, thumbnailImageKeyを取り出す
    const { title, content, categories, thumbnailImageKey }: PostInput = body;

    // 投稿をDBに生成
    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailImageKey
      }
    });

    // 記事とカテゴリーの中間テーブルのレコードをDBに生成
    // 本来複数同時生成には、createManyというメソッドがあるが、sqliteではcreateManyが使えないので、for文1つずつ実施
    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id
        }
      });
    }

    // レスポンスを返す
    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
