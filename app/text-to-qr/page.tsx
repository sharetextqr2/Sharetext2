import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';
import { QrCode, Zap, Share2, Smartphone, Globe, Check } from 'lucide-react';
import TextToQR from '@/components/tools/text-to-qr';

const faqItems = [
  {
    question: 'How does the Text to QR tool work?',
    answer: 'Enter your text, click Generate QR, and we create a unique short link stored in our database. That link is encoded into a QR code you can scan to retrieve the text instantly.',
  },
  {
    question: 'Is there a character limit?',
    answer: 'No, there is no character limit. You can share unlimited text, including notes, URLs, code snippets, or entire documents. The character counter helps you track length.',
  },
  {
    question: 'How long does the shared text remain available?',
    answer: 'The text remains available as long as the short link is valid. Links are not automatically deleted, ensuring your content stays accessible.',
  },
  {
    question: 'Can I preview the shared text before sharing?',
    answer: 'Yes, click the Share button to open the shared text page in a new tab. This lets you verify the content before sharing the QR code with others.',
  },
  {
    question: 'Is my text stored securely?',
    answer: 'Yes, your text is stored securely in our database and can only be accessed via the unique short link generated for your QR code.',
  },
];

export const metadata = seo({
  title: 'Text to QR Generator - Convert Text to QR Code Online Free | ShareTextQR',
  description: 'Easily convert any text into a scannable QR code. Share notes, URLs, code snippets, and more with a free online Text to QR generator. Create a QR code from text in seconds.',
  path: '/text-to-qr',
  keywords: ['text to QR', 'convert text to QR code', 'QR code generator', 'text to QR code online', 'share text QR', 'free QR generator'],
});

const relatedHrefs = ['/scan-qr', '/share-text-online', '/text-to-qr-code', '/qr-code-for-text'];

const features = [
  { icon: Zap, title: 'Instant Generation', description: 'Generate a QR code from any text in seconds. No waiting, no processing time.' },
  { icon: Share2, title: 'Easy Sharing', description: 'Share your QR code via download, copy the link, or open the shared page directly.' },
  { icon: Smartphone, title: 'Works on All Devices', description: 'QR codes can be scanned by any smartphone camera or QR scanner app.' },
  { icon: Globe, title: 'Unlimited Text', description: 'No character limits. Share short notes or long documents with equal ease.' },
];

const benefits = [
  { icon: Check, title: '100% Free', description: 'No cost, no signup, no hidden charges. Use the tool as much as you need.' },
  { icon: Check, title: 'No Login Required', description: 'Start generating QR codes instantly without creating an account.' },
  { icon: Check, title: 'Privacy First', description: 'Your text is stored securely and only accessible via the unique share link.' },
  { icon: Check, title: 'Works Offline', description: 'The generated QR code works even without internet access when scanned.' },
];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

const FeatureIcon = ({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center shrink-0">
      <Icon className="h-5 w-5 text-[#2563EB]" />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  </div>
);

export default function TextToQRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR Text to QR Generator', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Convert any text into a scannable QR code for easy sharing across devices.', url: `${BASE_URL}/text-to-qr` }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'QR Tools', href: '/' }, { label: 'Text to QR Generator' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">Text to QR Generator</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Convert any text into a scannable QR code instantly. Share notes, URLs, code snippets, messages, and more by generating a QR code from text.</p></div>}
        interface={<TextToQR />}
        howToUse={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the Text to QR Generator</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Enter Your Text', description: 'Type or paste any text — notes, URLs, messages, or code snippets — into the input field.' },
                { step: '2', title: 'Generate QR Code', description: 'Click the Generate QR button. Your text is saved and a unique short link is created instantly.' },
                { step: '3', title: 'Share Anywhere', description: 'Download the QR code as PNG, copy the share link, or scan the code to view on any device.' },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold mb-4">{item.step}</div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
        features={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f) => <FeatureIcon key={f.title} icon={f.icon} title={f.title} description={f.description} />)}
            </div>
          </div>
        }
        benefits={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use ShareTextQR Text to QR?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((b) => <FeatureIcon key={b.title} icon={b.icon} title={b.title} description={b.description} />)}
            </div>
          </div>
        }
        relatedTools={<RelatedTools currentToolHref="/text-to-qr" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        conclusion={
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Sharing Text Instantly</h2>
            <p className="text-gray-500 leading-relaxed">ShareTextQR makes it easy to share text online using QR codes. No signup, no cost, no limits. Generate your first QR code now and share text instantly with anyone, anywhere.</p>
          </div>
        }
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
