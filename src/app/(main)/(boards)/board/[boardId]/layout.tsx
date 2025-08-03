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
  const validBoardIds = ['1814', '1815', '1816'];

  if (!validBoardIds.includes(boardId)) {
    notFound();
  }

  return <>{children}</>;
}
