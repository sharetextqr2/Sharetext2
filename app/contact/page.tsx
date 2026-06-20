import ContactPageClient from '@/components/contact-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact ShareTextQR',
  description:
    'Contact ShareTextQR for support, feedback, or questions about text sharing with QR codes. Reach out to our team for help and suggestions.',
  keywords: [
    'contact sharetextqr',
    'qr code support',
    'text sharing help',
    'qr code feedback',
    'contact us',
  ],
};

export default function ContactPage() {
  return <ContactPageClient />;
}
