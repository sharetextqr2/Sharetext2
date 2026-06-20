import ViewPageClient from '@/components/view-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'View Shared Text | ShareTextQR',
  description:
    'View shared text content directly from a QR code link. Copy the text, view it instantly, and continue sharing across your devices.',
  keywords: [
    'view shared text',
    'qr text viewer',
    'shared text link',
    'text qr code',
    'sharetextqr view',
  ],
};

export default function ViewPage() {
  return <ViewPageClient />;
}
