'use client';
import processDelta from '../lib/processDelta';
import Write from './Write';
import { axiosUploadPost } from '@/shared/api';
import { RichTextEditorHandle } from '@/shared/types';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface PostWriteProps {
  /** 게시판 id */
  boardId: number;
  /** path */
  path: string;
}

const PostWrite = ({ boardId, path }: PostWriteProps) => {
  const router = useRouter();
  const editorRef = useRef<RichTextEditorHandle>(null); // 에디터 내용(DOM)이나 메서드에 접근하기 위한 ref
  const titleRef = useRef<HTMLInputElement>(null); // 제목 저장하는 ref

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
    await axiosUploadPost(boardId, title, JSON.stringify(newDelta), imageIds);
    router.push(`${path}`);
  };
  return <Write titleRef={titleRef} editorRef={editorRef} onSubmit={handleSubmit} />;
};

export default PostWrite;
