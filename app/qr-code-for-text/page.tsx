import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code for Text Messages and Notes | ShareTextQR',
  description:
    'Create QR codes for text messages, notes, instructions, and information. Scan the QR code to view the text instantly.',
  keywords: [
    'qr code for text',
    'text message qr code',
    'notes qr code',
    'qr text generator',
    'text qr',
  ],
};

export default function QrCodeForTextPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          QR Code for Text Messages and Notes
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Create QR codes for text messages, notes, instructions, and information. Scan the QR code to view the text instantly.
        </p>
      </div>
    </main>
  );
}
