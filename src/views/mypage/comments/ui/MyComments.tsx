// import { Pagination } from '@/shared/ui';
import { MyCommentRow } from '@/widgets/mypage';
import React from 'react';

const MyComments = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* 게시물 */}
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between gap-2 border-b border-gray-200 px-2 pb-3 text-sm font-regular text-gray-500">
          <div>게시글 제목/작성한 댓글</div>
          <div className="w-12 text-center">일자</div>
        </div>
        {new Array(20).fill(0).map((_, idx) => (
          <MyCommentRow
            key={idx}
            title={'게시판 제목'}
            comment={'댓글 내용적어요'}
            created={new Date()}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      {/* <Pagination currentPage={1} maxPage={20} count={5} /> */}
    </div>
  );
};

export default MyComments;
