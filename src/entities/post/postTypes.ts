export interface PostsResponse {
  message: string;
  totalCount: number;
  totalPageCount: number;
  postsInfoListDto: Posts[];
}

export interface ScrapsResponse {
  message: string;
  totalCount: number;
  totalPageCount: number;
  scrapPostList: Posts[];
}

export interface Posts {
  postId: number;
  title: string;
  writer: string;
  viewCount: number;
  likeCount: number;
  modifiable: boolean;
  updatedAt: string;
}
