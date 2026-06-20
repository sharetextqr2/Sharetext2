import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Share Text Online with QR Codes | ShareTextQR',
  description:
    'Share text online instantly using QR codes. Perfect for transferring notes, messages, passwords, and information between devices.',
  keywords: [
    'share text online',
    'send text online',
    'text sharing',
    'share notes online',
    'qr text sharing',
  ],
};

export default function ShareTextOnlinePage() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Share Text Online with QR Codes
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Share text online instantly using QR codes. Perfect for transferring notes, messages, passwords, and information between devices.
        </p>
      </div>
    </main>
  );
}
