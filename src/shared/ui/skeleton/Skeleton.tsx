import { cn } from '@/shared/lib';
import React from 'react';

export const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('animate-pulse rounded-md bg-gray-300', className)} {...props} />
);

Skeleton.displayName = 'Skeleton';
