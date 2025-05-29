import { Post } from '@/views/post';
import React from 'react';

export default function Page({ params }: { params: { postId: string } }) {
  return <Post postId={params.postId} />;
}
