'use client';

import { InternalServerError, UnauthorizedError } from '@/shared/error/error';
import { useUserStore } from '@/shared/store';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Redirect />
    </Suspense>
  );
}

function Redirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('jwt');
  const redirectPath = searchParams.get('redirectPath');

  const { login } = useUserStore();

  useEffect(() => {
    if (!redirectPath) throw new InternalServerError('리다이렉트 주소를 불러오지 못했습니다.');
    if (!token) throw new UnauthorizedError('토큰 정보를 불러오지 못했습니다.');

    login(token);

    router.push(redirectPath);
  }, []);

  return <div>로그인 리다이렉트중...</div>;
}
