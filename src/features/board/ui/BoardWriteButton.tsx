'use client';

import React, { useState } from 'react';
import { Pencil, PrimaryButton } from '@/shared/ui';
import { axiosCheckWriteCooldown } from '@/shared/api';
import { WriteCooldownResponse } from '@/shared/types';
import { useRouter } from 'next/navigation';
import { RequireLoginModal } from '@/features/login';

interface BoardWriteButtonProps {
  href: string;
  boardId: number;
}

export default function BoardWriteButton({ href, boardId }: BoardWriteButtonProps) {
  const router = useRouter();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleWriteButton = async () => {
    try {
      const result = await axiosCheckWriteCooldown<WriteCooldownResponse>(boardId);

      if (result.canWritePost) {
        router.push(href);
      } else {
        alert(`${result.cooldownSeconds}초 후 게시글 작성이 가능합니다.`);
      }
    } catch {
      setIsLoginModalOpen(true);
      return;
    }
  };

  return (
    <>
      <PrimaryButton variant="primary" size="m" className="pl-4" onClick={handleWriteButton}>
        <span className="flex items-center gap-x-1.5">
          <Pencil className="h-6 w-6 text-white" />
          글쓰기
        </span>
      </PrimaryButton>
      <RequireLoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
