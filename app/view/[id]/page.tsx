import { seo } from '@/lib/seo';
import ViewPageClient from '@/components/view-page-client';

export const metadata = seo({
  title: 'View Shared Text | ShareTextQR',
  description: 'View shared text content directly from a QR code link. Copy the text, view it instantly, and continue sharing across your devices.',
  path: '/view/[id]',
  keywords: ['view shared text', 'qr text viewer', 'shared text link', 'text qr code', 'sharetextqr view'],
  noindex: true,
});

export default function ViewPage() {
  return <ViewPageClient />;
}
