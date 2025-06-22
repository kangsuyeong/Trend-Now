// 게시글 목록 응답 타입
export interface PostListResponse {
  message: string;
  totalPageCount: number;
  totalCount: number;
  postsListDto: PostInfo[];
}

// 게시글 목록용 타입
export interface PostInfo {
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
//--------------------------------
