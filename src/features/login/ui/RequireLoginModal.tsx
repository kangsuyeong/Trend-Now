'use client';
import { Modal } from '@/shared/ui';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Close } from './icons';
import GoogleLoginButton from './GoogleLoginButton';
import KakaoLoginButton from './KakaoLoginButton';
import NaverLoginButton from './NaverLoginButton';

interface LoginModalProps extends React.RefAttributes<HTMLDivElement> {
  /**@param {boolean} open 모달 여닫음 여부 */
  open: boolean;
  /**@param {() => void} onDimClick 모달 배경 클릭 시 함수 */
  onClose: () => void;
}
export default function RequireLoginModal({ open, onClose }: LoginModalProps) {
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
        <div className="flex w-full flex-col justify-center gap-y-8">
          <span className="text-center font-himpun text-5xl text-gray-800">Trendnow</span>
          <span className="flex flex-col gap-y-3">
            <span className="text-center text-xl font-bold text-gray-900">
              로그인이 필요한 서비스입니다.
              <br />더 많은 기능을 사용하려면 로그인하세요.
            </span>
            <span className="text-center text-sm font-medium text-gray-600">
              타이머 연장, 댓글, 글 작성 등 로그인하면
              <br />더 많은 기능을 이용할 수 있어요.
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex w-full flex-col gap-y-3 px-8 *:select-none">
            <GoogleLoginButton redirectPath={encodedUri} />
            <KakaoLoginButton redirectPath={encodedUri} />
            <NaverLoginButton redirectPath={encodedUri} />
          </div>
          <span
            className="w-full cursor-pointer text-center text-sm font-medium text-gray-600 underline"
            onClick={onClose}
          >
            나중에 하기
          </span>
        </div>
      </span>
    </Modal>
  );
}
