import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const checkAuth = async (request: NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';
  const { error } = await supabase.auth.getUser(token);

  if (error) {
    return {
      isAuthorized: false,
      response: NextResponse.json({ status: error.message }, { status: 400 })
    };
  }

  return { isAuthorized: true, response: null };
};
