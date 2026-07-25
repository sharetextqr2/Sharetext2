import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const PassportPhotoMaker = dynamic(() => import('@/components/tools/passport-photo-maker'), { ssr: false });

const faqItems = [
  { question: 'What passport sizes are available?', answer: 'We support 8 standard passport sizes: US (2×2 in), UK/EU/India (35×45 mm or 2×2 in), Canada (50×70 mm), Australia (35×45 mm), Japan (45×35 mm), and China (33×48 mm).' },
  { question: 'How is the photo cropped?', answer: 'The tool automatically centers your face in the frame using the selected passport size. Make sure your face is clearly visible and centered in the original photo.' },
  { question: 'What image formats are supported?', answer: 'PNG, JPG, JPEG, and WebP formats are supported.' },
  { question: 'Can I use a selfie for a passport photo?', answer: 'The tool works with any photo. For official passport photos, follow your local passport office guidelines regarding expression, background, and clothing.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 20 MB are supported.' },
];

const relatedHrefs = ['/image-resizer', '/remove-background', '/image-compressor', '/svg-to-png'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'Passport Photo Maker - Create Passport Photos Online Free | ShareTextQR',
  description: 'Create passport photos online free. Choose from US, UK, EU, Canada, Australia, Japan, China, and India standard sizes. Upload a photo and download instantly.',
  path: '/passport-photo-maker',
  keywords: ['passport photo maker', 'create passport photo', 'passport photo online', 'US passport photo', 'passport size photo', 'free passport photo'],
});

export default function PassportPhotoMakerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR Passport Photo Maker', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Create standard passport photos in your browser.', url: `${BASE_URL}/passport-photo-maker` }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 2, name: 'Image Tools', item: BASE_URL + '/' }, { '@type': 'ListItem', position: 3, name: 'Passport Photo Maker' }] }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'Passport Photo Maker' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">Passport Photo Maker</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Create standard passport photos for US, UK, EU, Canada, Australia, Japan, China, and India. Upload a photo and get a properly sized passport image instantly.</p></div>}
        interface={<PassportPhotoMaker />}
        relatedTools={<RelatedTools currentToolHref="/passport-photo-maker" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
