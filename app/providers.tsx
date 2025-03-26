'use client';

import { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        ease: [0.16, 1, 0.3, 1], // Custom ease curve (Expo.out)
        duration: 0.6,
      }}
    >
      {children}
    </MotionConfig>
  );
} 