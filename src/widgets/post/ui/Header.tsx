import { BookmarkButton, PostKebabButton } from '@/features/post';
import { PostDetail } from '@/shared/types';
import { UserProfile28 } from '@/shared/ui';
import dayjs from 'dayjs';

interface HeaderProps {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} postId 게시판 아이디 */
  boardId: number;
  /**@param {PostDetail} post 게시글 정보 */
  post: PostDetail;
}

export default function Header({ postId, boardId, post }: HeaderProps) {
  const pathname = usePathname(); //  현재 URL 경로를 문자열로 가져옴
  const boardType = pathname.split('/')[1] as keyof typeof BOARD_MAP; // 예: "/free/post/6" → "free"
  const boardName = BOARD_MAP[boardType].name;

  return (
    <div className="flex flex-col gap-y-8 border-b border-gray-200 pb-6">
      <div className="flex justify-between">
        <span className="flex flex-col gap-y-3">
          <span className="text-lg font-semiBold text-gray-500">임시 게시판</span>
          <span className="text-2xl font-bold text-gray-800">{post.title}</span>
        </span>
        <span className="flex gap-x-2">
          <BookmarkButton postId={postId} boardId={boardId} scraped={post.scraped} />
          <PostKebabButton />
        </span>
      </div>
      <div className="flex justify-between">
        <span className="flex items-center gap-x-2">
          <UserProfile28 />
          <span className="text-base font-medium text-gray-500">{post.writer}</span>
        </span>
        <span className="flex items-center text-sm font-regular text-gray-500">
          <span className="flex items-center gap-x-1.5 rounded-md bg-gray-100 px-2.5 py-1">
            <span>댓글</span>
            <span>{post.commentCount.toLocaleString()}</span>
          </span>
          <span className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>조회수</span>
            <span>{post.viewCount.toLocaleString()}</span>
          </span>
          <span className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>추천</span>
            <span>{post.likeCount.toLocaleString()}</span>
          </span>
          <span className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>작성일</span>
            <span>{dayjs(post.updatedAt).format('YYYY.MM.DD')}</span>
          </span>
        </span>
      </div>
    </div>
  );
}
