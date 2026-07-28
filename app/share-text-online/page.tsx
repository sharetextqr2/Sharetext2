import { seo } from '@/lib/seo';
import Link from 'next/link';

export const metadata = seo({
  title: 'Share Text Online with QR Codes | ShareTextQR',
  description: 'Share text online instantly using QR codes. Perfect for transferring notes, messages, passwords, and information between devices.',
  path: '/share-text-online',
  keywords: ['share text online', 'send text online', 'text sharing', 'share notes online', 'qr text sharing'],
  noindex: true,
});

export default function ShareTextOnlinePage() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Share Text Online with QR Codes
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Share text online instantly using QR codes. Perfect for transferring notes, messages, passwords, and information between devices.
        </p>
        <div className="mt-8">
          <Link href="/text-to-qr" className="inline-flex items-center px-6 py-3 bg-[#2563EB] text-white font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors">
            Start Sharing Text Now
          </Link>
        </div>
      </div>
    </main>
  );
}
