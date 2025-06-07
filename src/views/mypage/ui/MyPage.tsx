import { SecondaryButton } from '@/shared/ui';
import Settings20 from '@/shared/ui/icons/20/Settings20';
import ChevronRight24 from '@/shared/ui/icons/24/ChevronRight24';
import UserProfile64 from '@/shared/ui/icons/64/UserProfile64';
import { MyPageContent } from '@/widgets/mypage/ui';
import Image from 'next/image';

export default function MyPage() {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-5">
          <UserProfile64 />
          <div className="flex flex-col justify-between">
            <div className="text-2xl font-semibold">Trend Now</div>
            <div className="text-base text-gray-500">@user_12563as</div>
          </div>
        </div>
        <SecondaryButton variant="gray" size="s">
          <div className="flex gap-1">
            <Settings20 />
            <div>프로필 편집</div>
          </div>
        </SecondaryButton>
      </div>
      <div className="flex h-14 items-center justify-between rounded-2xl bg-brand-100 px-4">
        <div className="flex items-center gap-[0.375rem]">
          <Image src="/images/crown.gif" alt="gold" width={32} height={32} />
          <div className="text-md font-medium text-[#333333]">
            더 많은 실시간 인기 검색어를 확인해보세요!
          </div>
        </div>
        <ChevronRight24 />
      </div>
      <MyPageContent />
    </div>
  );
}
