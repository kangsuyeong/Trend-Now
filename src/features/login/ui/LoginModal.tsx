'use client';

import { Close } from './icons';
import { usePathname } from 'next/navigation';
import { Modal } from '@/shared/ui';
import GoogleLoginButton from './GoogleLoginButton';
import KakaoLoginButton from './KakaoLoginButton';
import NaverLoginButton from './NaverLoginButton';
import TestLoginButton from './TestLoginButton';

interface LoginModalProps extends React.RefAttributes<HTMLDivElement> {
  /**@param {boolean} open 모달 여닫음 여부 */
  open: boolean;
  /**@param {() => void} onDimClick 모달 배경 클릭 시 함수 */
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  // 개발 서버인지 유무 판단
  const isDev = process.env.NODE_ENV === 'development';

  const pathname = usePathname();

  if (!open) return;

  const encodedUri = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL}?redirectPath=${pathname}`
  );

  return (
    <Modal onClose={onClose}>
      <span className="relative flex h-fit w-[540px] flex-col gap-y-8 rounded-[2rem] bg-white px-8 py-10">
        <span onClick={onClose} className="absolute right-6 top-6 cursor-pointer">
          <Close />
        </span>
        <div className="flex w-full flex-col justify-center gap-y-8 py-8">
          <span className="text-center font-himpun text-5xl text-gray-800">Trendnow</span>
          <span className="flex flex-col">
            <span className="text-center">🔥 지금 가장 뜨거운 이슈, 단 5분만 열리는 토론방</span>
            <span className="text-center">
              3초만에 로그인하고 타이머가 멈추기 전에 한마디 남겨보세요.
            </span>
          </span>
        </div>
        <div className="flex w-full flex-col gap-y-3 px-8 *:select-none">
          <GoogleLoginButton redirectPath={encodedUri} />
          <KakaoLoginButton redirectPath={encodedUri} />
          <NaverLoginButton redirectPath={encodedUri} />
          {isDev && <TestLoginButton onClose={onClose} />}
        </div>
      </span>
    </Modal>
  );
}
