'use server';

import { UnauthorizedError } from '@/shared/error/error';

export async function getUserInfo(jwt: string) {
  const response = await fetch(process.env.REST_API_URL + '', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });

  if (response.ok) return await response.json();

  throw new UnauthorizedError('유저 정보를 불러오는 데 실패했습니다.');
}
