'use client';

import { BOARD_MAP } from '@/shared/constants';
import { Post } from '@/views/post';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const postId = useParams().postId as string;
  const boardId = BOARD_MAP['free'].id;

  return <Post postId={Number(postId)} boardId={boardId} />;
}
