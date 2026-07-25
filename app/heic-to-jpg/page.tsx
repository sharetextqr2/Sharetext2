import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const HeicToJpg = dynamic(() => import('@/components/tools/heic-to-jpg'), { ssr: false });

const faqItems = [
  { question: 'What is HEIC format?', answer: 'HEIC (High Efficiency Image Container) is Apple\'s default image format on iOS 11 and later. It offers better compression than JPG but is not supported on all devices.' },
  { question: 'Why convert HEIC to JPG?', answer: 'JPG is universally supported across all devices, websites, and applications. Converting HEIC to JPG ensures compatibility everywhere.' },
  { question: 'Will I lose quality after conversion?', answer: 'The conversion uses high-quality JPEG encoding (90% quality) to preserve visual fidelity. Some minor quality loss is inherent when converting between formats.' },
  { question: 'What if my browser does not support HEIC?', answer: 'HEIC conversion requires browser support. If conversion fails, try using Chrome or Edge. Safari on macOS also supports HEIC natively.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 50 MB are supported.' },
];

const relatedHrefs = ['/image-compressor', '/image-resizer', '/image-to-text', '/png-to-svg'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'HEIC to JPG Converter - Convert HEIC Images to JPG Online Free | ShareTextQR',
  description: 'Convert HEIC/HEIF images to JPG format online free. Upload Apple HEIC photos and download standard JPG files compatible with all devices.',
  path: '/heic-to-jpg',
  keywords: ['HEIC to JPG', 'convert HEIC to JPG', 'HEIC converter', 'Apple HEIC to JPG', 'HEIF to JPG', 'free HEIC converter'],
});

export default function HeicToJpgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR HEIC to JPG Converter', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Convert Apple HEIC images to JPG in your browser.', url: `${BASE_URL}/heic-to-jpg` }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 2, name: 'Image Tools', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 3, name: 'HEIC to JPG Converter' }] }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'HEIC to JPG Converter' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">HEIC to JPG Converter</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Convert Apple HEIC/HEIF photos to universally compatible JPG format. Works on any device, directly in your browser.</p></div>}
        interface={<HeicToJpg />}
        relatedTools={<RelatedTools currentToolHref="/heic-to-jpg" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
