'use client';

import { useEffect } from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div>로그인 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</div>;
}
