import MyActivityRow from '@/widgets/mypage/ui/MyActivityRow';
import React from 'react';

const MyCommentList = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between gap-2 border-b border-gray-200 px-2 pb-3 text-sm font-regular text-gray-500">
        <div>게시글 제목/작성한 댓글</div>
        <div className="flex gap-2 text-center">
          <div className="w-[6.25rem]">닉네임</div>
          <div className="w-12">조회수</div>
          <div className="w-12">추천</div>
          <div className="w-12">일자</div>
        </div>
      </div>
      {new Array(20).fill(0).map((_, idx) => (
        <MyActivityRow
          key={idx}
          board={'계엄해주셔서 감사'}
          title={'간천지지냐 설마! 디씨하는 한국인이 ㅋㄱㄱ'}
          nickname={'Trendnow'}
          views={125}
          likes={2324}
          created={new Date()}
          comments={123}
        />
      ))}
    </div>
  );
};

export default MyCommentList;
