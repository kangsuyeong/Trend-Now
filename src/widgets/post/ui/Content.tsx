'use client';

import { PostDetail } from '@/shared/types';

export default function Content({ post }: { post: PostDetail }) {
  return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
}
