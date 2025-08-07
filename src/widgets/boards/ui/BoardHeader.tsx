import { BoardName } from '@/entities/board';
import { BoardWriteButton } from '@/features/board';
import { DateDivider } from '@/shared/ui';

interface BoardHeaderProps {
  boardId: number;
}

const BoardHeader = ({ boardId }: BoardHeaderProps) => {
  return (
    <div className="flex flex-col gap-y-6">
      <DateDivider date={new Date()} background="black" />
      <div className="flex flex-col gap-2">
        <div className="text-md font-regular text-gray-500">
          이곳은 타이머 없는 이야기의 공간입니다. 누구나, 무엇이든 이야기 해보세요.
        </div>
        <div className="flex items-end justify-between">
          <BoardName boardId={boardId} className="text-3xl font-bold text-gray-800" />
          <BoardWriteButton boardId={boardId} />
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
