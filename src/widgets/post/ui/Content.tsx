'use client';

import { PostDetail } from '@/shared/types';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import DOMPurify from 'dompurify';

export default function Content({ post }: { post: PostDetail }) {
  // 임시 로직  Delta → HTML
  let html = '';
  try {
    const delta = JSON.parse(post.content);
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    html = converter.convert();
  } catch {
    html = post.content;
  }

  // XSS 방지 처리
  html = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
