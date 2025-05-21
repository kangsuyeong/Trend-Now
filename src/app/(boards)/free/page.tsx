import { DateDivider, Pagination, Pencil24, PrimaryButton } from '@/shared/ui';
import React from 'react';
import Image from 'next/image';
import { BoardRow } from '@/widgets/boards';

export default function Page() {
  return (
    <div className="flex border-r border-gray-200 bg-white pr-8">
      <div className="flex w-full flex-col gap-y-8">
        <div className="flex flex-col gap-y-6">
          <DateDivider date={new Date()} background="black" />
          <div className="flex items-end justify-between">
            <span className="flex flex-col gap-y-2">
              <span className="text-md font-regular text-gray-500">
                이곳은 타이머 없는 이야기의 공간입니다. 누구나, 무엇이든 이야기 해보세요.
              </span>
              <span className="flex gap-x-3">
                <Image
                  src="/images/gold.gif"
                  alt="gold"
                  width={40}
                  height={40}
                  priority
                  className="aspect-square object-cover"
                />
                <span className="text-3xl font-bold text-gray-800">자유게시판</span>
              </span>
            </span>
            <PrimaryButton variant="black" size="m" className="pl-4">
              <span className="flex items-center gap-x-1">
                <Pencil24 />
                글쓰기
              </span>
            </PrimaryButton>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2 border-b border-gray-200 px-2 pb-3 *:text-sm *:font-regular *:text-gray-500">
            <span className="w-12 text-center">번호</span>
            <span className="flex-1 text-left">게시글 제목</span>
            <span className="w-[6.25rem] text-center">닉네임</span>
            <span className="w-12 text-center">조회수</span>
            <span className="w-12 text-center">추천</span>
            <span className="w-12 text-center">일자</span>
          </div>
          {new Array(2).fill(0).map((_, idx) => (
            <BoardRow
              key={idx}
              number={125}
              title={'이승기, 前소속사 정산금 소송 이겼다'}
              nickname={'Trendnow'}
              views={125}
              likes={2324}
              created={new Date()}
              comments={123}
              type="noti"
            />
          ))}
          {new Array(18).fill(0).map((_, idx) => (
            <BoardRow
              key={idx}
              number={125}
              title={'이승기, 前소속사 정산금 소송 이겼다'}
              nickname={'Trendnow'}
              views={125}
              likes={2324}
              created={new Date()}
              comments={123}
              type="normal"
            />
          ))}
        </div>
        <Pagination currentPage={1} maxPage={20} count={5} />
      </div>
    </div>
  );
}
