import { cn } from '@/shared/lib';

interface SearchSectionTitleProps {
  title: string;
  count: number;
}

const SearchSectionTitle = ({ title, count }: SearchSectionTitleProps) => {
  return (
    <div className={cn('flex gap-x-2 text-2xl font-bold')}>
      <span className="text-gray-800">{title}</span>
      <span className={cn(count === 0 ? 'text-gray-500' : 'text-brand-500')}>{count}건</span>
    </div>
  );
};

export default SearchSectionTitle;
