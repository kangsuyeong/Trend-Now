import { PostInfo } from '@/shared/types';
import BoardRow from './BoardRow';
import { BOARD_PAGE_SIZE } from '@/shared/constants';

interface BoardListProps {
  /** 전체 게시글 정보 */
  posts: PostInfo[];
  /** 전체 게시물 수 */
  totalCount: number;
  /** 현재 페이지 */
  page: number;
  /** 링크 prefix 명시 */
  basePath: string;
  /** 번호 표시 여부 (기본값 true) */
  showNumber?: boolean;
}

export default function BoardList({
  posts,
  totalCount,
  page,
  basePath,
  showNumber,
}: BoardListProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between gap-2 border-b border-gray-200 px-2 pb-3 text-center text-sm text-gray-500">
        <div className="flex gap-2">
          {showNumber && <div className="w-12">번호</div>}
          <div className="text-left">게시글 제목</div>
        </div>

        <div className="flex gap-2">
          <div className="w-[6.25rem]">닉네임</div>
          <div className="w-12">조회수</div>
          <div className="w-12">추천</div>
          <div className="w-12">일자</div>
        </div>
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
        return (
          <BoardRow
            key={post.postId}
            post={post}
            postNumber={postNumber}
            basePath={basePath}
            showNumber={showNumber}
          />
        );
      })}
    </div>
  );
}
