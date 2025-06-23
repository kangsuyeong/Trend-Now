'use client';

import { Post } from '@/views/post';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const postId = useParams().postId as string;
  const boardId = 1815;

  return <Post postId={Number(postId)} boardId={boardId} />;
}
