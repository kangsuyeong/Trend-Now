'use client';

import React from 'react';
import { Pencil24, PrimaryButton } from '@/shared/ui';
import { useUserStore } from '@/shared/store';
import Link from 'next/link';

interface BoardWriteButtonProps {
  href: string;
}

export default function BoardWriteButton({ href }: BoardWriteButtonProps) {
  const { isAuthenticated } = useUserStore();

  if (!isAuthenticated) return null;

  return (
    <Link href={href}>
      <PrimaryButton variant="primary" size="m" className="pl-4">
        <span className="flex items-center gap-x-1.5">
          <Pencil24 />
          글쓰기
        </span>
      </PrimaryButton>
    </Link>
  );
}
