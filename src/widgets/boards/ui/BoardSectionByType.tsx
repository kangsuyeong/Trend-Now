import EntertainBoardSection from './EntertainBoardSection';
import FreeBoardSection from './FreeBoardSection';
import PoliticsBoardSection from './PoliticsBoardSection';

interface BoardSectionByTypeProps {
  /**@param {'entertain' | 'free' | 'politics'} type 고정게시판 종류 */
  type: 'entertain' | 'free' | 'politics';
}

// 게시판 종류에 따라서 리스트 분기 처리
const BoardSectionByType = ({ type }: BoardSectionByTypeProps) => {
  switch (type) {
    case 'free':
      return <FreeBoardSection />;
    case 'entertain':
      return <EntertainBoardSection />;
    case 'politics':
      return <PoliticsBoardSection />;
    default:
      return null;
  }
};

export default BoardSectionByType;
