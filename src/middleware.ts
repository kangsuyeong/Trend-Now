import { handleAuth } from '@/shared/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const postDetailPattern = /^\/(hot)?board\/[^/]+\/post\/[^/]+$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 게시글 상세 페이지: 인증 실패 시에도 페이지는 보여주므로, 리다이렉트하지 않음
  if (postDetailPattern.test(pathname)) {
    return handleAuth(request, () => NextResponse.next());
  }

  // 그 외 matcher에 명시된 로그인이 필요한 모든 페이지
  // 인증 실패 시 로그인 페이지로 리다이렉트
  return handleAuth(request, () => NextResponse.redirect(new URL('/?login=true', request.url)));
}

export const config = {
  matcher: [
    // 로그인이 반드시 필요한 페이지들
    '/board/:boardId/write',
    '/board/:boardId/post/:postId/edit',
    '/hotboard/:boardId/write',
    '/hotboard/:boardId/post/:postId/edit',
    '/mypage/:path*',
    // 로그인이 선택적인 페이지 (로그인했다면 토큰 갱신을 위함)
    '/board/:boardId/post/:postId',
    '/hotboard/:boardId/post/:postId',
  ],
};
