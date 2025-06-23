import { axiosPost } from '@/shared/api';
import { PostDetailResponse } from '@/shared/types';
import { Comments } from '@/widgets/comments';
import { Content, Header } from '@/widgets/post';
import { useQuery } from '@tanstack/react-query';

interface PostProps {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} postId 게시판 아이디 */
  boardId: number;
}

export default function Post({ postId, boardId }: PostProps) {
  const { data: post } = useQuery({
    queryKey: ['postDetail', boardId, postId],
    queryFn: () => axiosPost<PostDetailResponse>(boardId, postId),
    select: (data) => data.postInfoDto,
  });
  if (!post) return null;

  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <Header post={post} />
        <Content post={post} />
        <Comments />
      </div>
    </div>
  );
}
