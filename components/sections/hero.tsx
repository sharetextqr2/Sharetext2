'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRGenerator } from '@/components/shared/qr-generator';

const floatingElements = [
  { icon: Zap, delay: 0, x: -60, y: -20 },
  { icon: Shield, delay: 0.2, x: 60, y: -40 },
  { icon: Globe, delay: 0.4, x: -40, y: 60 },
  { icon: Sparkles, delay: 0.6, x: 50, y: 40 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-cyan-500/15 dark:bg-cyan-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-24">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50">
              <Sparkles className="h-4 w-4" />
              Free, Fast, and Privacy-Focused
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]"
          >
            Share Text Online Instantly
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500">
              with QR Code
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Paste text, generate a QR code, and share it instantly on any phone, tablet, laptop, or desktop. Recipients can copy text in one tap.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 rounded-full px-8 py-6 text-base font-semibold"
              asChild
            >
              <a href="#generator">
                Generate QR Code
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold border-gray-200 dark:border-gray-700"
              asChild
            >
              <Link href="#how-it-works">
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
          >
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Privacy First
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Instant Generation
            </span>
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-500" />
              Works Everywhere
            </span>
          </motion.div>
        </div>

        {/* QR Generator Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-20"
          id="generator"
        >
          <QRGenerator />
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 0.6,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { delay: item.delay + 0.5, duration: 0.3 },
                scale: { delay: item.delay + 0.5, duration: 0.3 },
                y: { delay: item.delay + 1, duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute hidden lg:block"
              style={{
                left: `calc(50% + ${item.x}px)`,
                top: `${320 + item.y}px`,
              }}
            >
              <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                <item.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
