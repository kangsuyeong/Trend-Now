'use client';

import { cn } from '@/shared/lib';
import { RichTextEditorHandle } from '@/shared/types';
import { InputFieldTitle, PrimaryButton } from '@/shared/ui';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { RefObject, MutableRefObject } from 'react';

// Quill이 SSR 중 로딩되지 않도록 방지
const RichTextEditor = dynamic(() => import('@/features/write/ui/RichTextEditor'), {
  ssr: false,
});

interface WriteProps {
  /** 게시판 이름 */
  boardName: string;
  /** 실시간 인기 게시판 여부 */
  isHotBoard?: boolean;
  /** 제목 입력 input 요소의 ref (추후 옵셔널 삭제)*/
  titleRef: RefObject<HTMLInputElement | null>;
  /** 에디터 인스턴스(ref)를 통한 getContents, setContents 접근 (추후 옵셔널 삭제)*/
  editorRef: RefObject<RichTextEditorHandle | null>;
  /** 업로드된 이미지 ID 목록을 저장하는 ref (추후 옵셔널 삭제)*/
  imageIdsRef: MutableRefObject<number[]>;
  /** 삭제할 이미지 ID 목록 (수정 시에만 사용됨) */
  deleteImageIdsRef?: MutableRefObject<number[]>;
  /** 게시글 등록 또는 수정 버튼 클릭 시 호출되는 함수 (추후 옵셔널 삭제)*/
  onSubmit: () => void;
}

export default function Write({
  boardName,
  isHotBoard = false,
  titleRef,
  editorRef,
  imageIdsRef,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteImageIdsRef,
  onSubmit,
}: WriteProps) {
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
            <span className={cn(isHotBoard ? 'text-brand-500' : 'text-gray-900')}>{boardName}</span>{' '}
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
        <PrimaryButton variant="black" size="l" onClick={onSubmit}>
          등록
        </PrimaryButton>
      </div>
    </div>
  );
}
