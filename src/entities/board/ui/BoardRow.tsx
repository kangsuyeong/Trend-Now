import { PostInfo } from '@/shared/types';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { BadgeButton } from '@/shared/ui';
import Link from 'next/link';
import dayjs from 'dayjs';

const rowVariants = cva('flex px-2 items-center gap-2', {
  variants: {
    type: {
      noti: 'bg-brand-100 rounded-2xl h-[4.25rem]',
      issue: 'border-b border-gray-200 h-[4.25rem]',
      normal: 'border-b border-gray-200 h-[3.75rem]',
    },
  },
});

interface BoardRowProps {
  /** 게시글 정보 */
  post: PostInfo;
  /** 게시글 종류 */
  type?: 'noti' | 'issue' | 'normal';
  /** 링크 prefix 명시 */
  basePath: string;
  /** 번호 표시 여부 (기본값 true) */
  showNumber?: boolean;
}

export default function BoardRow({
  post,
  type = 'normal',
  basePath,
  showNumber = true,
}: BoardRowProps) {
  // 게시글 유형에 따라 배지(Badge)를 렌더링합니다.
  const getBadge = () => {
    if (type === 'noti') return <BadgeButton variant="yellow">공지</BadgeButton>;
    if (type === 'issue') return <BadgeButton variant="blue">이슈</BadgeButton>;
    return null;
  };
  return (
    <div className={cn(rowVariants({ type }))}>
      {/* 번호 */}
      {showNumber && (
        <div className="w-12 shrink-0 text-center text-sm font-regular text-gray-500">
          {post.postId}
        </div>
      )}
      {getBadge()}
      <div className="flex min-w-0 flex-1 items-center gap-x-1.5">
        <Link
          href={`${basePath}/post/${post.postId}`}
          className="truncate text-md font-semibold text-gray-800 hover:underline"
        >
          {post.title}
        </Link>
        <div className="text-xs font-regular text-gray-500">
          [{post.commentCount.toLocaleString()}]
        </div>
      </div>

      <div className="flex w-[6.25rem] shrink-0 items-center gap-x-1.5">
        <Image
          src="/images/icons/icon_profile_88x88.png"
          alt="프로필 사진"
          width={20}
          height={20}
        />
        <div className="text-xs font-regular text-gray-500">{post.writer}</div>
      </div>
      <div className="w-12 shrink-0 text-center text-sm font-regular text-gray-500">
        {post.viewCount.toLocaleString()}
      </div>
      <div className="w-12 shrink-0 text-center text-sm font-regular text-gray-500">
        {post.likeCount.toLocaleString()}
      </div>
      <div className="w-12 shrink-0 text-center text-sm font-regular text-gray-500">
        {dayjs(post.createdAt).format('MM.DD')}
      </div>
    </div>
  );
}
