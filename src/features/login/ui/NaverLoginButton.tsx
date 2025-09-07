import React from 'react';
import Image from 'next/image';

interface NaverLoginButtonProps {
  /**@param {string} redirectPath 리다이렉트 될 경로 */
  redirectPath: string;
}

export default function NaverLoginButton({ redirectPath }: NaverLoginButtonProps) {
  const naverLogin = () => {
    window.location.href = `https://api.trendnow.me/oauth2/authorization/naver?redirect_url=${redirectPath}`;
  };

  return (
    <button
      className="flex cursor-pointer items-center justify-between rounded-full bg-naver px-3 py-2"
      onClick={naverLogin}
    >
      <Image
        src="/images/icons/icon_naver_160x160.png"
        alt="네이버 로그인"
        width={40}
        height={40}
      />
      <span className="w-full text-center text-md font-medium text-white">
        네이버 3초 로그인/회원가입
      </span>
    </button>
  );
}
