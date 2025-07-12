import { BOARD_MAP } from '@/shared/constants';
import { BoardType } from '@/shared/types';
import { Post } from '@/views/post';

export default async function Page({
  params,
}: {
  params: Promise<{ board: string; postId: string }>;
}) {
  const { board, postId } = await params;
  const boardId = BOARD_MAP[board as BoardType].id;

  return <Post postId={Number(postId)} boardId={boardId} />;
}
