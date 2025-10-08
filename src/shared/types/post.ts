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

export interface PostDetailResponse {
  data: {
    postInfoDto: PostDetail;
    imageInfos: ImageInfo[];
  };
}

export interface PostDetail {
  postId: number;
  boardName: string;
  title: string;
  writer: string;
  writerId: number;
  content: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  modifiable: boolean;
  myPost: boolean;
  createdAt: string;
  updatedAt: string;
  scraped: boolean;
}

export interface ImageInfo {
  id: number;
  imageUrl: string;
}

export interface PostScrapResponse {
  message: string;
  scrapAction: 'SCRAPPED' | 'UNSCRAPPED';
}

export interface PostLikeResponse {
  message: string;
  postLikesAction: 'LIKED' | 'UNLIKED';
}
