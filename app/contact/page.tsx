import { seo } from '@/lib/seo';
import ContactPageClient from '@/components/contact-page-client';

export const metadata = seo({
  title: 'Contact ShareTextQR',
  description: 'Contact ShareTextQR for support, feedback, or questions about text sharing with QR codes. Reach out to our team for help and suggestions.',
  path: '/contact',
  keywords: ['contact sharetextqr', 'qr code support', 'text sharing help', 'qr code feedback', 'contact us'],
  ogType: 'website',
});

export default function ContactPage() {
  return <ContactPageClient />;
}
