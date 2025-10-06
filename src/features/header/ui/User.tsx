'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  Hamburger24,
  PrimaryButton,
  UserProfile28,
} from '@/shared/ui/';
import { LoginModal } from '@/features/login';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { axiosUserProfile } from '@/shared/api';
import { UserProfile } from '@/shared/types';
import Link from 'next/link';
import { logoutAction } from '@/features/logout';

export default function User() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { data: user, isError } = useQuery<UserProfile>({
    queryKey: ['userInfo'],
    queryFn: () => axiosUserProfile(),
    retry: 0,
  });

  // 로그인 안되어있을때
  if (!user || isError) {
    return (
      <>
        <PrimaryButton
          variant="gray"
          size="l"
          className="h-10 select-none text-nowrap rounded-full px-3.5 py-2.5 text-base font-medium text-gray-800"
          onClick={handleModalOpen}
        >
          로그인
        </PrimaryButton>
        <LoginModal onClose={handleModalClose} open={isModalOpen} />
      </>
    );
  }
  return (
    <div className="flex gap-2">
      <Link
        href={'/mypage'}
        className="flex h-10 select-none items-center gap-x-2.5 text-nowrap rounded-full bg-gray-100 py-2.5 pl-2.5 pr-3.5 text-base font-medium"
      >
        <UserProfile28 />
        {user?.nickname}
      </Link>

      <DropdownMenu
        trigger={
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Hamburger24 />
          </span>
        }
        className="w-[12.5rem] p-4"
      >
        <DropdownMenuItem onClick={() => router.push('/mypage/posts')} className="text-base">
          내가 작성한 게시글
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/mypage/comments')} className="text-base">
          내가 작성한 댓글
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/mypage/scraps')} className="text-base">
          스크랩한 게시글
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/mypage/settings')} className="text-base">
          설정
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            const confirmSignout = confirm('정말 로그아웃 하실 건가요?');

            if (confirmSignout) {
              // 임시 쿠키 제거
              await logoutAction();
              // 진행 중 요청 취소
              await queryClient.cancelQueries();
              // 화면에 없는(비활성) 캐시 전부 삭제
              queryClient.removeQueries({ type: 'inactive' });
              // 화면에 보이는(활성) 쿼리는 "초기화 + 즉시 재패치"
              await queryClient.resetQueries({ type: 'active' });
              // 서버 렌더까지 새로고침
              router.refresh();
            }
          }}
          className="text-base"
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
}
