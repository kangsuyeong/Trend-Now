'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import { axiosUploadImages } from '@/shared/api';
import { ImageUploadResponse, RichTextEditorHandle } from '@/shared/types';
import '../lib/customImageBlot';

interface RichTextEditorProps {
  /** 글 수정 시 에디터에 미리 채워 넣을 초기 Delta 데이터 */
  initialDelta?: Delta;
}

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ initialDelta }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null); // 에디터 컨테이너
    const quillRef = useRef<Quill | null>(null); // Quill 인스턴스

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

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }

        //  S3 업로드 요청
        const response = await axiosUploadImages<ImageUploadResponse>(formData); // 다중 파일

        // Quill 에디터에 <img> 태그 추가
        response?.imageUploadDto.forEach((img) => {
          const range = editor.getSelection()!;
          editor.insertEmbed(range.index, 'customImage', {
            url: img.imageUrl,
            id: img.id,
          });
          editor.setSelection(range.index + 1);
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

      // quill.on('text-change', () => {
      //   console.log('Text change!');
      // });

      // return () => {
      //   quillRef.current = null; // Cleanup to avoid memory leaks
      // };
    }, [imageHandler]);

    // 부모 컴포넌트가 getContents 함수를 사용할 수 있도록 연결한다
    useImperativeHandle(ref, () => ({
      getContents: () => quillRef.current?.getContents() ?? new Delta(),
    }));

    // 초기 Delta 데이터가 있을 경우 에디터에 주입
    useEffect(() => {
      if (initialDelta && quillRef.current) {
        quillRef.current.setContents(initialDelta, 'api');
      }
    }, [initialDelta]);

    return <div ref={editorRef} style={{ height: '300px' }} />;
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
