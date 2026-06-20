'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Code,
  Building,
  Headphones,
  Calendar,
  Megaphone,
  PenTool,
  Users,
  Microscope,
} from 'lucide-react';
import { Section, SectionHeader } from '@/components/shared/card';

const useCases = [
  {
    icon: GraduationCap,
    title: 'Students',
    description: 'Share class notes, study guides, and assignments across devices.',
    example: 'Transfer study notes from laptop to phone for on-the-go review.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BookOpen,
    title: 'Teachers',
    description: 'Distribute lesson content, instructions, and resources to students instantly.',
    example: 'Share classroom materials that students can scan and access immediately.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Code,
    title: 'Developers',
    description: 'Transfer code snippets, commands, and configuration between workstations.',
    example: 'Copy terminal commands from desktop to laptop without typing.',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: Building,
    title: 'Businesses',
    description: 'Share meeting summaries, instructions, and key information across teams.',
    example: 'Distribute quick guides to team members without email attachments.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Send troubleshooting steps, guides, and solutions directly to customers.',
    example: 'Share step-by-step instructions customers can follow on their device.',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    icon: Calendar,
    title: 'Event Organizers',
    description: 'Share event details, schedules, and venue information with attendees.',
    example: 'Display QR codes with event info that attendees can scan and save.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Megaphone,
    title: 'Marketers',
    description: 'Share campaign URLs, promotional codes, and marketing content.',
    example: 'Create scannable links for print materials and presentations.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: PenTool,
    title: 'Content Creators',
    description: 'Share draft content, notes, and ideas across devices during creation.',
    example: 'Transfer script notes from phone to computer while recording.',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Users,
    title: 'Remote Teams',
    description: 'Quickly share information between distributed team members.',
    example: 'Share quick references and notes during virtual collaborations.',
    gradient: 'from-slate-500 to-gray-500',
  },
  {
    icon: Microscope,
    title: 'Researchers',
    description: 'Transfer research notes, data, and references between devices.',
    example: 'Move citation data and notes from tablet to desktop for analysis.',
    gradient: 'from-teal-500 to-green-500',
  },
];

export function UseCasesSection() {
  return (
    <Section id="use-cases" background="default">
      <SectionHeader
        badge="Use Cases"
        title="Built for Everyone, Used Everywhere"
        description="ShareTextQR adapts to your workflow, no matter your role or industry."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {useCases.map((useCase, index) => (
          <motion.div
            key={useCase.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group"
          >
            <div className="h-full p-5 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700/50 hover:shadow-md transition-all duration-300">
              {/* Icon */}
              <div
                className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${useCase.gradient} text-white mb-3`}
              >
                <useCase.icon className="h-4 w-4" />
              </div>

              {/* Content */}
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {useCase.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                {useCase.description}
              </p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 italic">
                {useCase.example}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
