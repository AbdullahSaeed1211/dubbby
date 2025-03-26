'use client';

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AnimatedGradientTextProps {
  text?: string;
  className?: string;
  gradientClassName?: string;
  children?: React.ReactNode;
}

export const AnimatedGradientText = ({
  text,
  className,
  gradientClassName,
  children,
}: AnimatedGradientTextProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Set initial position in the center of the element
    const handleInitialPosition = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setPosition({
          x: rect.width / 2,
          y: rect.height / 2,
        });
      }
    };

    handleInitialPosition();

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;
      
      const rect = textRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add smoothing to the mouse movement
      setPosition(prev => ({
        x: prev.x + (x - prev.x) * 0.2,
        y: prev.y + (y - prev.y) * 0.2,
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMounted]);

  const renderText = () => {
    if (children) return children;
    return text;
  };

  return (
    <motion.h1
      ref={textRef}
      className={cn(
        'bg-clip-text text-transparent transition-all duration-1000',
        'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
        gradientClassName,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{
        backgroundImage: isMounted
          ? `radial-gradient(circle at ${position.x}px ${position.y}px, 
              rgba(59, 130, 246, 0.9) 0%, 
              rgba(99, 102, 241, 0.9) 25%, 
              rgba(139, 92, 246, 0.8) 50%, 
              rgba(99, 102, 241, 0.8) 75%, 
              rgba(59, 130, 246, 0.9) 100%)`
          : '',
        transition: 'background-position 0.3s ease, background-size 0.3s ease',
      }}
    >
      {renderText()}
    </motion.h1>
  );
};
