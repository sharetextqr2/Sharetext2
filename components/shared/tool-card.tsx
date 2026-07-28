import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Tool } from '@/lib/tools-data';

interface ToolCardProps {
  tool: Tool;
  variant?: 'grid' | 'list';
  className?: string;
}

const iconPastelBg: Record<string, string> = {
  QrCode: 'bg-purple-100 text-purple-600',
  Scan: 'bg-blue-100 text-blue-600',
  Image: 'bg-emerald-100 text-emerald-600',
  FileImage: 'bg-amber-100 text-amber-600',
  Eye: 'bg-cyan-100 text-cyan-600',
  FileText: 'bg-indigo-100 text-indigo-600',
  Crop: 'bg-rose-100 text-rose-600',
  Minimize2: 'bg-orange-100 text-orange-600',
  Maximize2: 'bg-teal-100 text-teal-600',
  FileUp: 'bg-violet-100 text-violet-600',
  FileDown: 'bg-pink-100 text-pink-600',
};

function getPastelStyle(icon: React.ComponentType<{ className?: string }>) {
  const name = icon.displayName || icon.name || 'QrCode';
  return iconPastelBg[name] || 'bg-primary/10 text-primary';
}

export function ToolCard({ tool, variant = 'grid', className }: ToolCardProps) {
  const Icon = tool.icon;
  const pastelStyle = getPastelStyle(tool.icon);

  if (variant === 'list') {
    return (
      <Link
        href={tool.href}
        className={cn(
          'group flex items-center gap-3 p-4 card-premium-hover',
          className
        )}
      >
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110', pastelStyle)}>
          <Icon className="h-5 w-5" />
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
        'group flex flex-col items-center text-center p-6 card-premium-hover',
        className
      )}
    >
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-200 group-hover:scale-110', pastelStyle)}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium text-gray-900">{tool.name}</span>
      <span className="text-xs text-gray-500 mt-1">{tool.description}</span>
    </Link>
  );
}
