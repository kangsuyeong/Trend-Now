import { axiosUploadImages } from '@/shared/api';
import type { ImageUploadResponse } from '@/shared/types';

export const uploadImageToS3 = async (accessToken: string, images: FormData) => {
  try {
    const response = await axiosUploadImages<ImageUploadResponse>(accessToken, images);
    return response; // ✅ 성공 시 반환
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
  }
};
