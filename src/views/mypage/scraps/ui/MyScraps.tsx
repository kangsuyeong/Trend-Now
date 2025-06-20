// import { Pagination } from '@/shared/ui';
import { MyScrapRow } from '@/widgets/mypage';
import React from 'react';

const MyScraps = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* 게시물 */}
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between gap-2 border-b border-gray-200 pb-3 pl-12 pr-2 text-sm font-regular text-gray-500">
          <div>게시판/게시물 제목</div>
          <div className="flex gap-2 text-center">
            <div className="w-[6.25rem]">닉네임</div>
            <div className="w-12">조회수</div>
            <div className="w-12">추천</div>
            <div className="w-12">일자</div>
          </div>
        </div>
        {new Array(20).fill(0).map((_, idx) => (
          <MyScrapRow
            key={idx}
            board={'게시판 제목'}
            title={'게시물 제목'}
            nickname={'Trendnow'}
            views={125}
            likes={2324}
            created={new Date()}
            comments={123}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      {/* <Pagination currentPage={1} maxPage={20} count={5} /> */}
    </div>
  );
};

export default MyScraps;
