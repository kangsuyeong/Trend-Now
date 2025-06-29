import { BoardType } from '@/shared/types';
import { Board } from '@/views/boards';

export default async function Page({ params }: { params: Promise<{ board: string }> }) {
  const { board } = await params;
  return <Board type={board as BoardType} />;
}
