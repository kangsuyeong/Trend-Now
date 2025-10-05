import { NextResponse } from 'next/server';

/** 쿠키 설정 */
const cookieOptions = {
  domain: '.trendnow.me',
  path: '/',
  sameSite: 'none' as const,
  secure: true,
};

/** AT / RT를 삭제하는 로직 */
export function deleteAuthCookies(response: NextResponse) {
  response.cookies.delete({
    name: 'access_token',
    ...cookieOptions,
  });
  response.cookies.delete({
    name: 'refresh_token',
    ...cookieOptions,
  });
}

/** AT 유효성을 검증하는 로직 */
export function isValidToken({ accesstoken }: { accesstoken?: string }): {
  isAccessTokenValid: boolean;
} {
  // 현재 시간을 초 단위로 가져오기 (Unix Timestamp 형식)
  const currentTime = Math.floor(Date.now() / 1000);

  // 결과 객체를 초기화 (유효성 여부를 저장)
  const result = {
    isAccessTokenValid: false,
  };

  try {
    // 액세스 토큰이 존재하면 디코딩하여 만료 시간(`exp`) 확인
    if (accesstoken) {
      // JWT의 payload 부분(base64) 디코딩
      const accessTokenPayload = JSON.parse(atob(accesstoken.split('.')[1]));

      // 현재 백엔드에서 exp 수정중
      // result.isAccessTokenValid = accessTokenPayload.exp > currentTime;

      // issued claim 기반으로 임시 구현 (30분)
      result.isAccessTokenValid = accessTokenPayload.iat + 30 > currentTime;
    }
  } catch (error) {
    // 디코딩 과정에서 발생한 오류를 로그로 출력
    console.error('토큰 디코딩 실패:', error);
  }

  // 유효성 결과를 반환
  return result;
}
