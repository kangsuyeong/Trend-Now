'use client';

import { cn } from '@/shared/lib';
import { InputFieldTitle, PrimaryButton } from '@/shared/ui';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { axiosUploadPost } from '@/shared/api';
import { BOARD_MAP } from '@/shared/constants';
import { useUserStore } from '@/shared/store';

// Quill이 SSR 중 로딩되지 않도록 방지
const RichTextEditor = dynamic(() => import('@/widgets/write/ui/RichTextEditor'), {
  ssr: false,
});

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string;
};

interface WriteProps {
  /**@param {string} boardType 게시판 종류 */
  boardType?: 'free' | 'entertain' | 'politics';
  /**@param {string} keyword 실시간 인기 검색어일 경우 */
  keyword?: string;
}

export default function Write({ boardType, keyword }: WriteProps) {
  const router = useRouter();
  const { jwt } = useUserStore();
  const boardId = boardType ? BOARD_MAP[boardType].id : 1814; //
  const boardName = boardType ? BOARD_MAP[boardType].name : '자유'; //

  const editorRef = useRef<RichTextEditorHandle>(null); // Ref for RichTextEditor
  const titleRef = useRef<HTMLInputElement>(null); // 제목 저장하는 ref
  const imageIdsRef = useRef<number[]>([]); // 이미지 index 저장하는 ref

  // 제출하는 함수
  const handlePostSubmit = async () => {
    const content = editorRef.current!.getContent(); // Get the editor content

    if (!jwt) {
      // 로그인 안 된 상태이므로 요청 중단
      return;
    }

    await axiosUploadPost(jwt, boardId, titleRef.current!.value, content, imageIdsRef.current);
    router.push(`/${boardType}`);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-y-4">
        {/* 게시판 이름 */}
        <div className="flex items-center border-b border-gray-200 pb-4">
          <Image
            src="/images/icons/icon_penceil_32X32.png"
            width={32}
            height={32}
            alt="연필 아이콘"
          />
          <span className="text-2xl font-bold">
            <span className={cn(keyword ? 'text-brand-500' : 'text-gray-900')}>
              {keyword ?? boardName}
            </span>{' '}
            <span className="text-gray-900">게시판</span>
          </span>
        </div>
        {/* 제목 / 내용 */}
        <div className="flex flex-col gap-y-6 rounded-3xl bg-gray-100 p-6">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-3">
              <InputFieldTitle
                ref={titleRef}
                type="basic"
                size="desktop"
                label="제목"
                placeholder="제목을 입력해주세요."
              />
              <div className="flex flex-col gap-y-0.5 rounded-xl bg-[#EFF2F6] px-4 py-2.5">
                <span className="text-xs font-regular text-gray-500">
                  ※ 음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질
                  수 있습니다.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-xs font-regular text-gray-800">내용</span>
              <div>
                <RichTextEditor ref={editorRef} imageIdsRef={imageIdsRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-end gap-2">
        <PrimaryButton variant="gray" size="l">
          취소
        </PrimaryButton>
        <PrimaryButton variant="black" size="l" onClick={handlePostSubmit}>
          등록
        </PrimaryButton>
      </div>
    </div>
  );
}
