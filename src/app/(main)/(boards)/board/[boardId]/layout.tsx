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
  const validBoardIds = ['11', '12', '13'];

  if (!validBoardIds.includes(boardId)) {
    notFound();
  }

  return <>{children}</>;
}
