import HotPostsSearchListRow from './HotPostsSearchListRow';
import type { RealtimePost } from '@/shared/types';

interface HotPostsSearchListProps {
  posts: RealtimePost[];
}

const HotPostsSearchList = ({ posts }: HotPostsSearchListProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between gap-x-2 border-b border-gray-200 px-2 pb-3 text-sm font-regular text-gray-500">
        <div>게시글 제목</div>
        <div className="flex gap-2 text-center">
          <div className="w-[6.25rem]">닉네임</div>
          <div className="w-12">조회수</div>
          <div className="w-12">추천</div>
          <div className="w-12">일자</div>
        </div>
      </div>
      {posts.map((post) => (
        <HotPostsSearchListRow key={post.boardId} post={post} />
      ))}
    </div>
  );
};

export default HotPostsSearchList;
