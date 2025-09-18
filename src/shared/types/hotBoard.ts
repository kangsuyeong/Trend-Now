export interface HotBoardResponse {
  totalPageCount: number;
  totalBoardCount: number;
  boardInfoDtos: HotBoardList[];
}

export interface HotBoardList {
  boardId: number;
  boardName: string;
  postCount: number;
  viewCount: number;
  boardLiveTime: number;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface HotBoardInfoResponse {
  boardId: number;
  boardName: string;
  boardLiveTime: number;
  boardExpiredTime: number;
  score: number;
  summary: string;
}
