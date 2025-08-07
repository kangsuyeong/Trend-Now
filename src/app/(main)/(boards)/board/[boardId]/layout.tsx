import { BOARD_MAP } from '@/shared/constants';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ boardId: string }>;
  children: ReactNode;
}) {
  const { boardId } = await params;
  const validBoardIds: number[] = Object.values(BOARD_MAP).map((board) => board.id);

  if (!validBoardIds.includes(Number(boardId))) {
    notFound();
  }

  return <>{children}</>;
}
