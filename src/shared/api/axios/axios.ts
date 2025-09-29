import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Axios 요청 인터셉터 설정
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Zustand 스토어에서 현재 accessToken 가져오기
//     const token = useUserStore.getState().accessToken;
//     // accessToken이 존재할 경우, 요청 헤더에 Authorization 추가
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // 수정된 config 반환 → 이 설정으로 실제 요청이 전송됨
//     return config;
//   },
//   (error) => {
//     // 요청을 보내기 전 에러가 발생한 경우 처리
//     return Promise.reject(error); // 에러를 호출한 곳으로 전파
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // 응답 에러 처리
//     const originalRequest = error.config; // 실패한 요청 정보 저장

//     // AT 토큰 만료 시
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // 재시도 방지
//       useUserStore.getState().logout();
//       useUserStore.persist.clearStorage();

//       return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

//#region 실시간
export const axiosRealtimeTop10 = async <T>(): Promise<T> =>
  (await axiosInstance.get('/api/v1/news/realtime')).data;

export const axiosTimeSync = async <T>(): Promise<T> =>
  (await axiosInstance.get('/api/v1/timeSync')).data;

export const axiosHotBoardList = async <T>(page?: number, size?: number): Promise<T> =>
  (await axiosInstance.get('/api/v1/boards/list', { params: { page, size } })).data;

export const axiosConnectSSE = async <T>(clientId: string): Promise<T> =>
  (await axiosInstance.get('/api/v1/subscribe', { params: { clientId } })).data;

export const axiosDisconnectSSE = async <T>(clientId: string): Promise<T> =>
  (await axiosInstance.post('/api/v1/unsubscribe', { clientId })).data;

export const axiosHotBoardInfo = async <T>(boardId: number): Promise<T> =>
  (await axiosInstance.get('/api/v1/boards/realtime', { params: { boardId } })).data;
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
export const axiosUserProfile = async <T>(cookie?: string): Promise<T> => {
  // 요청에 사용할 설정 객체
  const config: AxiosRequestConfig = {};

  // cookie 인자가 전달된 경우 (서버 환경)에만 헤더를 추가
  if (cookie) {
    config.headers = {
      Cookie: cookie,
    };
  }

  const response = await axiosInstance.get('/api/v1/member/me', config);
  return response.data;
};

export const axiosEditUsername = async <T>(nickname: string): Promise<T> =>
  (await axiosInstance.patch('/api/v1/member/login/naver', JSON.stringify({ nickname }))).data;

export const axiosDeleteUser = async <T>(): Promise<T> =>
  (await axiosInstance.delete('/api/v1/member/me')).data;

export const axiosMyScraps = async <T>(page?: number, size?: number): Promise<T> =>
  (await axiosInstance.get('/api/v1/member/scrap', { params: { page, size } })).data;

export const axiosMyPosts = async <T>(page?: number, size?: number): Promise<T> =>
  (await axiosInstance.get('/api/v1/member/posts', { params: { page, size } })).data;

export const axiosMyComments = async <T>(page?: number, size?: number): Promise<T> =>
  (await axiosInstance.get('/api/v1/member/comments', { params: { page, size } })).data;
//#endregion

//#region 게시판
export const axiosPosts = async <T>(boardId: number, page?: number, size?: number): Promise<T> => {
  const { data } = await axiosInstance.get(`/api/v1/boards/${boardId}/posts`, {
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
  const response = await axiosInstance.get(`/api/v1/boards/${boardId}/posts/${postId}`);
  return response.data;
};

export const axiosUploadImages = async <T>(images: FormData): Promise<T> =>
  (await axiosInstance.post('/api/v1/images/upload', images)).data;

export const axiosUploadPost = async <T>(
  boardId: number,
  title: string,
  content: string,
  imageIds: number[]
): Promise<T> =>
  (await axiosInstance.post(`/api/v1/boards/${boardId}/posts`, { title, content, imageIds })).data;

export const axiosUpdatePost = async <T>(
  boardId: number,
  postId: number,
  title: string,
  content: string,
  newImageIdList: number[],
  deleteImageIdList: number[]
): Promise<T> => {
  return await axiosInstance.put(`/api/v1/boards/${boardId}/posts/${postId}`, {
    title,
    content,
    newImageIdList,
    deleteImageIdList,
  });
};

export const axiosDeletePost = async <T>(boardId: number, postId: number): Promise<T> => {
  return await axiosInstance.delete(`/api/v1/boards/${boardId}/posts/${postId}`);
};

export const axiosScrapPost = async <T>(boardId: number, postId: number): Promise<T> =>
  (await axiosInstance.post(`/api/v1/boards/${boardId}/posts/${postId}/scrap`, null)).data;

export const axiosLike = async <T>(
  boardName: string,
  boardId: number,
  postId: number
): Promise<T> =>
  (await axiosInstance.post(`/api/v1/boards/${boardName}/${boardId}/posts/${postId}`)).data;

export const axiosCheckWriteCooldown = async <T>(boardId: number): Promise<T> =>
  (await axiosInstance.get(`/api/v1/boards/${boardId}/posts/cooldown`)).data;
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
    await axiosInstance.get(`/api/v1/boards/${boardId}/posts/${postId}/comments`, {
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
  (await axiosInstance.post(`/api/v1/boards/${boardId}/posts/${postId}/comments`, { content }))
    .data;

// 댓글 삭제
export const axiosDeleteComment = async <T>(
  boardId: number,
  postId: number,
  commentId: number
): Promise<T> =>
  (await axiosInstance.delete(`/api/v1/boards/${boardId}/posts/${postId}/comments/${commentId}`))
    .data;

// 댓글 삭제
export const axiosEditComment = async <T>(
  boardId: number,
  postId: number,
  commentId: number,
  updateContent: string
): Promise<T> =>
  (
    await axiosInstance.patch(`/api/v1/boards/${boardId}/posts/${postId}/comments/${commentId}`, {
      updateContent,
    })
  ).data;
//#endregion

//#region 검색
// 실시간 게시판 목록 검색
export const axiosSearchRealtimeBoards = async <T>(keyword: string): Promise<T> => {
  const { data } = await axiosInstance.get(`/api/v1/search/realtimeBoards`, {
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
  const { data } = await axiosInstance.get(`/api/v1/search/realtimePosts`, {
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
  const { data } = await axiosInstance.get(`/api/v1/search/fixedPosts`, {
    params: { keyword, boardId, page, size },
  });

  return data;
};

// 검색어 자동완성
export const axiosGetAutocomplete = async <T>(keyword: string): Promise<T> => {
  const { data } = await axiosInstance.get('/api/v1/search/auto-complete', {
    params: { keyword },
  });

  return data;
};

//#endregion
