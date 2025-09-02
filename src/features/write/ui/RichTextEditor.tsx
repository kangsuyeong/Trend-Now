'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import { axiosUploadImages } from '@/shared/api';
import type { ImageUploadResponse, ImageUploadState, RichTextEditorHandle } from '@/shared/types';
import '../lib/customImageBlot';
import { useMutation } from '@tanstack/react-query';

interface RichTextEditorProps {
  /** 글 수정 시 에디터에 미리 채워 넣을 초기 Delta 데이터 */
  initialDelta?: Delta;
}

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ initialDelta }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null); // 에디터 컨테이너
    const quillRef = useRef<Quill | null>(null); // Quill 인스턴스

    const uploadsByTempIdRef = useRef<Record<string, ImageUploadState>>({});

    const { mutate } = useMutation({
      mutationFn: (formData: FormData) => axiosUploadImages<ImageUploadResponse>(formData),
    });

    const imageHandler = useCallback((editor: Quill) => {
      // 파일 입력창 생성
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.setAttribute('name', 'file');
      input.setAttribute('multiple', '');
      input.click();

      // 파일 선택 후 이벤트 처리
      input.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (!files || files.length === 0) return;

        const tempIds: string[] = []; // 임시 id 저장할 배열
        const formData = new FormData(); // 제출할 폼 데이터

        // 파일 여러개일 경우 순회
        for (const file of files) {
          formData.append('images', file); // 폼 데이터의 추가
          const previewUrl = URL.createObjectURL(file);
          const tempId = `temp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
          tempIds.push(tempId);
          const range = editor.getSelection()!; // 현재 커서의 위치
          editor.insertEmbed(range.index, 'customImage', {
            url: previewUrl,
            tempId,
          });
          editor.setSelection(range.index + 1);
          uploadsByTempIdRef.current[tempId] = { status: 'pending' };
        }

        mutate(formData, {
          onSuccess: (data) => {
            data?.imageUploadDto.forEach((img, idx) => {
              uploadsByTempIdRef.current[tempIds[idx]] = {
                status: 'ok',
                url: img.imageUrl,
                id: img.id,
              };
            });
          },
          onError: () => {
            // 경고창 띄우기
            alert('이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.');

            // 1) DOM에서 이미지 찾기
            const img = editor.root.querySelector(`img[data-temp-id="${tempIds[0]}"]`);
            if (!img) return;

            // 2) DOM -> Blot로 변환
            const found = Quill.find(img, true); // Blot | Quill | null
            if (!found || found instanceof Quill) return; // Blot만 통과

            // 3) 인덱스 얻기 & 커서 이동/교체
            const index = editor.getIndex(found);

            // 미리 보여준 이미 삭제하기
            editor.deleteText(index, tempIds.length);

            // uploadsRef 데이터 삭제하기
            for (const tempId of tempIds) {
              delete uploadsByTempIdRef.current[tempId];
            }
          },
        });
      };
    }, []);

    useEffect(() => {
      // 에디터 DOM이 아직 렌더링되지 않은 경우 실행하지 않음
      if (!editorRef.current) return;

      // Quill이 이미 초기화된 경우 중복 초기화를 방지
      if (quillRef.current) return;

      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: '내용을 입력하세요.',
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
            ],
            handlers: {
              image: () => {
                imageHandler(quill);
              },
            },
          },
        },
      });

      quillRef.current = quill;

      return () => {
        quillRef.current = null; // Cleanup to avoid memory leaks
      };
    }, [imageHandler]);

    // 부모 컴포넌트가 getContents 함수를 사용할 수 있도록 연결한다
    useImperativeHandle(ref, () => ({
      getContents: () => quillRef.current?.getContents() ?? new Delta(),
      getUploadsByTempId: () => uploadsByTempIdRef.current,
    }));

    // 초기 Delta 데이터가 있을 경우 에디터에 주입
    useEffect(() => {
      if (initialDelta && quillRef.current) {
        quillRef.current.setContents(initialDelta, 'api');
      }
    }, [initialDelta]);

    return <div ref={editorRef} />;
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
