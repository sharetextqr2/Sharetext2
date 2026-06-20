import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/shared/card';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description:
    'Find answers to common questions about ShareTextQR. Learn about text QR codes, privacy, compatibility, and how to share text across devices.',
  openGraph: {
    title: 'FAQ - ShareTextQR',
    description: 'Find answers to common questions about ShareTextQR and text QR sharing.',
  },
};

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is ShareTextQR?',
        answer:
          'ShareTextQR is a modern web application that allows you to instantly convert any text into a QR code. Simply paste your text, generate a QR code, and scan it with any device to access the content immediately. It\'s designed for seamless text sharing across devices without the need for apps, signups, or complicated workflows.',
      },
      {
        question: 'How does QR text sharing work?',
        answer:
          'QR text sharing is simple: you enter text into ShareTextQR, which generates a unique QR code. When you scan this QR code with any smartphone or tablet camera, the text is instantly displayed on that device. This creates a direct, instant bridge between devices without requiring any special software or accounts.',
      },
      {
        question: 'Is there a character limit?',
        answer:
          'ShareTextQR supports unlimited text sharing. You can share notes, documents, articles, instructions, code snippets, and long-form content without worrying about size restrictions. Our system is optimized to handle large amounts of text efficiently.',
      },
      {
        question: 'Can I share large documents?',
        answer:
          'Yes! ShareTextQR is designed to handle large text documents. Whether it\'s extensive research notes, long-form content, or detailed instructions, you can share it all through our QR code generation system.',
      },
    ],
  },
  {
    category: 'Pricing & Availability',
    questions: [
      {
        question: 'Is ShareTextQR free?',
        answer:
          'Yes, ShareTextQR offers free core functionality for generating and sharing text via QR codes. Our mission is to make text sharing accessible to everyone, regardless of budget.',
      },
      {
        question: 'Do I need to create an account?',
        answer:
          'No! ShareTextQR requires no registration, no account creation, and no sign-in process. Simply visit the site, generate your QR code, and start sharing instantly.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        question: 'Do I need an app?',
        answer:
          'No app is required. ShareTextQR works entirely in your web browser. On mobile devices, you can scan QR codes using the built-in camera app that comes with iOS or Android. No downloads, no installations, just instant access.',
      },
      {
        question: 'Does it work on iPhone?',
        answer:
          'Absolutely! ShareTextQR works perfectly on iPhone. Simply open your camera app, point it at the QR code, and tap the notification to view the text. iOS has native QR code scanning built right into the camera app since iOS 11.',
      },
      {
        question: 'Does it work on Android?',
        answer:
          'Yes! ShareTextQR is fully compatible with Android devices. Most modern Android phones can scan QR codes directly through the camera app or Google Lens. Some devices may prompt you to use Google Lens for QR scanning.',
      },
      {
        question: 'What devices are supported?',
        answer:
          'ShareTextQR works on any device with a web browser and camera. This includes Android phones/tablets, iPhones/iPads, Windows PCs with webcams, Mac computers, Linux machines, and Chromebooks.',
      },
      {
        question: 'How fast is QR generation?',
        answer:
          'QR generation happens in milliseconds. Our optimized infrastructure ensures that your QR codes appear instantly when you click generate. No waiting, no loading spinners—just immediate results every time.',
      },
    ],
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        question: 'Is my text secure?',
        answer:
          'Privacy is our priority. Your text is processed temporarily for QR generation and is not stored on our servers after generation. We believe in a privacy-first approach to text sharing, ensuring your content remains yours and is not tracked or stored.',
      },
      {
        question: 'Do you store my text?',
        answer:
          'No. ShareTextQR processes your text client-side for QR code generation and does not store your content on our servers. Once you close the page or generate a new code, the previous text is gone.',
      },
      {
        question: 'Can others access my QR code?',
        answer:
          'QR codes are inherently public—if someone sees and scans your QR code, they can view the text. For sensitive information, always use appropriate security measures and consider whether QR sharing is the right method for that content.',
      },
    ],
  },
  {
    category: 'Use Cases',
    questions: [
      {
        question: 'Can businesses use ShareTextQR?',
        answer:
          'Absolutely! ShareTextQR is ideal for businesses. Teams use it for sharing meeting notes, quick instructions, customer support guides, and internal communications. It streamlines workflows without requiring team members to install any software or create accounts.',
      },
      {
        question: 'Can students use ShareTextQR?',
        answer:
          'Yes! Students love ShareTextQR for transferring study notes, sharing research data, moving assignments between devices, and collaborating during group projects. It\'s the perfect tool for academic efficiency.',
      },
      {
        question: 'Can I transfer notes from phone to PC?',
        answer:
          'Yes! ShareTextQR works both ways. Generate a QR on your phone and scan with your PC webcam, or generate on your PC and scan with your phone. It works seamlessly in any direction between any devices.',
      },
      {
        question: 'Can I transfer text from laptop to mobile?',
        answer:
          'Absolutely! This is one of the most common use cases. Open ShareTextQR on your laptop, paste your text, generate the QR, and scan with your phone camera. Your text appears instantly on your mobile device.',
      },
    ],
  },
  {
    category: 'Competitive',
    questions: [
      {
        question: 'What makes ShareTextQR unique?',
        answer:
          'ShareTextQR combines unlimited text support, instant generation, cross-device compatibility, and a privacy-first approach in a beautiful, modern interface. Unlike traditional QR generators that focus on URLs, we\'re built specifically for text sharing with premium UX and no data storage.',
      },
      {
        question: 'Why is ShareTextQR better than traditional QR generators?',
        answer:
          'Traditional QR generators focus on URLs and marketing. ShareTextQR is purpose-built for text sharing with unlimited character support, faster generation, better UX, and a privacy-focused approach. No ads, no tracking, no data harvesting.',
      },
      {
        question: 'Why use QR-based text sharing instead of messaging apps?',
        answer:
          'QR-based sharing is instant, doesn\'t require adding contacts, doesn\'t leave message history, and works without logging into any service. It\'s perfect for quick, one-time transfers when you just need to move text between devices without the overhead of messaging apps.',
      },
      {
        question: 'Can QR text sharing reduce workflow friction?',
        answer:
          'Absolutely! By eliminating the need for accounts, apps, and messaging threads, QR text sharing makes device-to-device text transfer as simple as point and scan. No more emailing yourself or using complex sync tools.',
      },
    ],
  },
];

export default function FAQPage() {
  const allQuestions = faqs.flatMap((cat) => cat.questions);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allQuestions.map((q) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-4">
            Help Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to all your questions about ShareTextQR and text QR sharing.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <Section background="default">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.category}-${index}`}
                    className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 px-6 data-[state=open]:shadow-sm"
                  >
                    <AccordionTrigger className="text-left py-4 hover:no-underline">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-white/80 mb-8">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-full"
              asChild
            >
              <Link href="/#generator">
                Try ShareTextQR
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
