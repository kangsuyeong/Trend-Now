import React from 'react';
import Image from 'next/image';

interface KakaoLoginButtonProps {
  /**@param {string} redirectPath 리다이렉트 될 경로 */
  redirectPath: string;
}

export default function KakaoLoginButton({ redirectPath }: KakaoLoginButtonProps) {
  const kakaoLogin = async () => {
    window.location.href = `https://api.trendnow.me/oauth2/authorization/kakao?redirect_url=${redirectPath}`;
  };

  return (
    <button
      className="flex cursor-pointer items-center justify-between rounded-full bg-kakao px-3 py-2"
      onClick={kakaoLogin}
    >
      <Image
        src="/images/icons/icon_kakao_160x160.png"
        alt="카카오 로그인"
        width={40}
        height={40}
      />
      <span className="w-full text-center text-md font-medium text-gray-800">
        카카오 3초 로그인/회원가입
      </span>
    </button>
  );
}
