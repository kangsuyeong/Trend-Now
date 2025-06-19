'use server';

import { UnauthorizedError } from '@/shared/error/error';
import { axiosUserProfile } from '@/shared/api';
import { UserProfile } from '@/entities';

export async function getUserInfo(jwt: string): Promise<UserProfile> {
  const result = axiosUserProfile<UserProfile>(jwt)
    .then((res) => {
      return res;
    })
    .catch(() => {
      throw new UnauthorizedError('로그인 정보를 불러오는 데 실패했습니다.');
    });

  return result;
}
