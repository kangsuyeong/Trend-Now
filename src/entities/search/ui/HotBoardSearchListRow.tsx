import type { RealtimeBoard } from '@/shared/types';
import { CountdownTimer } from '@/shared/ui';
import Link from 'next/link';

const HotBoardSearchListRow = ({ board }: { board: RealtimeBoard }) => {
  return (
    <div className="flex h-14 items-center justify-between pl-2 pr-4">
      <Link href={'/'} className="text-lg font-semiBold text-gray-800 hover:underline">
        {board.boardName}
      </Link>
      <div className="flex items-center gap-x-2 text-center text-sm font-regular text-gray-500">
        <div className="w-16">{board.postCount.toLocaleString()}</div>
        {/* 총 조회수 -> 추후 추가 */}
        <div className="w-16">0</div>
        <CountdownTimer initialSeconds={board.boardLiveTime} />
      </div>
    </div>
  );
};

export default HotBoardSearchListRow;
