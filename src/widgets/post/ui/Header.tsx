import { BookmarkButton, PostKebabButton } from '@/features/post';
import { cn } from '@/shared/lib';
import { PostDetail } from '@/shared/types';
import { UserProfile28 } from '@/shared/ui';
import dayjs from 'dayjs';

interface HeaderProps {
  /** 게시글 상세 정보 */
  post: PostDetail;

  /** 인기 게시판 여부 (선택) */
  isHotBoard?: boolean;

  /** 게시판 ID */
  boardId: number;

  /** 게시글 ID */
  postId: number;
}

export default function Header({ post, isHotBoard, boardId, postId }: HeaderProps) {
  return (
    <div className="flex flex-col gap-y-8 border-b border-gray-200 pb-6">
      <div className="flex justify-between">
        <span className="flex flex-col gap-y-3">
          <span
            className={cn('text-lg font-semiBold', isHotBoard ? 'text-brand-500' : 'text-gray-500')}
          >
            {post.boardName}
          </span>
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
