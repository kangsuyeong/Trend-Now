'use client';

import { getGoogleAccessToken } from '@/features/login';
import { UnauthorizedError } from '@/shared/error/error';
import { useUserStore } from '@/shared/store';
import { redirect, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Redirect />
    </Suspense>
  );
}

function Redirect() {
  const code = useSearchParams().get('code');

  const { login } = useUserStore();

  useEffect(() => {
    if (code) {
      getGoogleAccessToken(code).then((res) => {
        const token = res.jwt;

        if (token) {
          login(res.jwt, res.memberId);

          redirect('/home');
        } else {
          throw new UnauthorizedError('토큰 정보를 불러오지 못했습니다.');
        }
      });
    }
  }, [code]);

  if (!code) throw new UnauthorizedError('인가 코드 정보를 불러오지 못했습니다.');

  return <div>구글 로그인 리다이렉트중...</div>;
}
