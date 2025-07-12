export interface HotBoardResponse {
  boardInfoDtos: HotBoardList[];
}

export interface HotBoardList {
  boardId: number;
  boardName: string;
  boardLiveTime: number;
  score: number;
}

export interface HotBoardInfoResponse {
  boardId: number;
  boardName: string;
  boardLiveTime: number;
  score: number;
}
