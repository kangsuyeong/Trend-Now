interface BoardListHeaderProps {
  /** 번호 표시 여부 (기본값 true) */
  showNumber?: boolean;
}

const BoardListHeader = ({ showNumber = true }: BoardListHeaderProps) => {
  return (
    <div className="flex justify-between gap-2 border-b border-gray-200 px-2 pb-3 text-center text-sm text-gray-500">
      <div className="flex gap-2">
        {showNumber && <div className="w-12">번호</div>}
        <div className="text-left">게시글 제목</div>
      </div>

      <div className="flex gap-2">
        <div className="w-[6.25rem]">닉네임</div>
        <div className="w-12">조회수</div>
        <div className="w-12">추천</div>
        <div className="w-12">일자</div>
      </div>
    </div>
  );
};

export default BoardListHeader;
