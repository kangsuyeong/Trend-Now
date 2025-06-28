import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ board: string }>;
  children: ReactNode;
}) {
  // board가 free, entertain, politics가 아니면 404페이지로 이동
  const { board } = await params;
  if (board !== 'free' && board !== 'entertain' && board !== 'politics') {
    notFound();
  }
  return <>{children}</>;
}
