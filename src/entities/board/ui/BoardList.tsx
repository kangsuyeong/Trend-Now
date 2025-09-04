import { PostInfo } from '@/shared/types';
import BoardRow from './BoardRow';
import BoardListEmpty from './BoardListEmpty';

interface BoardListProps {
  /** 전체 게시글 정보 */
  posts: PostInfo[];
  /** 링크 prefix 명시 */
  basePath: string;
  /** 번호 표시 여부 (기본값 true) */
  showNumber?: boolean;
}

export default function BoardList({ posts, basePath, showNumber }: BoardListProps) {
  if (posts.length === 0) return <BoardListEmpty />;
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <BoardRow key={post.postId} post={post} basePath={basePath} showNumber={showNumber} />
      ))}
    </div>
  );
}
