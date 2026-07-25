import React from 'react';
import { SectionTitle } from '@/components/shared/section-title';

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolFAQProps {
  items: FAQItem[];
  className?: string;
}

export function ToolFAQ({ items, className }: ToolFAQProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionTitle title="Frequently Asked Questions" align="left" className="mb-6" />
      <div className="space-y-4">
        {items.map((item, index) => (
          <details
            key={index}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <summary className="flex items-center justify-between px-5 py-4 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
              {item.question}
              <svg
                className="w-4 h-4 text-gray-500 shrink-0 group-open:rotate-180 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
