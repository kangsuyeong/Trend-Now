'use server';

import { UnauthorizedError } from '@/shared/error/error';
import { LoginResponse } from '../types';

export async function getGoogleAccessToken(code: string): Promise<LoginResponse> {
  const response = await fetch(process.env.REST_API_URL + '/api/v1/member/login/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (response.ok) return await response.json();

  throw new UnauthorizedError('로그인 정보를 불러오는 데 실패했습니다.');
}

export async function getKakaoAccessToken(code: string): Promise<LoginResponse> {
  const response = await fetch(process.env.REST_API_URL + '/api/v1/member/login/kakao', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (response.ok) return await response.json();

  throw new UnauthorizedError('로그인 정보를 불러오는 데 실패했습니다.');
}

export async function getNaverAccessToken(code: string, state: string): Promise<LoginResponse> {
  const response = await fetch(process.env.REST_API_URL + '/api/v1/member/login/naver', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, state }),
  });

  if (response.ok) return await response.json();

  throw new UnauthorizedError('로그인 정보를 불러오는 데 실패했습니다.');
}
