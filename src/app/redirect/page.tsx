'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get('code'));
  }, [searchParams]);

  return <div>리다이렉트중...</div>;
}
