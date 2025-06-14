export interface PostInfo {
  postId: number;
  title: string;
  writer: string;
  viewCount: number;
  likeCount: number;
  updatedAt: string;
}

export interface PostsResponse {
  message: string;
  totalPageCount: number;
  postsInfoListDto: PostInfo[];
}
