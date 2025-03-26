"use client";

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  delay?: number;
  duration?: number;
  blur?: number;
  once?: boolean;
  threshold?: number;
  margin?: string;
}

export const BlurFade = ({
  children,
  className,
  direction = 'up',
  distance = 30,
  delay = 0,
  duration = 0.5,
  blur = 10,
  once = true,
  threshold = 0.1,
  margin = "0px",
}: BlurFadeProps) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
    rootMargin: margin,
  });

  // Determine initial position based on direction
  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case 'up':
      initialY = distance;
      break;
    case 'down':
      initialY = -distance;
      break;
    case 'left':
      initialX = distance;
      break;
    case 'right':
      initialX = -distance;
      break;
    default:
      break;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{
        opacity: 0,
        filter: `blur(${blur}px)`,
        x: initialX,
        y: initialY,
      }}
      animate={{
        opacity: inView ? 1 : 0,
        filter: inView ? 'blur(0px)' : `blur(${blur}px)`,
        x: inView ? 0 : initialX,
        y: inView ? 0 : initialY,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
