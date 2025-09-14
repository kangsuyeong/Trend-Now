'use client';

import { InternalServerError } from '@/shared/error/error';
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
  const redirectPath = searchParams.get('redirectPath');

  useEffect(() => {
    if (!redirectPath) throw new InternalServerError('리다이렉트 주소를 불러오지 못했습니다.');

    router.push(redirectPath);
  }, []);

  return <div>로그인 리다이렉트중...</div>;
}
