import { SecondaryButton } from '@/shared/ui';
import { BackButton, NotFoundSection } from '@/widgets/not-found';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <NotFoundSection />
        {/* 버튼 */}
        <div className="flex gap-2">
          <BackButton />
          <Link href={'/'}>
            <SecondaryButton variant="gray" size="m" className="rounded-3xl">
              메인 페이지로 이동하기
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
