import React from 'react';
import { cn } from '@/lib/utils';

interface AdContainerProps {
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

const heightClasses = {
  sm: 'h-16',
  md: 'h-24',
  lg: 'h-32',
};

export function AdContainer({ className, height = 'md' }: AdContainerProps) {
  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'w-full rounded-xl bg-gray-100 flex items-center justify-center text-sm text-gray-400 select-none',
          heightClasses[height]
        )}
        aria-label="Advertisement"
      >
        Advertisement
      </div>
    </div>
  );
}
