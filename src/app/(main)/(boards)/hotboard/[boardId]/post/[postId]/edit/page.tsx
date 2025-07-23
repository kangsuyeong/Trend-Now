import { PostEdit } from '@/features/write';

export default async function Page({
  params,
}: {
  params: Promise<{ boardId: string; postId: string }>;
}) {
  const { boardId, postId } = await params;

  const path = `/hotboard/${boardId}`;
  return (
    <PostEdit boardName={'임시'} boardId={Number(boardId)} postId={Number(postId)} path={path} />
  );
}
