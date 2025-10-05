import { isValidToken } from '@/shared/lib';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;

  // 요청에서 'accesstoken' 쿠키를 가져옴
  const accesstoken = request.cookies.get('access_token');

  // 요청에서 'refreshtoken' 쿠키를 가져옴
  const refreshtoken = request.cookies.get('refresh_token');

  // 액세스 토큰 또는 리프레시 토큰이 없을 경우 로그인 페이지로 리다이렉트
  if (!accesstoken?.value || !refreshtoken?.value) {
    const response = NextResponse.redirect(new URL('/?login=true', request.url));
    // AT, RT 쿠키 삭제
    response.cookies.delete({
      name: 'access_token',
      domain: '.trendnow.me',
      path: '/',
      sameSite: 'none',
      secure: true,
    });
    response.cookies.delete({
      name: 'refresh_token',
      domain: '.trendnow.me',
      path: '/',
      sameSite: 'none',
      secure: true,
    });
    return response;
  }

  // AT의 유효성을 검사
  const { isAccessTokenValid } = isValidToken({
    accesstoken: accesstoken?.value,
  });

  console.log('AT 유효성', isAccessTokenValid);

  // AT가 유효하지 않을 경우 AT 재발급
  if (!isAccessTokenValid) {
    try {
      // AT 재발급 API 호출
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_URL}/api/v1/member/access-token`,
        {
          method: 'POST',
          headers: {
            // 서버 환경이므로 쿠키 담기
            Cookie: cookies.toString(),
            // 'Referer' 헤더를 브라우저의 원본 URL로 설정해서 전달
            Referer: request.url,
          },
        }
      );
      // 응답이 성공적이지 않으면 로그인 페이지로 리다이렉트
      if (!response.ok) {
        const response = NextResponse.redirect(new URL('/?login=true', request.url));
        // AT, RT 쿠키 삭제
        response.cookies.delete({
          name: 'access_token',
          domain: '.trendnow.me',
          path: '/',
          sameSite: 'none',
          secure: true,
        });
        response.cookies.delete({
          name: 'refresh_token',
          domain: '.trendnow.me',
          path: '/',
          sameSite: 'none',
          secure: true,
        });
        return response;
      }
      // 응답이 성공적이면 다음 요청을 처리
      if (response.ok) {
        const res = NextResponse.next();

        // 응답 헤더에서 쿠키를 읽음
        const responseCookies = new ResponseCookies(response.headers);

        // 응답에서 'accesstoken' 쿠키를 가져옴
        const accessToken = responseCookies.get('access_token');

        if (accessToken) {
          // 새 액세스 토큰을 설정
          res.cookies.set(accessToken);
        }
        return res;
      }
    } catch (error) {
      // 토큰 재발급 중 오류가 발생하면 콘솔에 출력하고 로그인 페이지로 리다이렉트
      console.error('엑세스 토큰 재발급 중 오류 발생:', error);
      return NextResponse.redirect(new URL('/?login=true', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/board/:boardId/write',
    '/board/:boardId/post/:postId/edit',
    '/hotboard/:boardId/write',
    '/hotboard/:boardId/post/:postId/edit',
    '/mypage/:path*',
  ],
};
