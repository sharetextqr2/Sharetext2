import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';
import SvgToPng from '@/components/tools/svg-to-png';

const faqItems = [
  { question: 'How does SVG to PNG conversion work?', answer: 'The SVG is rendered onto a canvas element and exported as a PNG image. This preserves the vector quality at the original SVG dimensions.' },
  { question: 'Will the PNG have a transparent background?', answer: 'Yes, if the original SVG has a transparent background, the resulting PNG will also have transparency.' },
  { question: 'What size will the PNG be?', answer: 'The PNG will match the original dimensions of the SVG file at full resolution.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 10 MB are supported.' },
  { question: 'Can I convert multiple SVGs at once?', answer: 'This tool processes one SVG at a time. Click "Convert Another" to process additional files.' },
];

const relatedHrefs = ['/png-to-svg', '/svg-viewer', '/image-compressor', '/heic-to-jpg'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'SVG to PNG Converter - Convert SVG to PNG Online Free | ShareTextQR',
  description: 'Convert SVG vector files to high-quality PNG images online free. Upload SVG and download PNG with transparent background support.',
  path: '/svg-to-png',
  keywords: ['SVG to PNG', 'convert SVG to PNG', 'SVG to PNG converter', 'vector to raster', 'free PNG converter'],
});

export default function SvgToPngPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR SVG to PNG Converter', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Convert SVG to PNG images instantly in your browser.', url: `${BASE_URL}/svg-to-png` }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'SVG to PNG Converter' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">SVG to PNG Converter</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Convert SVG vector files to high-quality PNG images. Perfect for when you need a raster version of your vector graphics.</p></div>}
        interface={<SvgToPng />}
        relatedTools={<RelatedTools currentToolHref="/svg-to-png" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
