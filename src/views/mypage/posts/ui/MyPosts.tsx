import { Pagination } from '@/shared/ui';
import { MyPostRow } from '@/widgets/mypage';
import React from 'react';

const MyPosts = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* 목차 / 게시물 */}
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between gap-2 border-b border-gray-200 px-2 pb-3 text-center text-sm font-regular text-gray-500">
          <div className="flex gap-2">
            <div className="w-12">번호</div>
            <div>게시물 제목</div>
          </div>
          <div className="flex gap-2">
            <div className="w-12">조회수</div>
            <div className="w-12">추천</div>
            <div className="w-12">일자</div>
          </div>
        </div>
        {new Array(20).fill(0).map((_, idx) => (
          <MyPostRow
            key={idx}
            id={idx}
            title={'간천지지냐 설마! 디씨하는 한국인이 ㅋㄱㄱ'}
            views={125}
            likes={2324}
            created={new Date()}
            comments={123}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      <Pagination currentPage={1} maxPage={20} count={5} />
    </div>
  );
};

export default MyPosts;
