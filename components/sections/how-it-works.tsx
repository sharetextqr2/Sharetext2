'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clipboard, QrCode, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/shared/card';

const steps = [
  {
    step: 1,
    icon: Clipboard,
    title: 'Paste Your Text',
    description: 'Enter any text you want to share—notes, URLs, code, messages, or documents.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    step: 2,
    icon: QrCode,
    title: 'Generate QR Code',
    description: 'Click generate and your QR code appears instantly in milliseconds.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    step: 3,
    icon: Smartphone,
    title: 'Scan With Any Device',
    description: 'Use your phone, tablet, or another device to scan the QR code.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    step: 4,
    icon: CheckCircle,
    title: 'Access Content Instantly',
    description: 'Your text appears immediately on the scanning device. Done!',
    color: 'from-pink-500 to-rose-500',
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" background="muted">
      <SectionHeader
        badge="How It Works"
        title="Simple Steps to Share Text Across Devices"
        description="Share text between any devices in just four simple steps. No complicated setup required."
      />

      <div className="relative">
        {/* Connection Line - Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2 z-0" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden sm:block lg:hidden h-5 w-5 text-gray-300 dark:text-gray-600" />
                  )}
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex p-2 rounded-lg bg-gray-100 dark:bg-gray-700 mb-3`}
                >
                  <step.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
