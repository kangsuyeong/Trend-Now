'use client';
import Write from './Write';
import { axiosPost, axiosUpdatePost } from '@/shared/api';
import { PostDetailResponse, RichTextEditorHandle } from '@/shared/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import processDelta from '../lib/processDelta';

interface postEditeProps {
  /** 게시판 id */
  boardId: number;
  /** 게시물 id */
  postId: number;
  /** path */
  path: string;
}

const PostEdit = ({ boardId, postId, path }: postEditeProps) => {
  const router = useRouter();
  const editorRef = useRef<RichTextEditorHandle>(null); // 에디터 내용(DOM)이나 메서드에 접근하기 위한 ref
  const titleRef = useRef<HTMLInputElement>(null); // 제목 저장하는 ref
  const originalImageIdsRef = useRef<number[]>([]); // 수정 전 에디터에 포함된 이미지 ID 목록 저장용

  const { data, isLoading } = useQuery({
    queryKey: ['postDetail', boardId, postId],
    queryFn: () => axiosPost<PostDetailResponse>(boardId, postId),
    select: (data) => data.data,
  });
  const post = data?.postInfoDto;
  const images = data?.imageInfos;

  const handleSubmit = async () => {
    const title = titleRef.current?.value.trim();
    const delta = editorRef.current?.getContents();
    const uploadsByTempId = editorRef.current?.getUploadsByTempId();

    if (!title || !delta) {
      alert('제목 또는 내용을 입력해주세요');
      return;
    }

    // 모든 이미지가 다 업로드 되었는지 확인
    const isAllUploaded = Object.values(uploadsByTempId!).every((item) => item.status === 'ok');

    if (!isAllUploaded) {
      alert('이미지를 업로드 중입니다. 잠시만 기다려주세요.');
      return;
    }

    const { newDelta, imageIds } = processDelta(delta!, uploadsByTempId!);
    const deleteImageIdList = originalImageIdsRef.current.filter((id) => !imageIds.includes(id));

    await axiosUpdatePost(
      boardId,
      postId,
      title,
      JSON.stringify(newDelta),
      imageIds,
      deleteImageIdList
    );
    router.push(`${path}`);
  };

  // 권한 체크 → 본인 글 아니면 alert + 리디렉트
  useEffect(() => {
    if (isLoading || !post) return; // 로딩 중 or 데이터 없음 → 무시

    if (!post.myPost) {
      alert('본인 게시물만 수정할 수 있습니다.');
      router.push(`${path}/post/${postId}`);
    }
  }, [isLoading, post, path, router]);

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

  if (isLoading || !post?.myPost) return null; // 권한 확인 전까지는 아무것도 렌더링 안함

  return (
    <Write
      titleRef={titleRef}
      editorRef={editorRef}
      onSubmit={handleSubmit}
      initialDelta={post?.content ? JSON.parse(post.content) : undefined}
    />
  );
};

export default PostEdit;
