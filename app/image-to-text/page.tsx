import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';
import ImageToText from '@/components/tools/image-to-text';

const faqItems = [
  { question: 'How accurate is the OCR?', answer: 'Our OCR uses the OCR.Space API powered by advanced OCR engines. It delivers excellent accuracy for printed text, documents, receipts, and screenshots. Preprocessing enhances contrast and sharpness before OCR.' },
  { question: 'What image formats are supported?', answer: 'PNG, JPG, JPEG, WebP, BMP, and TIFF formats are supported.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 10 MB are supported.' },
  { question: 'Can I copy the extracted text?', answer: 'Yes, click the Copy button to copy the active tab content to your clipboard. You can also download as TXT, HTML, or JSON.' },
  { question: 'Is my image uploaded to a server?', answer: 'Your image is securely uploaded to OCR.Space for processing and is not stored. The API key is kept private server-side.' },
  { question: 'What output formats are available?', answer: 'You can view the results as Formatted Text, Plain Text, or Raw JSON. Download options include TXT, HTML, and JSON.' },
];

const relatedHrefs = ['/remove-background', '/image-compressor', '/passport-photo-maker', '/text-to-qr'];

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
