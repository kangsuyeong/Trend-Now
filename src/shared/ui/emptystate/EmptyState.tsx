import { cn } from '@/shared/lib';

interface EmptyStateProps {
  message: string;
  className?: string;
}

const EmptyState = ({ message, className }: EmptyStateProps) => {
  return (
    <div
      className={cn('flex items-center justify-center rounded-[1.25rem] bg-gray-100', className)}
    >
      <p className="whitespace-pre-line text-center text-sm font-medium text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
