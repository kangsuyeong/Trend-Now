import { PostWrite } from '@/features/write';

export default async function Page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;
  const path = `/board/${boardId}`;
  return <PostWrite boardName={'임시'} boardId={Number(boardId)} path={path} />;
}
