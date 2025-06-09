import React from 'react';
import BoardRow from './BoardRow';

export default function BoardList() {
  return (
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
  );
}
