import { seo } from '@/lib/seo';
import Link from 'next/link';

export const metadata = seo({
  title: 'Free QR Code Generator for Text | ShareTextQR',
  description: 'Generate QR codes for text completely free. Create, share, and scan QR codes instantly from any device.',
  path: '/free-qr-code-generator',
  keywords: ['free qr code generator', 'qr code creator', 'free qr maker', 'generate qr code', 'online qr generator'],
  noindex: true,
});

export default function FreeQrCodeGeneratorPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Free QR Code Generator for Text
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Generate QR codes for text completely free. Create, share, and scan QR codes instantly from any device.
        </p>
        <div className="mt-8">
          <Link href="/text-to-qr" className="inline-flex items-center px-6 py-3 bg-[#2563EB] text-white font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors">
            Create Your Free QR Code
          </Link>
        </div>
      </div>
    </main>
  );
}
