'use client';

import { NotFoundError } from '@/shared/error/error';
import { HotBoard } from '@/views/hotBoards';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const keyword = useParams().keyword as string;
  const boardId = useSearchParams().get('boardId');

  if (!boardId) throw new NotFoundError();

  return <HotBoard boardId={+boardId} keyword={decodeURI(keyword)} />;
}
