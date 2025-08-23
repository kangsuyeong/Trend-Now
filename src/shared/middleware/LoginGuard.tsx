'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/shared/store';
import { useRouter } from 'next/navigation';

interface LoginGuardProps {
  children: React.ReactNode;
  errorMessage?: string;
  redirectPath?: string;
}

export default function LoginGuard({ children, errorMessage, redirectPath }: LoginGuardProps) {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      alert(errorMessage || '로그인이 필요한 서비스입니다.');

      // 리다이렉트 경로가 명시된 경우 해당 경로로 이동, 없을 경우 이동하지 않음
      if (redirectPath) {
        router.replace(redirectPath);
      }
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
}
