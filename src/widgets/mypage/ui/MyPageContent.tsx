'use client';

import { Pagination } from '@/shared/ui';
import MyPageTabPanel from '@/widgets/mypage/ui/MyPageTabPanel';
import MyPageTabs from '@/widgets/mypage/ui/MyPageTabs';
import React, { useState } from 'react';

const MyPageContent = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'scraps' | 'settings'>('posts');
  return (
    <div className="flex flex-col gap-8">
      <MyPageTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col gap-6">
        <MyPageTabPanel activeTab={activeTab} />
        {activeTab !== 'settings' && <Pagination currentPage={1} maxPage={20} count={5} />}
      </div>
    </div>
  );
};

export default MyPageContent;
