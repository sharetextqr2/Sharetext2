import React from 'react';
import { cn } from '@/lib/utils';

interface SectionSpacingProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

const sizeClasses = {
  sm: 'py-8',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-20',
};

export function SectionSpacing({ children, className, size = 'lg', id }: SectionSpacingProps) {
  return (
    <section id={id} className={cn(sizeClasses[size], className)}>
      {children}
    </section>
  );
}
