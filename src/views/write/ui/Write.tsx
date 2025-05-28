'use client';

import { InputFieldTitle, PrimaryButton } from '@/shared/ui';
import dynamic from 'next/dynamic';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const RichTextEditor = dynamic(() => import('@/widgets/write/ui/RichTextEditor'), {
  ssr: false,
});

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string;
};

interface WriteProps {
  /**@param {string} boardType 게시판 종류 */
  boardType?: string;
  /**@param {string} keyword 실시간 인기 검색어일 경우 */
  keyword?: string;
}

export default function Write({ boardType, keyword }: WriteProps) {
  const editorRef = useRef<RichTextEditorHandle>(null); // Ref for RichTextEditor
  const [editorContent, setEditorContent] = useState<string>(''); // State to store the editor content

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent(); // Get the editor content
      console.log('content', content);
      setEditorContent(content); // Update the state with the content
    }
    console.log(editorRef.current);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-1.5 border-b border-gray-200 pb-4">
        <span className="">📝</span>
        {keyword ? (
          <span className="text-2xl font-bold text-brand-500">{boardType}</span>
        ) : (
          <span className="text-2xl font-bold text-gray-900">{boardType}</span>
        )}
        <span className="text-2xl font-bold text-gray-900">게시판</span>
      </div>
      <div className="flex flex-col gap-y-6 rounded-3xl bg-gray-100 p-6">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-3">
            <InputFieldTitle
              type="basic"
              size="desktop"
              label="제목"
              placeholder="제목을 입력해주세요."
            />
            <div className="flex flex-col gap-y-0.5 rounded-xl bg-[#EFF2F6] px-4 py-2.5">
              <span className="text-xs font-regular text-gray-500">
                ※ 음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질 수
                있습니다.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="text-xs font-regular text-gray-800">내용</span>
            <div>
              <RichTextEditor ref={editorRef} />
            </div>
            <PrimaryButton variant="primary" size="m" onClick={handleGetContent}>
              미리보기
            </PrimaryButton>
            <div dangerouslySetInnerHTML={{ __html: editorContent }} />
          </div>
        </div>
      </div>
    </div>
  );
}
