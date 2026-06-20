import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Heart, Eye, Lightbulb, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/shared/card';

export const metadata: Metadata = {
  title: 'About ShareTextQR',
  description:
    'Learn about ShareTextQR - our mission to make text sharing across devices simple, fast, and private. Discover why we built the best QR text generator.',
  openGraph: {
    title: 'About ShareTextQR',
    description:
      'Learn about ShareTextQR - our mission to make text sharing across devices simple, fast, and private.',
  },
};

const values = [
  {
    icon: Lightbulb,
    title: 'Simplicity',
    description:
      'We believe powerful tools should be simple to use. One paste, one click, one scan—that\'s all it takes.',
  },
  {
    icon: Zap,
    title: 'Speed',
    description:
      'Time matters. Our infrastructure is optimized for instant QR generation in milliseconds, not seconds.',
  },
  {
    icon: Shield,
    title: 'Privacy',
    description:
      'Your text is yours. We don\'t store your content, track your usage, or sell your data. Privacy by design.',
  },
  {
    icon: Users,
    title: 'Accessibility',
    description:
      'Free core functionality for everyone. No device left behind. Works on any platform with a browser.',
  },
  {
    icon: Target,
    title: 'Innovation',
    description:
      'Constantly improving and adding features. We listen to users and build what matters.',
  },
  {
    icon: Heart,
    title: 'User-First',
    description:
      'Every decision starts with the user. Clean UI, thoughtful UX, and delightful interactions.',
  },
];

const timeline = [
  {
    year: '2023',
    title: 'The Idea',
    description:
      'Frustrated by the lack of simple text sharing tools, the idea for ShareTextQR was born from a simple need: move text between devices instantly.',
  },
  {
    year: '2024',
    title: 'Development',
    description:
      'Built with modern technologies and a focus on speed, simplicity, and privacy. Every pixel and every millisecond matters.',
  },
  {
    year: '2025',
    title: 'Launch',
    description:
      'ShareTextQR launched to help millions of users share text seamlessly across their devices.',
  },
  {
    year: 'Future',
    title: 'Growing Together',
    description:
      'Continuous improvements, new features, and community-driven development. The best is yet to come.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About ShareTextQR',
            description:
              'Learn about ShareTextQR and our mission to make text sharing across devices simple and private.',
            mainEntity: {
              '@type': 'Organization',
              name: 'ShareTextQR',
              url: 'https://sharetextqr.com',
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-4">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Making Text Sharing
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500">
              Effortless for Everyone
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            ShareTextQR was built from a simple frustration: why isn&apos;t there an easy way to share text between devices?
            No accounts, no apps, no complications. Just instant text transfer.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <Section background="default">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 mb-4">
              <Target className="h-3 w-3" />
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Democratize Text Sharing Across Devices
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We believe sharing text shouldn&apos;t require signups, downloads, or complicated workflows.
              Whether you&apos;re a student sharing notes, a developer moving code snippets, or a professional
              transferring information—text sharing should be simple, fast, and private.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              ShareTextQR removes the friction from device-to-device communication. One paste, one QR code,
              one scan. That&apos;s it. No middlemen, no stored data, no barriers.
            </p>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 rounded-full"
              asChild
            >
              <Link href="/#generator">
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Our Vision</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                A world where moving text between devices is as natural as speaking.
                Where technology disappears into the background and lets you focus on what matters—your content.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section background="muted" id="values">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-4">
            Core Values
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Drives Us Forward
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our values shape every product decision, every line of code, and every interaction with our users.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                <value.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline Section */}
      <Section background="default" id="story">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Building ShareTextQR
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500" />

            {timeline.map((item, index) => (
              <div key={item.year} className="relative pl-12 pb-12 last:pb-0">
                {/* Year marker */}
                <div className="absolute left-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join Millions Sharing Text Instantly
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Experience the simplest way to share text across any device.
            No signup required.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg shadow-black/20 rounded-full px-8 py-6 text-base font-semibold"
            asChild
          >
            <Link href="/#generator">
              Start Sharing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
