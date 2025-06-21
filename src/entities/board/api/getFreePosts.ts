import { axiosPosts } from '@/shared/api';
import { BOARD_MAP } from '@/shared/constants';
import { PostListResponse } from '@/shared/types';

export async function getFreePosts(page?: number, size?: number) {
  try {
    const boardId = BOARD_MAP.free.id;
    const response = await axiosPosts<PostListResponse>(boardId, page, size);
    return response;
  } catch (error) {
    console.error('자유게시판 게시물 불러오기 실패:', error);
    throw error;
  }
}
