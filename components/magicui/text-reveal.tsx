"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface TextRevealProps {
  text: string;
  className?: string;
  revealText?: boolean;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  splitWords?: boolean;
  splitLetters?: boolean;
  revealOpacity?: boolean;
  maskClassName?: string;
}

export function TextReveal({
  text,
  className,
  revealText = true,
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  splitWords = false,
  splitLetters = false,
  revealOpacity = true,
  maskClassName,
}: TextRevealProps) {
  const controls = useAnimation();
  const textRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });
  
  // Combine refs
  const combinedRef = (node: HTMLDivElement | null) => {
    textRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [inView, controls, once]);

  // Split text into words and letters
  const words = text.split(' ');

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: revealOpacity ? 0 : 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  // Animation variants for letters or words when used as child animations
  const childVariants = {
    hidden: {
      y: revealText ? '100%' : 0,
      opacity: revealOpacity ? 0 : 1,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve (Expo.out)
      },
    },
  };

  // Conditional rendering based on splitWords and splitLetters
  if (splitLetters) {
    return (
      <motion.div
        ref={combinedRef}
        className={cn('flex flex-wrap', className)}
        aria-label={text}
        role="text"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {words.map((word, wordIndex) => (
          <React.Fragment key={`word-${wordIndex}`}>
            <span className="mr-1 flex">
              {Array.from(word).map((letter, letterIndex) => (
                <span
                  key={`letter-${letterIndex}`}
                  className={cn(
                    'relative inline-block whitespace-pre overflow-hidden', 
                    maskClassName
                  )}
                >
                  <motion.span
                    className="inline-block"
                    variants={childVariants}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </span>
          </React.Fragment>
        ))}
      </motion.div>
    );
  }

  if (splitWords) {
    return (
      <motion.div
        ref={combinedRef}
        className={cn('flex flex-wrap', className)}
        aria-label={text}
        role="text"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {words.map((word, i) => (
          <React.Fragment key={`word-${i}`}>
            <motion.div
              className={cn(
                'relative mr-1 inline-block overflow-hidden', 
                maskClassName
              )}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              transition={{
                delay: delay + (i * 0.05),
                duration: duration * 1.5
              }}
            >
              <motion.span
                className="inline-block"
                variants={childVariants}
                custom={i}
              >
                {word}
              </motion.span>
            </motion.div>
          </React.Fragment>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={combinedRef}
      className={cn('relative overflow-hidden', maskClassName)}
      initial="hidden"
      animate={controls}
    >
      <motion.p 
        className={className} 
        variants={childVariants}
        transition={{
          duration: duration * 1.2,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
