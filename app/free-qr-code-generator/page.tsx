import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free QR Code Generator for Text | ShareTextQR',
  description:
    'Generate QR codes for text completely free. Create, share, and scan QR codes instantly from any device.',
  keywords: [
    'free qr code generator',
    'qr code creator',
    'free qr maker',
    'generate qr code',
    'online qr generator',
  ],
};

export default function FreeQrCodeGeneratorPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Free QR Code Generator for Text
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Generate QR codes for text completely free. Create, share, and scan QR codes instantly from any device.
        </p>
      </div>
    </main>
  );
}
