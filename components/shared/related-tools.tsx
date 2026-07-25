import React from 'react';
import { SectionTitle } from '@/components/shared/section-title';
import { ToolCard } from '@/components/shared/tool-card';
import { tools, type Tool } from '@/lib/tools-data';

interface RelatedToolsProps {
  currentToolHref: string;
  relatedHrefs: string[];
  className?: string;
}

export function RelatedTools({ currentToolHref, relatedHrefs, className }: RelatedToolsProps) {
  const related: Tool[] = relatedHrefs
    .map((href) => tools.find((t) => t.href === href))
    .filter((t): t is Tool => t !== undefined);

  if (related.length === 0) return null;

  return (
    <section className={className}>
      <SectionTitle title="Related Tools" align="left" className="mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {related.map((tool) => (
          <ToolCard key={tool.href} tool={tool} variant="list" />
        ))}
      </div>
    </section>
  );
}
