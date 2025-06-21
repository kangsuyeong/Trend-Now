import { PostListResponse } from '@/shared/types';
import { axiosPosts } from '@/shared/api';
import { BOARD_MAP } from '@/shared/constants';

export async function getEntertainPosts(page?: number, size?: number) {
  try {
    const boardId = BOARD_MAP.entertain.id;
    const response = await axiosPosts<PostListResponse>(boardId, page, size);
    return response;
  } catch (error) {
    console.error('자유게시판 게시물 불러오기 실패:', error);
    throw error;
  }
}
