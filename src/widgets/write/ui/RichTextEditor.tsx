'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import { uploadImageToS3 } from '../api';

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null); // 에디터 컨테이너
  const quillRef = useRef<Quill | null>(null); // Quill 인스턴스

  const imageHandler = useCallback((editor: any) => {
    // 파일 입력창 생성
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('name', 'file');
    input.setAttribute('multiple', '');
    input.click();

    // 파일 선택 후 이벤트 처리
    input.onchange = async (event: any) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || files.length === 0) return;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      const token =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzUwMzQxNjgzLCJleHAiOjE3NTA1MjE2ODN9.uwghhYEI8aPQyJ-o-9Zm4KlUWRvI16D4U9rv9HDXf9gzdTHZrKJm3tItPZrR_e9tyZtlE1J8dl2Gk9nTLLlpIg';

      //  S3 업로드 요청
      const response = await uploadImageToS3(token, formData); // 다중 파일

      // Quill 에디터에 <img> 태그 추가
      response?.imageUploadDto.forEach((img) => {
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', img.imageUrl);
        editor.setSelection(range.index + 1);
      });
    };
  }, []);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
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
    }

    // return () => {
    //   quillRef.current = null; // Cleanup to avoid memory leaks
    // };
  }, []);

  // 부모 컴포넌트가 getContent 함수를 사용할 수 있도록 연결한다
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML; // Return the HTML content
      }
      return '';
    },
  }));

  return <div ref={editorRef} style={{ height: '300px' }} />;
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
