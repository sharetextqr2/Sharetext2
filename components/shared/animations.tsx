'use client';

import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';

type AnimationPreset = 'fadeIn' | 'slideUp' | 'scaleIn' | 'slideLeft' | 'slideRight';

const animationVariants: Record<AnimationPreset, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
};

interface AnimatedItemProps {
  children: React.ReactNode;
  preset?: AnimationPreset;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function AnimatedItem({
  children,
  preset = 'slideUp',
  delay = 0,
  duration,
  className = '',
  once = true,
}: AnimatedItemProps) {
  const variants = animationVariants[preset];
  const customVariants: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as { transition?: { duration?: number; ease?: Easing } }).transition,
        delay,
        duration: duration || ((variants.visible as { transition?: { duration?: number } }).transition?.duration),
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const fadeInVariant = animationVariants.fadeIn;
export const slideUpVariant = animationVariants.slideUp;
export const scaleInVariant = animationVariants.scaleIn;
