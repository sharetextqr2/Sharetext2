import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const ImageCompressor = dynamic(() => import('@/components/tools/image-compressor'), { ssr: false });

const faqItems = [
  { question: 'How does image compression work?', answer: 'The tool re-encodes your image at a lower quality setting to reduce file size. The quality slider lets you balance between size and visual quality.' },
  { question: 'What quality setting should I use?', answer: '80% is a good starting point — it significantly reduces file size while maintaining good visual quality. Lower values save more space but may show artifacts.' },
  { question: 'What image formats are supported?', answer: 'PNG, JPG, JPEG, and WebP formats are supported.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 20 MB are supported.' },
  { question: 'Will the compression reduce image dimensions?', answer: 'No, the dimensions remain the same. Only the file size is reduced through quality adjustment.' },
];

const relatedHrefs = ['/image-resizer', '/image-to-text', '/remove-background', '/heic-to-jpg'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'Image Compressor - Compress Images Online Free | ShareTextQR',
  description: 'Compress images online free. Reduce JPEG and PNG file size while maintaining quality. Adjust compression level with a simple slider.',
  path: '/image-compressor',
  keywords: ['image compressor', 'compress image', 'reduce image size', 'JPEG compressor', 'PNG compressor', 'free image compression'],
});

export default function ImageCompressorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR Image Compressor', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Compress images in your browser with adjustable quality.', url: `${BASE_URL}/image-compressor` }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 2, name: 'Image Tools', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 3, name: 'Image Compressor' }] }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'Image Compressor' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">Image Compressor</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Reduce image file size while maintaining quality. Adjust the compression level with a simple slider and see before-and-after comparisons instantly.</p></div>}
        interface={<ImageCompressor />}
        relatedTools={<RelatedTools currentToolHref="/image-compressor" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
