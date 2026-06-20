'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section, SectionHeader } from '@/components/shared/card';
import { motion } from 'framer-motion';

const faqs = [
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
  {
    question: 'Is ShareTextQR free?',
    answer:
      'Yes, ShareTextQR offers free core functionality for generating and sharing text via QR codes. Our mission is to make text sharing accessible to everyone, regardless of budget.',
  },
  {
    question: 'Do I need an app?',
    answer:
      'No app is required. ShareTextQR works entirely in your web browser. On mobile devices, you can scan QR codes using the built-in camera app that comes with iOS or Android. No downloads, no installations, just instant access.',
  },
  {
    question: 'Does it work on iPhone?',
    answer:
      'Absolutely! ShareTextQR works perfectly on iPhone. Simply open your camera app, point it at the QR code, and tap the notification to view the text. iOS has native QR code scanning built right into the camera app.',
  },
  {
    question: 'Does it work on Android?',
    answer:
      'Yes! ShareTextQR is fully compatible with Android devices. Most Android phones can scan QR codes directly through the camera app or Google Lens. Some devices may prompt you to download a QR scanner, but most modern Android phones have this built-in.',
  },
  {
    question: 'Is my text secure?',
    answer:
      'Privacy is our priority. Your text is processed temporarily for QR generation and is not stored on our servers after you leave. We believe in a privacy-first approach to text sharing, ensuring your content remains yours.',
  },
  {
    question: 'Can businesses use ShareTextQR?',
    answer:
      'Absolutely! ShareTextQR is ideal for businesses. Teams use it for sharing meeting notes, quick instructions, customer support guides, and internal communications. It streamlines workflows without requiring team members to install any software or create accounts.',
  },
  {
    question: 'How fast is QR generation?',
    answer:
      'QR generation happens in milliseconds. Our optimized infrastructure ensures that your QR codes appear instantly when you click generate. No waiting, no loading spinners—just immediate results every time.',
  },
  {
    question: 'Can I transfer notes from phone to PC?',
    answer:
      'Yes! ShareTextQR works both ways. Generate a QR on your phone and scan with your PC webcam, or generate on your PC and scan with your phone. It works seamlessly in any direction between any devices.',
  },
  {
    question: 'What makes ShareTextQR unique?',
    answer:
      'ShareTextQR combines unlimited text support, instant generation, cross-device compatibility, and a privacy-first approach in a beautiful, modern interface. Unlike traditional QR generators that focus on URLs, we\'re built specifically for text sharing with premium UX.',
  },
  {
    question: 'Can teams use ShareTextQR for collaboration?',
    answer:
      'Yes! Teams use ShareTextQR for quick information transfer during collaborative sessions. Whether you\'re sharing code snippets in a development sprint or distributing meeting notes, ShareTextQR makes team communication seamless.',
  },
  {
    question: 'Why use QR-based text sharing instead of messaging apps?',
    answer:
      'QR-based sharing is instant, doesn\'t require adding contacts, doesn\'t leave message history, and works without logging into any service. It\'s perfect for quick, one-time transfers when you just need to move text between devices without the overhead of messaging apps.',
  },
];

export function FAQSection() {
  return (
    <Section id="faq" background="default">
      <SectionHeader
        badge="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about ShareTextQR and text QR sharing."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 px-6 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="text-left py-4 hover:no-underline">
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  );
}
