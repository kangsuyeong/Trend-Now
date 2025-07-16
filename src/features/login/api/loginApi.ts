'use server';

import { UnauthorizedError } from '@/shared/error/error';
import { LoginResponse } from '../types';
import { axiosGoogleAccessToken, axiosKakaoAccessToken, axiosNaverAccessToken } from '@/shared/api';

export async function getGoogleAccessToken(code: string): Promise<LoginResponse> {
  const result = axiosGoogleAccessToken<LoginResponse>(code)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.error(e.response);
      throw new UnauthorizedError(e);
    });

  return result;
}

export async function getKakaoAccessToken(code: string): Promise<LoginResponse> {
  const result = axiosKakaoAccessToken<LoginResponse>(code)
    .then((res) => {
      return res;
    })
    .catch(() => {
      throw new UnauthorizedError('로그인 정보를 불러오는 데 실패했습니다.');
    });

  return result;
}

export async function getNaverAccessToken(code: string, state: string): Promise<LoginResponse> {
  const result = axiosNaverAccessToken<LoginResponse>(code, state)
    .then((res) => {
      return res;
    })
    .catch(() => {
      throw new UnauthorizedError('로그인 정보를 불러오는 데 실패했습니다.');
    });

  return result;
}
