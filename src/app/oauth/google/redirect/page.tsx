'use client';

import { getAccessToken } from '@/features/login';
import { UnauthorizedError } from '@/shared/error/error';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
  const code = useSearchParams().get('code');

  useEffect(() => {
    const login = async () => {
      if (code) {
        const result = await getAccessToken(code);

        const token = result.jwt;

        console.log(token);
        // 로그인 정보 쿠키 or local storage 설정 추가
      }
    };

    login();
  }, [code]);

  if (!code) throw new UnauthorizedError('인가 코드 정보를 불러오지 못했습니다.');

  return <div>리다이렉트중...</div>;
}
