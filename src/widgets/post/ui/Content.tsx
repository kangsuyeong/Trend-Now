'use client';

import { PostDetail } from '@/shared/types';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

export default function Content({ post }: { post: PostDetail }) {
  // 임시 로직  Delta → HTML
  let html = '';
  try {
    const delta = JSON.parse(post.content);
    const converter = new QuillDeltaToHtmlConverter(delta.ops);

    converter.renderCustomWith((customOp) => {
      if (customOp.insert.type === 'customImage') {
        const { id, url } = customOp.insert.value;

        return `<img src="${url}" data-id="${id}" />`;
      }

      return '';
    });
    html = converter.convert();
  } catch {
    html = post.content;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
