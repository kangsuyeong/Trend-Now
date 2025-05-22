import { HotBoard } from '@/views/hotBoards';
import React from 'react';

export default function Page({ params }: { params: { keyword: string } }) {
  return <HotBoard keyword={params.keyword} />;
}
