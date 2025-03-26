'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollIndicatorProps {
  color?: string;
  height?: number;
}

export function ScrollIndicator({
  color = '#3B82F6', // Default to blue-500
  height = 3
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Only show the indicator after scrolling a bit
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 origin-left"
      style={{
        scaleX,
        backgroundColor: color,
        height: `${height}px`,
      }}
    />
  );
} 