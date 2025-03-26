'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';
type AnimationVariant = 'fade' | 'zoom' | 'slide' | 'none';

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: AnimationDirection;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  animate?: boolean;
}

export function ScrollAnimation({
  children,
  direction = 'up',
  variant = 'fade',
  delay = 0,
  duration = 0.5,
  className = '',
  threshold = 0.1,
  once = true,
  animate = true,
}: ScrollAnimationProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  // If animations are disabled, just return children
  if (!animate) {
    return <div className={className}>{children}</div>;
  }

  // Define initial animation properties
  let initial = {};
  
  // Fade animation
  if (variant === 'fade' || variant === 'slide' || variant === 'zoom') {
    initial = { ...initial, opacity: 0 };
  }
  
  // Zoom animation
  if (variant === 'zoom') {
    initial = { ...initial, scale: 0.8 };
  }
  
  // Slide animation
  if (variant === 'slide') {
    if (direction === 'up') initial = { ...initial, y: 40 };
    if (direction === 'down') initial = { ...initial, y: -40 };
    if (direction === 'left') initial = { ...initial, x: 40 };
    if (direction === 'right') initial = { ...initial, x: -40 };
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={
        inView
          ? { 
              opacity: 1, 
              scale: 1, 
              x: 0, 
              y: 0 
            }
          : initial
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
} 