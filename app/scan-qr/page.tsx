import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';
import { Shield, Zap, Smartphone, Globe, Check } from 'lucide-react';
import ScanQR from '@/components/tools/scan-qr';

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
  {
    question: 'Does it work on mobile devices?',
    answer: 'Yes, the scanner works on both desktop and mobile browsers. On Android Chrome and iPhone Safari, simply grant camera permission and point your device at any QR code.',
  },
];

export const metadata = seo({
  title: 'Scan QR with Webcam Online for Free | ShareTextQR',
  description: 'Scan QR codes instantly using your webcam. Free online QR code scanner with no app or login required. Works on desktop and mobile.',
  path: '/scan-qr',
  keywords: ['scan QR code with webcam', 'scan QR code', 'QR scanner', 'online QR scanner', 'scan QR online', 'webcam QR scanner', 'free QR scanner', 'QR code reader online'],
});

const relatedHrefs = ['/text-to-qr', '/share-text-online', '/text-to-qr-code', '/qr-code-for-text'];

const features = [
  { icon: Zap, title: 'Real-Time Detection', description: 'QR codes are detected and decoded instantly using your webcam. Point and scan with zero waiting time.' },
  { icon: Shield, title: '100% Private', description: 'Your camera feed never leaves your device. All processing happens locally in your browser. Nothing is uploaded.' },
  { icon: Smartphone, title: 'Works on Any Device', description: 'Use the scanner on desktop, tablet, or mobile. Compatible with Chrome, Firefox, Edge, and Safari.' },
  { icon: Globe, title: 'No App Required', description: 'Scan QR codes directly in your browser. No installation, no downloads, and no registration needed.' },
];

const benefits = [
  { icon: Check, title: 'Completely Free', description: 'No cost, no hidden charges, no premium plans. Use the QR scanner as much as you need.' },
  { icon: Check, title: 'No Account Needed', description: 'Start scanning instantly without creating an account or logging in.' },
  { icon: Check, title: 'Works Offline', description: 'Once the page is loaded, QR scanning works without an internet connection.' },
  { icon: Check, title: 'Supports All QR Types', description: 'Decode URLs, text, phone numbers, emails, Wi-Fi credentials, and more.' },
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

export default function ScanQRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR Scan QR with Webcam', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Scan QR codes instantly using your webcam. Free online QR code scanner with no app needed.', url: `${BASE_URL}/scan-qr` }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'QR Tools', href: '/' }, { label: 'Scan QR with Webcam' }]}
        header={
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Scan QR with Webcam</h1>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">Scan QR codes instantly using your webcam. No app, no registration and no software installation required.</p>
          </div>
        }
        interface={<ScanQR />}
        howToUse={
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Scan a QR Code with Webcam</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Allow Camera Access', description: 'Click Start Camera and grant permission when prompted by your browser. The scanner works entirely on your device.' },
                { step: '2', title: 'Point at QR Code', description: 'Hold your camera steady and point it at any QR code. The scanner automatically detects and decodes it in real time.' },
                { step: '3', title: 'Use the Result', description: 'Copy the decoded text, open URLs directly, or scan again. All your data stays on your device.' },
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use ShareTextQR QR Scanner?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((b) => <FeatureIcon key={b.title} icon={b.icon} title={b.title} description={b.description} />)}
            </div>
          </div>
        }
        relatedTools={<RelatedTools currentToolHref="/scan-qr" relatedHrefs={relatedHrefs} />}
        faq={<ToolFAQ items={faqItems} />}
        conclusion={
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Scanning QR Codes Instantly</h2>
            <p className="text-gray-500 leading-relaxed">ShareTextQR makes it easy to scan QR codes using your webcam. No app downloads, no signups, no privacy concerns — everything works right in your browser. Point, scan, and get your content instantly.</p>
          </div>
        }
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
