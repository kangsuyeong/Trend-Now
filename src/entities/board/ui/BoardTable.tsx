import BoardListHeader from './BoardListHeader';
import { ReactNode } from 'react';

interface BoardTableProps {
  children: ReactNode;
  /** 번호 표시 여부 */
  showNumber?: boolean;
}

const BoardTable = ({ children, showNumber }: BoardTableProps) => {
  return (
    <div className="flex flex-col gap-2">
      <BoardListHeader showNumber={showNumber} />
      {children}
    </div>
  );
};

export default BoardTable;
