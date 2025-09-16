import searchAnimation from '../lottie/search.json';
import Lottie from 'lottie-react';

const BoardListEmpty = () => {
  return (
    <div className="flex h-[27.5rem] w-full flex-col items-center justify-center bg-gray-100">
      <div className="w-32">
        <Lottie animationData={searchAnimation} />
      </div>
      <p className="whitespace-pre-line text-center text-sm font-medium text-gray-500">
        {'아직 아무도 글 안 썼어요...\n이 게시판의 첫 주인공이 되어볼래요?'}
      </p>
    </div>
  );
};

export default BoardListEmpty;
