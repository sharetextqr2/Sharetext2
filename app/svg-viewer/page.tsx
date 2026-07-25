import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const SvgViewer = dynamic(() => import('@/components/tools/svg-viewer'), { ssr: false });

const faqItems = [
  { question: 'What is the SVG Viewer tool?', answer: 'The SVG Viewer lets you upload and inspect SVG files with zoom controls. You can view SVG details at various zoom levels without needing a vector editor.' },
  { question: 'Can I edit the SVG in this viewer?', answer: 'No, this tool is for viewing only. For SVG editing, use a dedicated vector editor like Inkscape or Figma.' },
  { question: 'What zoom levels are available?', answer: 'You can zoom from 25% to 500%, with preset Fit and 2x buttons for quick viewing.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 10 MB are supported.' },
  { question: 'Does this work on mobile?', answer: 'Yes, the viewer is fully responsive and works on mobile devices with touch support.' },
];

const relatedHrefs = ['/png-to-svg', '/svg-to-png', '/image-to-text', '/image-resizer'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'SVG Viewer - View and Inspect SVG Files Online Free | ShareTextQR',
  description: 'Upload and inspect SVG files online with our free SVG Viewer. Zoom, pan, and examine SVG details at any scale. No installation required.',
  path: '/svg-viewer',
  keywords: ['SVG viewer', 'view SVG online', 'SVG file viewer', 'SVG inspector', 'SVG zoom', 'free SVG viewer'],
});

export default function SvgViewerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR SVG Viewer', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'View and inspect SVG files in your browser.', url: `${BASE_URL}/svg-viewer` }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 2, name: 'Image Tools', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 3, name: 'SVG Viewer' }] }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'SVG Viewer' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">SVG Viewer</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Upload and inspect SVG files with zoom controls. View vector details at any scale without needing a graphics editor.</p></div>}
        interface={<SvgViewer />}
        relatedTools={<RelatedTools currentToolHref="/svg-viewer" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
