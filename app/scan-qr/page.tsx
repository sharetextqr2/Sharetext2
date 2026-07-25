import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import dynamic from 'next/dynamic';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';

const ScanQR = dynamic(() => import('@/components/tools/scan-qr'), { ssr: false });

const faqItems = [
  {
    question: 'How does the QR scanner work?',
    answer: 'The QR scanner uses your device camera to detect and decode QR codes in real time. Point your camera at a QR code and the decoded content appears instantly. You can then copy the text or open URLs directly.',
  },
  {
    question: 'Is my camera footage sent to a server?',
    answer: 'No. All QR detection happens locally in your browser using JavaScript. Your camera feed is never transmitted, stored, or shared with any server. The processing is 100% client-side for complete privacy.',
  },
  {
    question: 'What if my camera is not working?',
    answer: 'Ensure you have granted camera permission when prompted. If the camera still does not work, check that no other application is using your camera, and try using a supported browser like Chrome, Firefox, Edge, or Safari.',
  },
  {
    question: 'Can I scan QR codes from an image file?',
    answer: 'Currently, this tool only supports scanning via webcam. For scanning QR codes from uploaded images, you can use an image-based QR scanner tool.',
  },
  {
    question: 'What types of content can the scanner decode?',
    answer: 'The scanner can decode any QR code content, including URLs, plain text, phone numbers, email addresses, Wi-Fi credentials, and more. If the content is a URL, an Open URL button appears for quick access.',
  },
];

const jsonLdSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ShareTextQR QR Scanner with Webcam',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  description: 'Scan QR codes using your webcam. Decode any QR code instantly in your browser with full privacy.',
  url: `${BASE_URL}/scan-qr`,
};

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' },
    { '@type': 'ListItem', position: 2, name: 'QR Tools', item: BASE_URL + '/' },
    { '@type': 'ListItem', position: 3, name: 'QR Scanner with Webcam' },
  ],
};

export const metadata = seo({
  title: 'QR Scanner with Webcam - Scan QR Codes Online Free | ShareTextQR',
  description: 'Scan QR codes instantly using your webcam. Free online QR scanner that works in your browser. Decode any QR code with full privacy — no uploads, no servers.',
  path: '/scan-qr',
  keywords: ['QR scanner', 'scan QR code with webcam', 'online QR scanner', 'webcam QR reader', 'free QR scanner', 'decode QR code online'],
});

const relatedHrefs = ['/text-to-qr', '/image-to-text', '/svg-viewer', '/image-compressor'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export default function ScanQRPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ToolLayout
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'QR Tools', href: '/' },
          { label: 'QR Scanner with Webcam' },
        ]}
        header={
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              QR Scanner with Webcam
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">
              Scan QR codes instantly using your webcam. No uploads needed — your camera
              feed stays private and is processed entirely in your browser.
            </p>
          </div>
        }
        interface={<ScanQR />}
        relatedTools={
          <RelatedTools currentToolHref="/scan-qr" relatedHrefs={relatedHrefs} />
        }
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {homepageArticles.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        }
      />
    </>
  );
}
