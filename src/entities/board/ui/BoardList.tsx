import { PostInfo } from '@/shared/types';
import BoardRow from './BoardRow';
import { BOARD_PAGE_SIZE } from '@/shared/constants';

interface BoardListProps {
  posts: PostInfo[];
  totalCount: number; // 전체 게시물 수
  page: number; // 현재 페이지
}

export default function BoardList({ posts, totalCount, page }: BoardListProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2 border-b border-gray-200 px-2 pb-3 *:text-sm *:font-regular *:text-gray-500">
        <span className="w-12 text-center">번호</span>
        <span className="flex-1 text-left">게시글 제목</span>
        <span className="w-[6.25rem] text-center">닉네임</span>
        <span className="w-12 text-center">조회수</span>
        <span className="w-12 text-center">추천</span>
        <span className="w-12 text-center">일자</span>
      </div>
      {/* 공지사항 부분 주석처리 */}
      {/* {new Array(2).fill(0).map((_, idx) => (
          <BoardRow
            key={idx}
            number={125}
            title={'이승기, 前소속사 정산금 소송 이겼다'}
            nickname={'Trendnow'}
            views={125}
            likes={2324}
            created={new Date()}
            comments={123}
            type="noti"
          />
        ))} */}

      {posts.map((post, index) => {
        const postNumber = totalCount - (page - 1) * BOARD_PAGE_SIZE - index;
        return <BoardRow key={post.postId} post={post} postNumber={postNumber} type="normal" />;
      })}
    </div>
  );
}
