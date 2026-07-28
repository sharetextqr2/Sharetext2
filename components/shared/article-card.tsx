import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/lib/blog-data';

const categoryNames: Record<string, string> = {
  'qr-code-guides': 'QR Code Guides',
  productivity: 'Productivity',
  technology: 'Technology',
  education: 'Education',
  'device-tips': 'Device Tips',
  communication: 'Communication',
  'remote-work': 'Remote Work',
};

interface ArticleCardProps {
  post: BlogPost;
  className?: string;
}

export function ArticleCard({ post, className }: ArticleCardProps) {
  const categoryName = categoryNames[post.category] || post.category;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group block card-premium-hover overflow-hidden',
        className
      )}
    >
      <div className="p-6">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {categoryName}
        </span>
        <h3 className="text-base font-semibold text-gray-900 mt-2.5 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Read more <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
