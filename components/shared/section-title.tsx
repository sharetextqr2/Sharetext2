import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ title, description, className, align = 'center' }: SectionTitleProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-2 text-gray-500 max-w-2xl">{description}</p>
      )}
    </div>
  );
}
