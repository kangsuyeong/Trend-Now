import { cn } from '@/shared/lib';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

interface BoardNameProps {
  boardId: number;
  className?: string;
  icon?: ReactNode;
  isHotBoard?: boolean;
}

export default async function BoardName({ boardId, className, icon, isHotBoard }: BoardNameProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/api/v1/boards/${boardId}/name`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    notFound(); // 👈 에러 발생 시 404 페이지로 리다이렉트
  }

  const boardName = await response.text();

  return (
    <div className={cn('flex items-center gap-1', className, isHotBoard && 'text-blue-500')}>
      {icon && icon}
      <span>
        {boardName}
        {isHotBoard && <span className="text-gray-900"> 게시판</span>}
      </span>
    </div>
  );
}
