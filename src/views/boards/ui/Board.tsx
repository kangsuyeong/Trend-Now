import { BoardHeader } from '@/widgets/boards';
import { BoardSection } from '@/features/board';

interface BoardProps {
  boardId: number;
}

export default function Board({ boardId }: BoardProps) {
  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <BoardHeader boardId={boardId} />
        <BoardSection boardId={boardId} />
      </div>
    </div>
  );
}
