import { BoardList } from '@/widgets/boards';
import MyCommentList from '@/widgets/mypage/ui/MyCommentList';
import MyScrapList from '@/widgets/mypage/ui/MyScrapList';
import MySettings from '@/widgets/mypage/ui/MySettings';
import React from 'react';

const MyPageTabPanel = ({
  activeTab,
}: {
  activeTab: 'posts' | 'comments' | 'scraps' | 'settings';
}) => {
  switch (activeTab) {
    case 'posts':
      return <BoardList hideNoti />;
    case 'comments':
      return <MyCommentList />;
    case 'scraps':
      return <MyScrapList />;
    case 'settings':
      return <MySettings />;
    default:
      return null;
  }
};

export default MyPageTabPanel;
