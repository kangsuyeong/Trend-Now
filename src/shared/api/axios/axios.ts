'use server';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REST_API_URL,
  timeout: 10000,
});

export default axiosInstance;

//#region 실시간
export const axiosRealtimeTop10 = async <T>(): Promise<T> =>
  (await axiosInstance.get('/api/v1/news/realtime')).data;

export const axiosTimeSync = async <T>(): Promise<T> =>
  (await axiosInstance.get('/api/v1/timeSync')).data;

export const axiosHotBoardList = async <T>(page?: number, size?: number): Promise<T> =>
  (await axiosInstance.get('/api/v1/boards/list', { params: { page: page, size: size } })).data;

export const axiosConnectSSE = async <T>(clientId: number): Promise<T> =>
  (await axiosInstance.get('/api/v1/subscribe', { params: { clientId: clientId } })).data;

export const axiosDisconnectSSE = async <T>(clientId: number): Promise<T> =>
  (
    await axiosInstance.post('/api/v1/subscribe', JSON.stringify({ clientId }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;
//#endregion

//#region 로그인
export const axiosGoogleAccessToken = async <T>(code: string): Promise<T> =>
  (
    await axiosInstance.post('/api/v1/member/login/google', JSON.stringify({ code }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;

export const axiosKakaoAccessToken = async <T>(code: string): Promise<T> =>
  (
    await axiosInstance.post('/api/v1/member/login/kakao', JSON.stringify({ code }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;

export const axiosNaverAccessToken = async <T>(code: string, state: string): Promise<T> =>
  (
    await axiosInstance.post('/api/v1/member/login/naver', JSON.stringify({ code, state }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;
//#endregion

//#region 회원 정보
export const axiosUserProfile = async <T>(accessToken: string): Promise<T> =>
  (
    await axiosInstance.get('/api/v1/member/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;

export const axiosEditUsername = async <T>(accessToken: string, nickname: string): Promise<T> =>
  (
    await axiosInstance.patch('/api/v1/member/login/naver', JSON.stringify({ nickname }), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data;

export const axiosDeleteUser = async <T>(accessToken: string): Promise<T> =>
  (
    await axiosInstance.delete('/api/v1/member/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;

export const axiosMyScraps = async <T>(
  accessToken: string,
  page?: number,
  size?: number
): Promise<T> =>
  (
    await axiosInstance.get('/api/v1/member/scrap', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { page: page, size: size },
    })
  ).data;

export const axiosMyPosts = async <T>(
  accessToken: string,
  page?: number,
  size?: number
): Promise<T> =>
  (
    await axiosInstance.get('/api/v1/member/posts', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { page: page, size: size },
    })
  ).data;
//#endregion

//#region 게시판
export const axiosPosts = async <T>(boardId: number, page?: number, size?: number): Promise<T> =>
  (
    await axiosInstance.get(`/api/v1/boards/${boardId}/posts`, {
      params: { page: page, size: size },
    })
  ).data;

export const axiosPost = async <T>(boardId: number, postId: number): Promise<T> =>
  (await axiosInstance.get(`/api/v1/boards/${boardId}/posts/${postId}`)).data;

export const axiosUploadImages = async <T>(accessToken: string, images: FormData): Promise<T> =>
  (
    await axiosInstance.post('/api/v1/images/upload', images, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data;

export const axiosUploadPost = async <T>(
  accessToken: string,
  boardId: number,
  contents: FormData
): Promise<T> =>
  (
    await axiosInstance.post(`/api/v1/boards/${boardId}/posts`, contents, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data;

// [2025-06-11 이동규] 댓글 작성 추후 추가

export const axiosScrapPost = async <T>(
  accessToken: string,
  boardId: number,
  postId: number
): Promise<T> =>
  (
    await axiosInstance.post(`/api/v1/boards/${boardId}/posts/${postId}/scrap`, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;

export const axiosLike = async <T>(
  accessToken: string,
  boardName: string,
  boardId: number,
  postId: number
): Promise<T> =>
  (
    await axiosInstance.post(`/api/v1/boards/${boardName}/${boardId}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;
//#endregion
