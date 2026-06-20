'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Smartphone, Eye, Globe, Lock, Sparkles, Timer } from 'lucide-react';

const stats = [
  { value: '10M+', label: 'Text transfers', icon: Globe },
  { value: '<50ms', label: 'Generation time', icon: Timer },
  { value: '100+', label: 'Countries', icon: Sparkles },
  { value: '99.9%', label: 'Uptime', icon: Zap },
];

const trustBadges = [
  { name: 'Privacy First', icon: Shield, description: 'No data stored' },
  { name: 'Mobile Friendly', icon: Smartphone, description: 'Works on all devices' },
  { name: 'Fast & Light', icon: Zap, description: 'Optimized performance' },
  { name: 'Secure', icon: Lock, description: 'End-to-end encryption' },
];

export function TrustSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 mb-3">
                <stat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                <badge.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {badge.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {badge.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
