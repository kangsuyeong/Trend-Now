import { BoardName } from '@/entities/board';
import { PostWrite } from '@/features/write';
import Image from 'next/image';

export default async function Page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;
  const basePath = `/hotboard`;
  return (
    <div className="flex flex-col gap-4">
      <BoardName
        boardId={Number(boardId)}
        className="border-b border-gray-200 pb-4 text-2xl font-bold"
        isHotBoard
        icon={
          <Image
            src="/images/icons/icon_penceil_32X32.png"
            width={32}
            height={32}
            alt="연필 아이콘"
          />
        }
      />
      <PostWrite boardId={Number(boardId)} basePath={basePath} />
    </div>
  );
}
