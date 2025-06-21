export interface PostsResponse {
  message: string;
  totalCount: number;
  totalPageCount: number;
  postsListDto: Posts[];
}

export interface Posts {
  postId: number;
  title: string;
  writer: string;
  viewCount: number;
  likeCount: number;
  modifiable: boolean;
  createdAt: string;
  updatedAt: string;
  boardId: number;
  boardIdName: string;
  commentCount: number;
}
