'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Section } from '@/components/shared/card';
import { toast } from 'sonner';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Email us for general inquiries',
    value: 'support@sharetextqr.com',
    href: 'mailto:support@sharetextqr.com',
  },
  {
    icon: MessageCircle,
    title: 'Feedback',
    description: 'Share your suggestions and feedback',
    value: 'Tell us what you think',
    href: '#contact-form',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Find quick answers',
    value: 'Browse FAQs',
    href: '/faq',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Message sent successfully! We&apos;ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question, feedback, or need help? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <Section background="default">
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method) => (
            <Link
              key={method.title}
              href={method.href}
              className="group p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                <method.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {method.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {method.description}
              </p>
              <span className="text-sm text-indigo-600 dark:text-indigo-400">
                {method.value}
              </span>
            </Link>
          ))}
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 rounded-full py-6"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </div>
      </Section>

      {/* Additional Help */}
      <Section background="muted">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check out our comprehensive FAQ section for instant answers.
          </p>
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="/faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              Browse FAQ
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
