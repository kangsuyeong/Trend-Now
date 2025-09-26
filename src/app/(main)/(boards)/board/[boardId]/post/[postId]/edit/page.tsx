import { BoardName } from '@/entities/board';
import { PostEdit } from '@/features/write';
import Image from 'next/image';

export default async function Page({
  params,
}: {
  params: Promise<{ boardId: string; postId: string }>;
}) {
  const { boardId, postId } = await params;

  const basePath = `/board`;
  return (
    <div className="flex flex-col gap-4">
      <BoardName
        boardId={Number(boardId)}
        className="border-b border-gray-200 pb-4 text-2xl font-bold"
        icon={
          <Image
            src="/images/icons/icon_penceil_32X32.png"
            width={32}
            height={32}
            alt="연필 아이콘"
          />
        }
      />
      <PostEdit boardId={Number(boardId)} postId={Number(postId)} basePath={basePath} />
    </div>
  );
}
