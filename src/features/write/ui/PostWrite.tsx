'use client';
import Write from './Write';
import { axiosUploadPost } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { RichTextEditorHandle } from '@/shared/types';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface PostWriteProps {
  /** 게시판 이름 */
  boardName: string;
  /** 게시판 id */
  boardId: number;
  /** path */
  path: string;
}

const PostWrite = ({ boardName, boardId, path }: PostWriteProps) => {
  const router = useRouter();
  const { jwt } = useUserStore();
  const editorRef = useRef<RichTextEditorHandle>(null); // 에디터 내용(DOM)이나 메서드에 접근하기 위한 ref
  const titleRef = useRef<HTMLInputElement>(null); // 제목 저장하는 ref
  const imageIdsRef = useRef<number[]>([]); // 이미지 index 저장하는 ref

  const handleSubmit = async () => {
    const title = titleRef.current?.value;
    const delta = editorRef.current?.getContents();
    const content = JSON.stringify(delta);
    const imageIds = imageIdsRef.current;

    if (!title || !content) return alert('제목 또는 내용을 입력해주세요');

    if (!jwt) {
      // 로그인 안 된 상태이므로 요청 중단
      return;
    }
    await axiosUploadPost(jwt, boardId, title, content, imageIds);
    router.push(`${path}`);
  };
  return (
    <Write
      boardName={boardName}
      titleRef={titleRef}
      editorRef={editorRef}
      imageIdsRef={imageIdsRef}
      onSubmit={handleSubmit}
    />
  );
};

export default PostWrite;
