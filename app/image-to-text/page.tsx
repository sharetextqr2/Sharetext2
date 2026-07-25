import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const ImageToText = dynamic(() => import('@/components/tools/image-to-text'), { ssr: false });

const faqItems = [
  { question: 'How accurate is the OCR?', answer: 'Accuracy depends on image quality and text clarity. High-resolution images with clear, printed text yield the best results. Handwriting may have lower accuracy.' },
  { question: 'What image formats are supported?', answer: 'PNG, JPG, WebP, BMP, and TIFF formats are supported.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 20 MB are supported.' },
  { question: 'Can I copy the extracted text?', answer: 'Yes, click Copy Text to copy the extracted text to your clipboard, or Download .txt to save it as a file.' },
  { question: 'Is my image uploaded to a server?', answer: 'No. OCR processing runs entirely in your browser using Tesseract.js. Your images are never uploaded.' },
];

const relatedHrefs = ['/text-to-qr', '/png-to-svg', '/svg-viewer', '/remove-background'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'Image to Text - Extract Text from Images Online Free OCR | ShareTextQR',
  description: 'Extract text from images using free online OCR. Upload a PNG, JPG, or WebP image and get editable text instantly. No server uploads, fully private.',
  path: '/image-to-text',
  keywords: ['image to text', 'OCR online', 'extract text from image', 'image OCR', 'free OCR', 'text extraction from image'],
});

export default function ImageToTextPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR Image to Text OCR', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Extract text from images using browser-based OCR.', url: `${BASE_URL}/image-to-text` }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 2, name: 'Image Tools', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 3, name: 'Image to Text OCR' }] }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'Image to Text OCR' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">Image to Text (OCR)</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Extract text from images using optical character recognition. Upload a photo or screenshot and get editable text instantly — all in your browser.</p></div>}
        interface={<ImageToText />}
        relatedTools={<RelatedTools currentToolHref="/image-to-text" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
