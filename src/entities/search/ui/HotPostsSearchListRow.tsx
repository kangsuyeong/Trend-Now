import Image from 'next/image';
import type { RealtimePost } from '@/shared/types';
import dayjs from 'dayjs';
import Link from 'next/link';

interface HotPostsSearchListRowProps {
  post: RealtimePost;
}

export default function HotPostsSearchListRow({ post }: HotPostsSearchListRowProps) {
  return (
    <div className="flex h-20 items-center justify-between gap-x-2 px-2">
      <div className="flex flex-col gap-y-1">
        {/* 게시판 이름 */}
        <Link href={`/hotboard/${post.boardId}`} className="text-xs font-medium text-brand-500">
          {post.boardName}
        </Link>
        {/* 게시물 이름 */}
        <div className="flex items-center gap-x-1.5">
          <Link
            href={`/hotboard/${post.boardId}/post/${post.postId}`}
            className="text-md font-semiBold text-gray-800 hover:underline"
          >
            {post.title}
          </Link>
          <div className="text-xs text-gray-500">[{post.commentCount.toLocaleString()}]</div>
        </div>
      </div>
      {/* 닉네임 / 조회수 / 추천 / 일자 */}
      <div className="flex gap-2">
        <div className="flex w-[6.25rem] items-center gap-x-1.5">
          <Image
            src="/images/icons/icon_profile_88x88.png"
            alt="프로필 사진"
            width={20}
            height={20}
          />
          <span className="text-xs font-regular text-gray-500">{post.writer}</span>
        </div>
        <div className="w-12 text-center text-sm font-regular text-gray-500">
          {post.viewCount.toLocaleString()}
        </div>
        <div className="w-12 text-center text-sm font-regular text-gray-500">
          {post.likeCount.toLocaleString()}
        </div>
        <div className="w-12 text-center text-sm font-regular text-gray-500">
          {dayjs(post.createAt).format('MM.DD')}
        </div>
      </div>
    </div>
  );
}
