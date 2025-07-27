type TabKey = 'posts' | 'comments' | 'scraps' | 'settings';
type TabInfo = { label: string };
type MypageTabRecord = Record<TabKey, TabInfo>;

export const mypageTabs: MypageTabRecord = {
  posts: { label: '내가 작성한 게시글' },
  comments: { label: '내가 작성한 댓글' },
  scraps: { label: '스크랩한 게시글' },
  settings: { label: '설정' },
} as const;
