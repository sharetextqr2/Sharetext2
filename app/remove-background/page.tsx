import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const RemoveBackground = dynamic(() => import('@/components/tools/remove-background'), { ssr: false });

const faqItems = [
  { question: 'How does the background removal work?', answer: 'The tool analyzes the image and removes pixels that match the background color. For best results, use images with a solid, contrasting background.' },
  { question: 'Will it work on complex images?', answer: 'Simple images with solid backgrounds work best. Complex photographs with multiple colors may not remove the background cleanly.' },
  { question: 'What image formats are supported?', answer: 'PNG, JPG, JPEG, and WebP formats are supported.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 20 MB are supported.' },
  { question: 'Can I keep the transparent background?', answer: 'Yes, the result is saved as a PNG with transparency, preserving the transparent background for use in designs.' },
];

const relatedHrefs = ['/image-to-text', '/image-compressor', '/image-resizer', '/passport-photo-maker'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'Remove Image Background Online Free | ShareTextQR Background Remover',
  description: 'Remove the background from images online free. Upload a photo and download a PNG with transparent background. Quick, private, and browser-based.',
  path: '/remove-background',
  keywords: ['remove background', 'background remover', 'remove image background', 'transparent background', 'free background remover', 'PNG background removal'],
});

export default function RemoveBackgroundPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR Background Remover', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Remove backgrounds from images in your browser.', url: `${BASE_URL}/remove-background` }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 2, name: 'Image Tools', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 3, name: 'Background Remover' }] }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'Background Remover' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">Remove Background</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Remove the background from any image automatically. Download your result as a PNG with a transparent background for use in designs.</p></div>}
        interface={<RemoveBackground />}
        relatedTools={<RelatedTools currentToolHref="/remove-background" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
