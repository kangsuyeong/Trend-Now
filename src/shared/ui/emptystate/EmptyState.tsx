import { cn } from '@/shared/lib';

interface EmptyStateProps {
  children: React.ReactNode;
  className?: string;
}

const EmptyState = ({ children, className }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[1.25rem] bg-gray-100',
        className
      )}
    >
      {children}
    </div>
  );
};

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text = ({ children, className }: TextProps) => {
  return (
    <p
      className={cn('whitespace-pre-line text-center text-sm font-medium text-gray-500', className)}
    >
      {children}
    </p>
  );
};

EmptyState.Text = Text;
export default EmptyState;
