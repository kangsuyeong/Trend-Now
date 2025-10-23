'use client';

import StaticEditor from './StaticEditor';
import { RichTextEditorHandle } from '@/shared/types';
import { InputFieldTitle, PrimaryButton } from '@/shared/ui';
import dynamic from 'next/dynamic';
import type { Delta } from 'quill';
import type { RefObject } from 'react';

// Quill이 SSR 중 로딩되지 않도록 방지
const RichTextEditor = dynamic(() => import('@/features/write/ui/RichTextEditor'), {
  ssr: false,
  loading: () => <StaticEditor />,
});

interface WriteProps {
  /** 제목 입력 input 요소의 ref (추후 옵셔널 삭제)*/
  titleRef: RefObject<HTMLInputElement | null>;
  /** 에디터 인스턴스(ref)를 통한 getContents, setContents 접근 (추후 옵셔널 삭제)*/
  editorRef: RefObject<RichTextEditorHandle | null>;
  /** 게시글 등록 또는 수정 버튼 클릭 시 호출되는 함수 (추후 옵셔널 삭제)*/
  onSubmit: () => void;
  /** 글 수정 시 에디터에 미리 채워 넣을 초기 Delta 데이터 */
  initialDelta?: Delta;
}

export default function Write({ titleRef, editorRef, initialDelta, onSubmit }: WriteProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-y-4">
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
                <RichTextEditor ref={editorRef} initialDelta={initialDelta} />
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
