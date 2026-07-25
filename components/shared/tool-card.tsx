import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Tool } from '@/lib/tools-data';

interface ToolCardProps {
  tool: Tool;
  variant?: 'grid' | 'list';
  className?: string;
}

export function ToolCard({ tool, variant = 'grid', className }: ToolCardProps) {
  const Icon = tool.icon;

  if (variant === 'list') {
    return (
      <Link
        href={tool.href}
        className={cn(
          'group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all duration-200',
          className
        )}
      >
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <span className="text-sm font-medium text-gray-900 block truncate">{tool.name}</span>
          <span className="text-xs text-gray-500 block truncate">{tool.description}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={tool.href}
      className={cn(
        'group flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-sm transition-all duration-200',
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <span className="text-sm font-medium text-gray-900">{tool.name}</span>
      <span className="text-xs text-gray-500 mt-1">{tool.description}</span>
    </Link>
  );
}
