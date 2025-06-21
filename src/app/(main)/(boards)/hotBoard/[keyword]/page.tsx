'use client';

import { HotBoard } from '@/views/hotBoards';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const keyword = useParams().keyword as string;

  return <HotBoard keyword={keyword} />;
}
