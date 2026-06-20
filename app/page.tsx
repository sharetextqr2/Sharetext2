import { HeroSection } from '@/components/sections/hero';
import { TrustSection } from '@/components/sections/trust';
import { FeaturesSection } from '@/components/sections/features';
import { HowItWorksSection } from '@/components/sections/how-it-works';
import { UseCasesSection } from '@/components/sections/use-cases';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { FAQSection } from '@/components/sections/faq-section';
import { CTASection } from '@/components/sections/cta-section';

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'ShareTextQR',
            url: 'https://sharetextqr.com',
            description:
              'Generate QR codes from text and access them instantly on phones, tablets, laptops, and desktops. No signups, no downloads, no apps.',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1250',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ShareTextQR',
            url: 'https://sharetextqr.com',
            logo: 'https://sharetextqr.com/logo.png',
            sameAs: [
              'https://twitter.com/sharetextqr',
              'https://github.com/sharetextqr',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is ShareTextQR?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ShareTextQR is a modern web application that allows you to instantly convert any text into a QR code. Simply paste your text, generate a QR code, and scan it with any device to access the content immediately.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there a character limit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ShareTextQR supports unlimited text sharing. You can share notes, documents, articles, instructions, code snippets, and long-form content without worrying about size restrictions.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is ShareTextQR free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, ShareTextQR offers free core functionality for generating and sharing text via QR codes. Our mission is to make text sharing accessible to everyone.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need an app?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No app is required. ShareTextQR works entirely in your web browser. On mobile devices, you can scan QR codes using the built-in camera app that comes with iOS or Android.',
                },
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators */}
      <TrustSection />

      {/* Features */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Use Cases */}
      <UseCasesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <CTASection />
    </>
  );
}
