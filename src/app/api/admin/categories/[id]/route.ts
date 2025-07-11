import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CategoryInput } from '@/app/_types/categories';
import { checkAuth } from '@/utils/supabase';

const prisma = new PrismaClient();

//管理者_カテゴリー詳細取得API
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  // 認証チェック
  const { isAuthorized, response } = await checkAuth(request);
  if (!isAuthorized) return response;

  const { id } = params;

  try {
    const categories = await prisma.category.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        posts: {
          include: {
            post: true
          }
        }
      }
    });

    return NextResponse.json({ status: 'OK', categories }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

//管理者_カテゴリー更新API
export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  // 認証チェック
  const { isAuthorized, response } = await checkAuth(request);
  if (!isAuthorized) return response;

  const { id } = params;
  const { name }: CategoryInput = await request.json();

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name
      }
    });

    return NextResponse.json({ status: 'OK', post: category }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

//管理者_カテゴリー削除API
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  // 認証チェック
  const { isAuthorized, response } = await checkAuth(request);
  if (!isAuthorized) return response;

  const { id } = params;

  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id)
      }
    });

    return NextResponse.json({ status: 'OK' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
