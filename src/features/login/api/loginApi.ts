'use server';

import { UnauthorizedError } from '@/shared/error/error';
import { LoginResponse } from '../types';

export async function getAccessToken(code: string): Promise<LoginResponse> {
  const response = await fetch(process.env.REST_API_URL + '/api/v1/member/login/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  console.log(response);

  if (response.ok) return await response.json();

  throw new UnauthorizedError('로그인 정보를 불러오는 데 실패했습니다.');
}
