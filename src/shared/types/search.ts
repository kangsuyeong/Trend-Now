// 실시간 게시판 목록 검색
export interface SearchRealtimeBoardsResponse {
  message: string;
  searchResult: RealtimeBoard[];
}

export interface RealtimeBoard {
  /** 게시판 ID */
  boardId: number;

  /** 게시판 이름 */
  boardName: string;

  /** 게시판 활성 시간 */
  boardLiveTime: number;

  /** 현재 게시글 수 */
  postCount: number;

  /** 생성일 */
  createdAt: string;

  /** 수정일 */
  updatedAt: string;
}

// 실시간 게시판의 게시글 검색
export interface SearchRealtimePostsResponse {
  message: string;
  searchResult: SearchRealtimePostsResult;
}
export interface SearchRealtimePostsResult {
  totalPageCount: number;
  totalCount: number;
  realtimePostList: RealtimePost[];
}
export interface RealtimePost {
  postId: number;
  title: string;
  writer: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  modifiable: boolean;
  createAt: string;
  updateAt: string;
  boardId: number;
  boardName: string;
}

// 고정 게시판의 게시글 검색
export interface SearchFixedBoardsResponse {
  message: string;
  searchResult: FixedBoardSearchResult;
}

/** 게시판별 검색 결과 */
export interface FixedBoardSearchResult {
  totalPageCount: number;
  totalCount: number;
  postList: FixedBoardPost[];
}

/** 게시글 타입 */
export interface FixedBoardPost {
  postId: number;
  title: string;
  writer: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  modifiable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AutoComplete {
  boardId: number;
  boardName: string;
}
