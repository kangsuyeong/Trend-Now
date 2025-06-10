import { MyPageHeader, MyPageNoticeBanner, MyPageTabs } from '@/widgets/mypage';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[51.5rem] flex-col gap-8 py-16">
      <div className="flex flex-col gap-y-8">
        <MyPageHeader />
        <MyPageNoticeBanner />
        <MyPageTabs />
      </div>
      {children}
    </div>
  );
}
