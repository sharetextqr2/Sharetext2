import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const ImageResizer = dynamic(() => import('@/components/tools/image-resizer'), { ssr: false });

const faqItems = [
  { question: 'How does image resizing work?', answer: 'Enter your desired width and height in pixels, and the tool resizes the image using high-quality canvas rendering. The aspect ratio can be maintained automatically.' },
  { question: 'What is aspect ratio?', answer: 'Aspect ratio is the proportional relationship between width and height. When enabled, changing one dimension automatically adjusts the other to keep the image from stretching.' },
  { question: 'What image formats are supported?', answer: 'PNG, JPG, JPEG, and WebP formats are supported.' },
  { question: 'Can I make an image smaller without losing quality?', answer: 'Reducing image size generally maintains visual quality well. Enlarging images may result in pixelation since new pixels must be interpolated.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 20 MB are supported.' },
];

const relatedHrefs = ['/image-compressor', '/image-to-text', '/remove-background', '/passport-photo-maker'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'Image Resizer - Resize Images Online Free | ShareTextQR',
  description: 'Resize images online free. Set custom width and height in pixels, maintain aspect ratio, and download your resized image instantly.',
  path: '/image-resizer',
  keywords: ['image resizer', 'resize image', 'image resize online', 'photo resizer', 'free image resizer', 'change image dimensions'],
});

export default function ImageResizerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR Image Resizer', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Resize images in your browser with custom dimensions.', url: `${BASE_URL}/image-resizer` }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 2, name: 'Image Tools', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 3, name: 'Image Resizer' }] }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'Image Resizer' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">Image Resizer</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Resize images to your exact specifications. Set custom width and height, maintain aspect ratio, and preview the result before downloading.</p></div>}
        interface={<ImageResizer />}
        relatedTools={<RelatedTools currentToolHref="/image-resizer" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
