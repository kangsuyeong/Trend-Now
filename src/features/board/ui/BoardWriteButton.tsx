'use client';

import React from 'react';
import { Pencil24, PrimaryButton } from '@/shared/ui';
import { useUserStore } from '@/shared/store';
import { axiosCheckWriteCooldown } from '@/shared/api';
import { WriteCooldownResponse } from '@/shared/types';
import { useRouter } from 'next/navigation';

interface BoardWriteButtonProps {
  href: string;
  boardId: number;
}

export default function BoardWriteButton({ href, boardId }: BoardWriteButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  const handleWriteButton = async () => {
    const result = await axiosCheckWriteCooldown<WriteCooldownResponse>(boardId);

    if (result.canWritePost) {
      router.push(href);
    } else {
      alert(`${result.cooldownSeconds}초 후 게시글 작성이 가능합니다.`);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <PrimaryButton variant="primary" size="m" className="pl-4" onClick={handleWriteButton}>
      <span className="flex items-center gap-x-1.5">
        <Pencil24 />
        글쓰기
      </span>
    </PrimaryButton>
  );
}
