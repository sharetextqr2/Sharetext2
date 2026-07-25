import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://sharetextqr.com'),
  title: {
    default: 'ShareTextQR - Free Online QR Code & Image Tools',
    template: '%s | ShareTextQR',
  },
  description:
    'Free online QR code generator and image tools. Convert text to QR, scan QR codes, convert images, and more. No signup required.',
  keywords: [
    'qr code generator',
    'text to qr',
    'online qr code',
    'free image tools',
    'png to svg',
    'image compressor',
    'qr code scanner',
    'online utilities',
  ],
  authors: [{ name: 'ShareTextQR' }],
  creator: 'ShareTextQR',
  publisher: 'ShareTextQR',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sharetextqr.com',
    siteName: 'ShareTextQR',
    title: 'ShareTextQR - Free Online QR Code & Image Tools',
    description:
      'Free online QR code generator and image tools. Convert text to QR, scan QR codes, convert images, and more. No signup required.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'ShareTextQR - Free Online QR Code & Image Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShareTextQR - Free Online QR Code & Image Tools',
    description:
      'Free online QR code generator and image tools. Convert text to QR, scan QR codes, convert images, and more.',
    images: ['/og-image.svg'],
    creator: '@sharetextqr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
  alternates: {
    canonical: 'https://sharetextqr.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="256x256" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563EB" />
        <meta name="image" content="/og-image.svg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'ShareTextQR',
            url: 'https://www.sharetextqr.com',
          }),
        }} />
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
            </Script>
          </>
        ) : null}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="relative min-h-screen flex flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
