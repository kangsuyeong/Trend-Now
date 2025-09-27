import { EmptyState } from '@/shared/ui';
import HotBoardSearchListRow from './HotBoardSearchListRow';
import type { RealtimeBoard } from '@/shared/types';

interface HotBoardSearchListProps {
  boards: RealtimeBoard[];
}

const HotBoardSearchList = ({ boards }: HotBoardSearchListProps) => {
  if (boards.length === 0) {
    return (
      <EmptyState className="h-80">
        <EmptyState.Text>검색하신 키워드에 대한 게시판이 아직 없습니다.</EmptyState.Text>
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between gap-x-3 text-nowrap border-b border-gray-200 px-2 pb-3 text-sm text-gray-500">
        <div>게시판</div>
        <div className="flex gap-2 text-center">
          <div className="w-16">게시물 수</div>
          <div className="w-16">총 조회수</div>
          <div className="w-[5.625rem]">타이머</div>
        </div>
      </div>
      <div className="flex flex-col">
        {boards.map((board) => (
          <HotBoardSearchListRow key={board.boardId} board={board} />
        ))}
      </div>
    </div>
  );
};

export default HotBoardSearchList;
