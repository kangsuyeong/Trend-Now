'use client';

import React from 'react';
import { Pencil24, PrimaryButton } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/shared/store';

interface BoardWriteButtonProps {
  boardId: number;
}

export default function BoardWriteButton({ boardId }: BoardWriteButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  const handleWriteClick = () => {
    if (isAuthenticated) {
      router.push(`/board/${boardId}/write`);
    } else {
      alert('로그인 후 작성하실 수 있습니다.');
    }
  };

  return (
    <PrimaryButton variant="primary" size="m" className="pl-4" onClick={handleWriteClick}>
      <span className="flex items-center gap-x-1.5">
        <Pencil24 />
        글쓰기
      </span>
    </PrimaryButton>
  );
}
