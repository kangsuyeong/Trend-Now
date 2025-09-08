import type { BoardType } from '@/shared/types';
import { PrimaryButton, SecondaryButton } from '@/shared/ui';

interface Tab {
  key: BoardType;
  label: string;
  count: number;
}

interface SearchTypeTabsProps {
  tabs: Tab[];
  currentTab: BoardType;
  onTabChange: (key: BoardType) => void;
  setPage: (page: number) => void;
}

const SearchTypeTabs = ({ tabs, currentTab, onTabChange, setPage }: SearchTypeTabsProps) => {
  return (
    <div className="flex gap-x-2">
      {tabs.map((tab) => {
        const isActive = tab.key === currentTab;
        return isActive ? (
          <PrimaryButton
            key={tab.key}
            variant="black"
            size="s"
            className="text-nowrap rounded-full"
          >
            {tab.label} {tab.count}건
          </PrimaryButton>
        ) : (
          <SecondaryButton
            key={tab.key}
            variant="gray"
            size="s"
            className="text-nowrap rounded-full"
            onClick={() => {
              onTabChange(tab.key);
              setPage(1);
            }}
          >
            {tab.label} {tab.count}건
          </SecondaryButton>
        );
      })}
    </div>
  );
};

export default SearchTypeTabs;
