import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
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
    default: 'ShareTextQR - Share Unlimited Text Across Any Device Instantly',
    template: '%s | ShareTextQR',
  },
  description:
    'Generate QR codes from text and access them instantly on phones, tablets, laptops, and desktops. No signups, no downloads, no apps. Free, fast, and privacy-focused text sharing.',
  keywords: [
    'text to qr code',
    'share text via qr code',
    'qr text generator',
    'unlimited qr code text',
    'text sharing qr code',
    'qr code message generator',
    'qr code communication',
    'online qr text generator',
    'instant qr sharing',
    'free qr code text tool',
    'transfer text between devices',
    'share notes through qr',
    'qr code note sharing',
    'send text from phone to pc',
    'cross device text sharing',
    'qr code productivity tool',
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
    title: 'ShareTextQR - Share Unlimited Text Across Any Device Instantly',
    description:
      'Generate QR codes from text and access them instantly on phones, tablets, laptops, and desktops. No signups, no downloads, no apps.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'ShareTextQR - Instant Text Sharing via QR Codes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShareTextQR - Share Unlimited Text Across Any Device Instantly',
    description:
      'Generate QR codes from text and access them instantly on phones, tablets, laptops, and desktops.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://sharetextqr.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="256x256" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="image" content="/og-image.svg" />
        <meta property="og:image" content="/og-image.svg" />
        <meta property="og:image:secure_url" content="https://sharetextqr.com/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="/og-image.svg" />
        <meta name="twitter:image:src" content="/og-image.png" />
        <meta name="twitter:image:alt" content="ShareTextQR - Instant Text Sharing via QR Codes" />
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
