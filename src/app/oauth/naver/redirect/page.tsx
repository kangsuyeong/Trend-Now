'use client';

import { getNaverAccessToken } from '@/features/login';
import { UnauthorizedError } from '@/shared/error/error';
import { LocalStorage } from '@/shared/model';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  useEffect(() => {
    if (code && state) {
      getNaverAccessToken(code, state).then((res) => {
        const token = res.jwt;

        LocalStorage.setItem('accessToken', token);

        console.log(LocalStorage.getItem('accessToken'));
      });
    }
  }, [code, state]);

  if (!code) throw new UnauthorizedError('인가 코드 정보를 불러오지 못했습니다.');
  if (!state) throw new UnauthorizedError('state 정보가 일치하지 않습니다.');

  return <div>네이버 로그인 리다이렉트중...</div>;
}
