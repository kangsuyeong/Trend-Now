// 게시판 목록 한 페이지당 게시글 수
export const BOARD_PAGE_SIZE = 5;

// 게시판 타입별 ID 및 이름 매핑
export const BOARD_MAP = {
  free: { id: 1814, name: '자유' },
  entertain: { id: 1815, name: '연예' },
  politics: { id: 1816, name: '정치' },
} as const;
