export interface MyPostsResponse {
  message: string;
  totalPageCount: number;
  totalCount: number;
  postListDto: MyPosts[];
}

export interface MyPosts {
  postId: number;
  title: string;
  writer: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  modifiable: boolean;
  createdAt: string;
  updatedAt: string;
  boardId: number;
  boardName: string;
}

export interface MyCommentsResponse {
  message: string;
  totalPageCount: number;
  totalCount: number;
  commentsInfoListDto: MyComments[];
}

export interface MyComments {
  boardId: number;
  postId: number;
  postTitle: string;
  commentId: number;
  content: string;
  nickname: string;
  createdAt: string;
}
