import { PostWrite } from '@/features/write';
import { BOARD_MAP } from '@/shared/constants';
import { BoardType } from '@/shared/types';

export default async function Page({ params }: { params: Promise<{ board: string }> }) {
  const { board } = await params;
  const boardName = BOARD_MAP[board as BoardType].name;
  const boardId = BOARD_MAP[board as BoardType].id;
  const path = BOARD_MAP[board as BoardType].path;
  return <PostWrite boardName={boardName} boardId={boardId} path={path} />;
}
