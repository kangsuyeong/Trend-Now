import { BoardType } from '@/shared/types';
import { Write } from '@/views/write';

export default async function Page({ params }: { params: Promise<{ board: string }> }) {
  const { board } = await params;
  return <Write boardType={board as BoardType} />;
}
