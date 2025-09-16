import Lottie from 'lottie-react';
import pencilAnimation from '../lottie/pencil.json';

export default function CommentsEmpty() {
  return (
    <div className="flex h-[100px] w-full flex-col items-center justify-center gap-y-0.5 rounded-2xl bg-gray-200">
      <Lottie animationData={pencilAnimation} className="h-8 w-8" />
      <span className="text-sm font-medium text-gray-500">
        아직 댓글이 없어요. 첫 댓글을 남겨보세요!
      </span>
    </div>
  );
}
