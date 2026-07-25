import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Text to QR Code Generator | ShareTextQR',
  description: 'Convert text into QR codes instantly. Create QR codes for notes, messages, instructions, and information sharing without any signup.',
  path: '/text-to-qr-code',
  keywords: ['text to qr code', 'convert text to qr', 'qr code for text', 'text qr generator', 'text sharing qr'],
  noindex: true,
});

export default function TextToQrCodePage() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Text to QR Code Generator
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Convert text into QR codes instantly. Create QR codes for notes, messages,
          instructions, and information sharing without any signup.
        </p>
      </div>
    </main>
  );
}
