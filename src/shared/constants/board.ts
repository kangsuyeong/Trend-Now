// 게시판 목록 한 페이지당 게시글 수
export const BOARD_PAGE_SIZE = 5;

// 게시판 타입별 ID, 이름, path 매핑
export const BOARD_MAP = {
  free: { id: 11, name: '자유' },
  entertain: { id: 13, name: '연예' },
  politics: { id: 12, name: '정치' },
} as const;
