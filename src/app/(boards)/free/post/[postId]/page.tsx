import { Post } from '@/views/post';
import React from 'react';

interface PageProps {
  params: {
    postId: string;
  };
}

export default function Page({ params }: PageProps) {
  return <Post postId={params.postId} />;
}
