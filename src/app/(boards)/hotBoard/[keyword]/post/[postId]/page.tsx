'use client';

import { Post } from '@/views/post';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const postId = useParams().postId as string;

  return <Post postId={postId} />;
}
