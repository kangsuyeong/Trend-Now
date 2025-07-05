'use client';
import Write from './Write';
import { axiosPost, axiosUpdatePost } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { PostDetailResponse, RichTextEditorHandle } from '@/shared/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { extractImageIdsFromDelta } from '../lib';
import { useQuery } from '@tanstack/react-query';

interface postEditeProps {
  /** 게시판 이름 */
  boardName: string;
  /** 게시판 id */
  boardId: number;
  /** 게시물 id */
  postId: number;
  /** path */
  path: string;
}

const PostEdit = ({ boardName, boardId, postId, path }: postEditeProps) => {
  const router = useRouter();
  const { jwt } = useUserStore();
  const editorRef = useRef<RichTextEditorHandle>(null); // 에디터 내용(DOM)이나 메서드에 접근하기 위한 ref
  const titleRef = useRef<HTMLInputElement>(null); // 제목 저장하는 ref
  const originalImageIdsRef = useRef<number[]>([]); // 수정 전 에디터에 포함된 이미지 ID 목록 저장용

  const { data } = useQuery({
    queryKey: ['postDetail', boardId, postId],
    queryFn: () => axiosPost<PostDetailResponse>(boardId, postId),
  });
  const post = data?.postInfoDto;
  const images = data?.imageInfos;

  const handleSubmit = async () => {
    const title = titleRef.current?.value.trim();
    const delta = editorRef.current?.getContents();
    if (!title || !delta) {
      return alert('제목 또는 내용을 입력해주세요');
    }
    const content = JSON.stringify(delta);
    // 현재 Delta에서 추출한 이미지 ID 목록
    const newImageIdList = extractImageIdsFromDelta(delta);
    const deleteImageIdList = originalImageIdsRef.current.filter(
      (id) => !newImageIdList.includes(id)
    );

    if (!jwt) {
      // 로그인 안 된 상태이므로 요청 중단
      return;
    }
    await axiosUpdatePost(jwt, boardId, postId, title, content, newImageIdList, deleteImageIdList);
    router.push(`${path}`);
  };

  // post 데이터가 로드되면 제목 input과 이미지 ID 초기값 설정
  useEffect(() => {
    // 제목 초기값 설정
    if (post && titleRef.current) {
      titleRef.current.value = post.title;
    }

    // 이미지 ID 초기값 저장
    if (images) {
      originalImageIdsRef.current = images.map((img) => img.id);
    }
  }, [post, images]);

  return (
    <Write
      boardName={boardName}
      titleRef={titleRef}
      editorRef={editorRef}
      onSubmit={handleSubmit}
      initialDelta={post?.content ? JSON.parse(post.content) : undefined}
    />
  );
};

export default PostEdit;
