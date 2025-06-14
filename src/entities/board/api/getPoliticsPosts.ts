import { PostsResponse } from '../model';
import { axiosPosts } from '@/shared/api';

export async function getPoliticsPosts(page?: number, size?: number) {
  try {
    const response = await axiosPosts<PostsResponse>(1815, page, size);
    return response;
  } catch (error) {
    console.error('자유게시판 게시물 불러오기 실패:', error);
    throw error;
  }
}
