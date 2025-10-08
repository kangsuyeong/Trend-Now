'use client';

import { useRouter } from 'next/navigation';

const TestLoginButton = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const onClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/api/v1/member/test-jwt`, {
      credentials: 'include',
    });
    onClose();
    router.refresh();
  };

  return <button onClick={onClick}>개발서버 전용 테스트 로그인</button>;
};

export default TestLoginButton;
