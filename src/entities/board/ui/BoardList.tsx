import { PostInfo } from '@/shared/types';
import BoardRow from './BoardRow';
import { EmptyState } from '@/shared/ui';
import searchAnimation from '../lottie/search.json';
import Lottie from 'lottie-react';

interface BoardListProps {
  /** 전체 게시글 정보 */
  posts: PostInfo[];
  /** 링크 prefix 명시 */
  basePath: string;
  /** 번호 표시 여부 (기본값 true) */
  showNumber?: boolean;
}

export default function BoardList({ posts, basePath, showNumber }: BoardListProps) {
  if (posts.length === 0)
    return (
      <EmptyState className="h-[27.5rem]">
        <div className="w-32">
          <Lottie animationData={searchAnimation} />
        </div>
        <EmptyState.Text>
          {'아직 아무도 글 안 썼어요...\n이 게시판의 첫 주인공이 되어볼래요?'}
        </EmptyState.Text>
      </EmptyState>
    );

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <BoardRow key={post.postId} post={post} basePath={basePath} showNumber={showNumber} />
      ))}
    </div>
  );
}
