import { Board } from '@/views/boards';

export default async function Page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;
  return <Board boardId={Number(boardId)} />;
}
