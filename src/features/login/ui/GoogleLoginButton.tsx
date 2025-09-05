import React from 'react';
import Image from 'next/image';

interface GoogleLoginButtonProps {
  /**@param {string} redirectPath 리다이렉트 될 경로 */
  redirectPath: string;
}

export default function GoogleLoginButton({ redirectPath }: GoogleLoginButtonProps) {
  const googleLogin = async () => {
    window.location.href = `https://api.trendnow.me/oauth2/authorization/google?redirect_url=${redirectPath}`;
  };

  return (
    <div
      className="flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-3 py-2"
      onClick={googleLogin}
    >
      <Image src="/images/icons/icon_google_160x160.png" alt="구글 로그인" width={40} height={40} />
      <span className="w-full text-center text-md font-medium text-gray-800">
        구글 3초 로그인/회원가입
      </span>
    </div>
  );
}
