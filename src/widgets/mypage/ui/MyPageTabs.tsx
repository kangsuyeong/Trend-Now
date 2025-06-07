import { cn } from '@/shared/lib';

type MyPageTabKey = 'posts' | 'comments' | 'scraps' | 'settings';

interface MyPageTabsProps {
  activeTab: MyPageTabKey;
  onTabChange: (tab: MyPageTabKey) => void;
}

interface Tab {
  id: MyPageTabKey;
  label: string;
  count?: number;
}
const tabs: Tab[] = [
  { id: 'posts', label: '내가 작성한 게시글', count: 31 },
  { id: 'comments', label: '내가 작성한 댓글', count: 16 },
  { id: 'scraps', label: '스크랩한 게시글', count: 4 },
  { id: 'settings', label: '설정' },
];

const MyPageTabs = ({ activeTab, onTabChange }: MyPageTabsProps) => {
  return (
    <div className="flex gap-5">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-3 pb-2 text-base font-bold',
              isActive ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-400'
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={cn(isActive ? 'text-brand-500' : 'text-gray-400')}>{tab.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MyPageTabs;

// transition-colors duration-200
