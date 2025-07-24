import { NotFoundError } from '@/shared/error/error';
import { HotBoard } from '@/views/hotBoards';

export default async function Page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;

  if (!boardId) throw new NotFoundError();

  return <HotBoard boardId={Number(boardId)} />;
}
