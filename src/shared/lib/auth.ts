import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

/** 쿠키 설정 */
const cookieOptions = {
  domain: '.trendnow.me',
  path: '/',
  sameSite: 'none' as const,
  secure: true,
};

/** AT / RT를 삭제하는 로직 */
function deleteAuthCookies(response: NextResponse) {
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
function isValidToken({ accesstoken }: { accesstoken?: string }): {
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

/**
 * @param request NextRequest 객체
 * @param onFailure 인증 실패 시 실행될 콜백 함수. 실패 유형에 맞는 NextResponse를 반환해야 합니다.
 * @returns 인증 성공 시 다음 처리를 위한 NextResponse, 실패 시 onFailure가 반환하는 NextResponse
 */
export async function handleAuth(
  request: NextRequest,
  onFailure: (request: NextRequest) => NextResponse
): Promise<NextResponse> {
  const { cookies } = request;

  // 요청에서 'accesstoken' 쿠키를 가져옴
  const accessToken = request.cookies.get('access_token');

  // 요청에서 'refreshtoken' 쿠키를 가져옴
  const refreshToken = request.cookies.get('refresh_token');

  // 토큰이 하나라도 없는 경우
  if (!accessToken || !refreshToken) {
    const response = onFailure(request);
    // AT, RT 쿠키 삭제
    deleteAuthCookies(response);
    return response;
  }

  // AT의 유효성을 검사
  const { isAccessTokenValid } = isValidToken({ accesstoken: accessToken.value });

  // 2. AT가 유효한 경우
  if (isAccessTokenValid) {
    return NextResponse.next(); // 성공! 다음으로 진행
  }

  // AT가 유효하지 않을 경우 AT 재발급
  try {
    const apiResponse = await fetch(
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

    // 재발급 실패
    if (!apiResponse.ok) {
      const response = onFailure(request);
      deleteAuthCookies(response);
      return response;
    }

    // 재발급 성공이면 다음 요청을 처리
    const response = NextResponse.next();

    // 응답 헤더에서 쿠키를 읽음
    const responseCookies = new ResponseCookies(apiResponse.headers);

    // 응답에서 'accesstoken' 쿠키를 가져옴
    const newAccessToken = responseCookies.get('access_token');

    // 새 액세스 토큰을 설정
    if (newAccessToken) {
      response.cookies.set(newAccessToken);
    }
    return response;
  } catch (error) {
    // --- 아이디어 7: 네트워크 오류 등 예외 처리 통합 ---
    console.error('엑세스 토큰 재발급 중 오류 발생:', error);
    const response = onFailure(request);
    deleteAuthCookies(response);
    return response;
  }
}
