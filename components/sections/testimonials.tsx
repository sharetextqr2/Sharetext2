'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Section, SectionHeader } from '@/components/shared/card';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Graduate Student',
    location: 'Stanford University',
    content:
      'ShareTextQR has become essential for my research. I can quickly transfer lab notes and citation data between my tablet and laptop without any friction.',
    rating: 5,
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    role: 'Senior Developer',
    location: 'Tech Startup',
    content:
      'Finally, a simple way to move code snippets between machines. No more emailing myself or using complex sync tools. Just paste, scan, done.',
    rating: 5,
    avatar: 'MJ',
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Professor',
    location: 'MIT',
    content:
      'I use ShareTextQR in my lectures to share problem sets and resources with students. It works flawlessly every time and students love the simplicity.',
    rating: 5,
    avatar: 'ER',
  },
  {
    name: 'David Kim',
    role: 'Business Owner',
    location: 'E-commerce Store',
    content:
      'During customer calls, I can instantly share product guides and troubleshooting steps. My customers appreciate not having to wait for email attachments.',
    rating: 5,
    avatar: 'DK',
  },
  {
    name: 'Lisa Thompson',
    role: 'Event Coordinator',
    location: 'Event Agency',
    content:
      'We print QR codes generated from ShareTextQR on all our event materials. Attendees can instantly access schedules and venue information on their phones.',
    rating: 5,
    avatar: 'LT',
  },
  {
    name: 'Alex Rivera',
    role: 'Content Creator',
    location: 'YouTube',
    content:
      'As someone who creates content across multiple devices, ShareTextQR has streamlined my workflow. I can transfer script notes and research instantly.',
    rating: 5,
    avatar: 'AR',
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials" background="muted">
      <SectionHeader
        badge="Testimonials"
        title="Loved by Users Worldwide"
        description="See what students, professionals, and teams have to say about ShareTextQR."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="h-full p-6 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Quote Icon */}
              <Quote className="h-6 w-6 text-indigo-200 dark:text-indigo-800 mb-4" />

              {/* Content */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.role}, {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
