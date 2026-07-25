import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const TextToQR = dynamic(() => import('@/components/tools/text-to-qr'), { ssr: false });

const faqItems = [
  {
    question: 'How does the Text to QR tool work?',
    answer: 'Enter your text, click Generate QR, and we create a unique short link stored in our database. That link is encoded into a QR code you can scan to retrieve the text instantly.',
  },
  {
    question: 'Is there a character limit?',
    answer: 'No, there is no character limit. You can share unlimited text, including notes, URLs, code snippets, or entire documents. The character counter helps you track length.',
  },
  {
    question: 'Can I download the QR code as an image?',
    answer: 'Yes, you can download the QR code as a PNG image using the Download PNG button below the QR code. This is useful for printing or embedding in documents.',
  },
  {
    question: 'How long does the shared text remain available?',
    answer: 'The text remains available as long as the short link is valid. Links are not automatically deleted, ensuring your content stays accessible.',
  },
  {
    question: 'Can I preview the shared text before sharing?',
    answer: 'Yes, click the Preview button to open the shared text page in a new tab. This lets you verify the content before sharing the QR code with others.',
  },
];

const jsonLdSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ShareTextQR Text to QR Generator',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  description: 'Convert any text into a scannable QR code for easy sharing across devices.',
  url: `${BASE_URL}/text-to-qr`,
};

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' },
    { '@type': 'ListItem', position: 2, name: 'QR Tools', item: BASE_URL + '/' },
    { '@type': 'ListItem', position: 3, name: 'Text to QR Generator' },
  ],
};

export const metadata = seo({
  title: 'Text to QR Generator - Convert Text to QR Code Online Free | ShareTextQR',
  description: 'Easily convert any text into a scannable QR code. Share notes, URLs, code snippets, and more with a free online Text to QR generator. Create a QR code from text in seconds.',
  path: '/text-to-qr',
  keywords: ['text to QR', 'convert text to QR code', 'QR code generator', 'text to QR code online', 'share text QR', 'free QR generator'],
});

const relatedHrefs = ['/scan-qr', '/image-to-text', '/svg-viewer', '/png-to-svg'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export default function TextToQRPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ToolLayout
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'QR Tools', href: '/' },
          { label: 'Text to QR Generator' },
        ]}
        header={
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Text to QR Generator
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">
              Convert any text into a scannable QR code instantly. Share notes, URLs,
              code snippets, messages, and more by generating a QR code from text.
            </p>
          </div>
        }
        interface={<TextToQR />}
        relatedTools={
          <RelatedTools currentToolHref="/text-to-qr" relatedHrefs={relatedHrefs} />
        }
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {homepageArticles.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        }
      />
    </>
  );
}
