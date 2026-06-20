'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Zap,
  RefreshCw,
  Shield,
  Globe,
  Smartphone,
  Sparkles,
  Layout,
  Cloud,
  MonitorSmartphone,
} from 'lucide-react';
import { Section, SectionHeader } from '@/components/shared/card';

const features = [
  {
    icon: FileText,
    title: 'Unlimited Text Sharing',
    description:
      'Share notes, documents, articles, instructions, code snippets, and long-form content without size restrictions.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Instant QR Generation',
    description:
      'Generate QR codes in milliseconds. No waiting, no delays—just instant results when you need them.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: MonitorSmartphone,
    title: 'Cross-Device Access',
    description:
      'Transfer text between any devices seamlessly. Phone to laptop, tablet to desktop, and everything in between.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Designed with user privacy in mind. Your text is never stored on our servers after generation.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Cloud,
    title: 'No App Required',
    description:
      'Works directly in your browser. No downloads, no installations, no app store needed.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Globe,
    title: 'Universal Compatibility',
    description:
      'Works on Android, iPhone, Windows, Mac, Linux, Chromebook—any device with a camera and browser.',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: RefreshCw,
    title: 'Lightning Fast',
    description:
      'Optimized for speed and performance. Minimal loading times for the best user experience.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Layout,
    title: 'Modern Experience',
    description:
      'Clean and intuitive user interface designed for simplicity and ease of use.',
    gradient: 'from-orange-500 to-amber-500',
  },
];

export function FeaturesSection() {
  return (
    <Section id="features" background="gradient">
      <SectionHeader
        badge="Features"
        title="Everything You Need for Seamless Text Sharing"
        description="Powerful features designed to make sharing text across devices effortless, fast, and secure."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            <div className="h-full p-6 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg mb-4`}
              >
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient overlay */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
