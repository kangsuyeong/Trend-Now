export interface CommentResponse {
  totalCommentsCount: number;
  totalPageCount: number;
  findAllCommentsDtos: CommentList[];
}

export interface CommentList {
  createdAt: string;
  updatedAt: string;
  commentId: number;
  content: string;
  modifiable: boolean;
  writer: string;
  writerId: number;
  myComments: boolean;
}

export interface ReplyList {
  createdAt: string;
  updatedAt: string;
  id: number;
  content: string;
  boardTtlStatus: string;
}
