import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transfer Text Between Devices Using QR Codes',
  description:
    'Quickly transfer text between phones, tablets, and computers using QR codes. No apps, cables, or signups required.',
  keywords: [
    'transfer text between devices',
    'share text phone to pc',
    'qr file transfer',
    'device text sharing',
    'cross device text transfer',
  ],
};

export default function TransferTextBetweenDevicesPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Transfer Text Between Devices Using QR Codes
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Quickly transfer text between phones, tablets, and computers using QR codes. No apps, cables, or signups required.
        </p>
      </div>
    </main>
  );
}
