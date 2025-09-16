'use client';

import { SecondaryButton } from '@/shared/ui';
import ArrowLeft from '../icon/ArrowLeft';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <SecondaryButton
      variant="gray"
      size="m"
      className="size-10 rounded-full p-0"
      onClick={() => {
        const sameOrigin = document.referrer?.startsWith(location.origin);
        if (sameOrigin && history.length > 1) router.back();
        else router.replace('/');
      }}
    >
      <ArrowLeft />
    </SecondaryButton>
  );
};

export default BackButton;
