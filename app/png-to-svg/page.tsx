import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const PngToSvg = dynamic(() => import('@/components/tools/png-to-svg'), { ssr: false });

const faqItems = [
  { question: 'How does PNG to SVG conversion work?', answer: 'The tool uses image tracing to convert raster PNG pixels into scalable SVG vector paths. This allows you to resize the result without losing quality.' },
  { question: 'Will the SVG look exactly like my PNG?', answer: 'The conversion approximates the PNG as vector paths. Simple images with solid colors convert best. Complex photographs may lose detail compared to the original.' },
  { question: 'Can I edit the SVG after conversion?', answer: 'Yes, the resulting SVG file can be opened and edited in any vector graphics editor like Illustrator, Inkscape, or Figma.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 20 MB are supported.' },
  { question: 'Is my image uploaded to a server?', answer: 'No. All processing happens locally in your browser. Your images are never uploaded.' },
];

const relatedHrefs = ['/svg-to-png', '/svg-viewer', '/image-to-text', '/image-compressor'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'PNG to SVG Converter - Convert PNG Images to SVG Online Free | ShareTextQR',
  description: 'Convert PNG images to scalable SVG vectors online free. Upload a PNG and download a clean SVG file instantly. Perfect for logos, icons, and illustrations.',
  path: '/png-to-svg',
  keywords: ['PNG to SVG', 'convert PNG to SVG', 'PNG to SVG converter', 'image to vector', 'raster to vector', 'free SVG converter'],
});

export default function PngToSvgPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR PNG to SVG Converter', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Convert PNG images to SVG vectors instantly in your browser.', url: `${BASE_URL}/png-to-svg` }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 2, name: 'Image Tools', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 3, name: 'PNG to SVG Converter' }] }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'PNG to SVG Converter' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">PNG to SVG Converter</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Convert your PNG images into scalable SVG vectors. Perfect for logos, icons, and illustrations that need to look sharp at any size.</p></div>}
        interface={<PngToSvg />}
        relatedTools={<RelatedTools currentToolHref="/png-to-svg" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
