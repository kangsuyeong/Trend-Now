import { logoutAction } from '@/features/logout';
import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_REST_API_URL;

// 쿠키를 보내지 않는 일반적인 요청을 위한 인스턴스
export const publicInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

// 쿠키를 포함해야 하는 인증 요청을 위한 인스턴스
export const privateInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000,
});

privateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 응답 에러 처리
    const originalRequest = error.config; // 실패한 요청 정보 저장
    // AT 토큰 만료 시
    if (
      typeof window !== 'undefined' &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 재시도 방지

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_REST_API_URL}/api/v1/member/access-token`,
          null,
          {
            withCredentials: true,
          }
        );
        return privateInstance(originalRequest); // 원래 요청 다시 시도
      } catch (error) {
        console.error('AT 토큰 재발급 실패:', error);
        // 임시 쿠키 제거
        await logoutAction();

        // 로그아웃 API
        // try {
        //   await axios.post(`${process.env.NEXT_PUBLIC_REST_API_URL}/api/v1/member/logout`, null, {
        //     withCredentials: true,
        //   });
        // } catch (error) {
        //   console.error('로그아웃 API 호출 실패', error);
        //   return Promise.reject(error);
        // }

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

//#region 실시간
export const axiosRealtimeTop10 = async <T>(): Promise<T> =>
  (await publicInstance.get('/api/v1/news/realtime')).data;

export const axiosTimeSync = async <T>(): Promise<T> =>
  (await publicInstance.get('/api/v1/timeSync')).data;

export const axiosHotBoardList = async <T>(page?: number, size?: number): Promise<T> =>
  (await publicInstance.get('/api/v1/boards/list', { params: { page, size } })).data;

export const axiosConnectSSE = async <T>(clientId: string): Promise<T> =>
  (await publicInstance.get('/api/v1/subscribe', { params: { clientId } })).data;

export const axiosDisconnectSSE = async <T>(clientId: string): Promise<T> =>
  (await publicInstance.post('/api/v1/unsubscribe', { clientId })).data;

export const axiosHotBoardInfo = async <T>(boardId: number): Promise<T> =>
  (await publicInstance.get('/api/v1/boards/realtime', { params: { boardId } })).data;
//#endregion

//#region 회원 정보
export const axiosUserProfile = async <T>(cookie?: string): Promise<T> => {
  // 요청에 사용할 설정 객체
  const config: AxiosRequestConfig = {};

  // cookie 인자가 전달된 경우 (서버 환경)에만 헤더를 추가
  if (cookie) {
    config.headers = {
      Cookie: cookie,
    };
  }

  const response = await privateInstance.get('/api/v1/member/me', config);
  return response.data;
};

export const axiosEditUsername = async <T>(nickname: string): Promise<T> =>
  (await privateInstance.patch('/api/v1/member/login/naver', JSON.stringify({ nickname }))).data;

export const axiosDeleteUser = async <T>(): Promise<T> =>
  (await privateInstance.delete('/api/v1/member/me')).data;

export const axiosMyScraps = async <T>(page?: number, size?: number): Promise<T> =>
  (await privateInstance.get('/api/v1/member/scrap', { params: { page, size } })).data;

export const axiosMyPosts = async <T>(page?: number, size?: number): Promise<T> =>
  (await privateInstance.get('/api/v1/member/posts', { params: { page, size } })).data;

export const axiosMyComments = async <T>(page?: number, size?: number): Promise<T> =>
  (await privateInstance.get('/api/v1/member/comments', { params: { page, size } })).data;

export const axiosLogout = async <T>() => await privateInstance.post('/api/v1/member/logout');

//#endregion

//#region 게시판
export const axiosPosts = async <T>(boardId: number, page?: number, size?: number): Promise<T> => {
  const { data } = await publicInstance.get(`/api/v1/boards/${boardId}/posts`, {
    params: { page: page, size: size },
  });
  return data;
};

export const axiosPost = async <T>(
  boardId: number,
  postId: number,
  cookie?: string
): Promise<T> => {
  // 요청에 사용할 설정 객체
  const config: AxiosRequestConfig = {};

  // cookie 인자가 전달된 경우 (서버 환경)에만 헤더를 추가
  if (cookie) {
    config.headers = {
      Cookie: cookie,
    };
  }
  const response = await privateInstance.get(`/api/v1/boards/${boardId}/posts/${postId}`, config);
  return response.data;
};

export const axiosUploadImages = async <T>(images: FormData): Promise<T> =>
  (await privateInstance.post('/api/v1/images/upload', images)).data;

export const axiosUploadPost = async <T>(
  boardId: number,
  title: string,
  content: string,
  imageIds: number[]
): Promise<T> =>
  (await privateInstance.post(`/api/v1/boards/${boardId}/posts`, { title, content, imageIds }))
    .data;

export const axiosUpdatePost = async <T>(
  boardId: number,
  postId: number,
  title: string,
  content: string,
  newImageIdList: number[],
  deleteImageIdList: number[]
): Promise<T> => {
  return await privateInstance.put(`/api/v1/boards/${boardId}/posts/${postId}`, {
    title,
    content,
    newImageIdList,
    deleteImageIdList,
  });
};

export const axiosDeletePost = async <T>(boardId: number, postId: number): Promise<T> => {
  return await privateInstance.delete(`/api/v1/boards/${boardId}/posts/${postId}`);
};

export const axiosScrapPost = async <T>(boardId: number, postId: number): Promise<T> =>
  (await privateInstance.post(`/api/v1/boards/${boardId}/posts/${postId}/scrap`, null)).data;

export const axiosLike = async <T>(
  boardName: string,
  boardId: number,
  postId: number
): Promise<T> =>
  (await privateInstance.post(`/api/v1/boards/${boardName}/${boardId}/posts/${postId}`)).data;

export const axiosCheckWriteCooldown = async <T>(boardId: number): Promise<T> =>
  (await privateInstance.get(`/api/v1/boards/${boardId}/posts/cooldown`)).data;
//#endregion

//#region 댓글
// 댓글 조회
export const axiosGetComments = async <T>(
  boardId: number,
  postId: number,
  accessToken: string | null,
  page?: number,
  size?: number
): Promise<T> =>
  (
    await privateInstance.get(`/api/v1/boards/${boardId}/posts/${postId}/comments`, {
      params: { page: page, size: size },
      headers: { jwt: `Bearer ${accessToken}` },
    })
  ).data;

// 댓글 저장
export const axiosWriteComment = async <T>(
  boardId: number,
  postId: number,
  content: string
): Promise<T> =>
  (await privateInstance.post(`/api/v1/boards/${boardId}/posts/${postId}/comments`, { content }))
    .data;

// 댓글 삭제
export const axiosDeleteComment = async <T>(
  boardId: number,
  postId: number,
  commentId: number
): Promise<T> =>
  (await privateInstance.delete(`/api/v1/boards/${boardId}/posts/${postId}/comments/${commentId}`))
    .data;

// 댓글 삭제
export const axiosEditComment = async <T>(
  boardId: number,
  postId: number,
  commentId: number,
  updateContent: string
): Promise<T> =>
  (
    await privateInstance.patch(`/api/v1/boards/${boardId}/posts/${postId}/comments/${commentId}`, {
      updateContent,
    })
  ).data;
//#endregion

//#region 검색
// 실시간 게시판 목록 검색
export const axiosSearchRealtimeBoards = async <T>(keyword: string): Promise<T> => {
  const { data } = await publicInstance.get(`/api/v1/search/realtimeBoards`, {
    params: { keyword },
  });

  return data;
};

// 실시간 게시판의 게시글 검색
export const axiosSearchRealtimePosts = async <T>(
  keyword: string,
  page: number = 1,
  size: number = 10
): Promise<T> => {
  const { data } = await publicInstance.get(`/api/v1/search/realtimePosts`, {
    params: { keyword, page, size },
  });

  return data;
};

// 고정 게시판의 게시글 검색
export const axiosSearchFixedBoardPosts = async <T>(
  keyword: string,
  boardId: number,
  page: number = 1,
  size: number = 10
): Promise<T> => {
  const { data } = await publicInstance.get(`/api/v1/search/fixedPosts`, {
    params: { keyword, boardId, page, size },
  });

  return data;
};

// 검색어 자동완성
export const axiosGetAutocomplete = async <T>(keyword: string): Promise<T> => {
  const { data } = await publicInstance.get('/api/v1/search/auto-complete', {
    params: { keyword },
  });

  return data;
};

//#endregion
