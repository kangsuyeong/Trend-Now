import { Post } from '@/views/post';

export default async function Page({
  params,
}: {
  params: Promise<{ boardId: string; postId: string }>;
}) {
  const { boardId, postId } = await params;

  return <Post postId={Number(postId)} boardId={Number(boardId)} />;
}
