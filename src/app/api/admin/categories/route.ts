import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CategoryInput } from '@/app/_types/categories';
import { checkAuth } from '@/utils/supabase';

const prisma = new PrismaClient();

//管理者_カテゴリー一覧取得API
export const GET = async (request: NextRequest) => {
  // 認証チェック
  const { isAuthorized, response } = await checkAuth(request);
  if (!isAuthorized) return response;
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ status: 'OK', categories }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

//管理者_カテゴリー新規作成API
export const POST = async (request: NextRequest, context: any) => {
  // 認証チェック
  const { isAuthorized, response } = await checkAuth(request);
  if (!isAuthorized) return response;
  try {
    const body = await request.json();
    const { name }: CategoryInput = body;
    const data = await prisma.category.create({
      data: {
        name
      }
    });
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
