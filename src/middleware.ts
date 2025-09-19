import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 요청에서 'accesstoken' 쿠키를 가져옴
  const accesstoken = request.cookies.get('access_token');

  // 요청에서 'refreshtoken' 쿠키를 가져옴
  const refreshtoken = request.cookies.get('access_token');

  // 액세스 토큰 또는 리프레시 토큰이 없을 경우 로그인 페이지로 리다이렉트
  if (!accesstoken?.value || !refreshtoken?.value) {
    return NextResponse.redirect(new URL('/?login=true', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/board/:boardId/write', '/hotboard/:boardId/write', '/mypage/:path*'],
};
