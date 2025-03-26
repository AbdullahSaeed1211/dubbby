"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface AnimatedBeamProps {
  children: React.ReactNode;
  className?: string;
  beamClassName?: string;
  beamOpacity?: number;
  size?: number;
  delay?: number;
  beamColor?: string;
}

export const AnimatedBeam = ({
  children,
  className,
  beamClassName,
  beamOpacity = 0.4,
  size = 150,
  delay = 0,
  beamColor = "0 153 255", // Default blue color
}: AnimatedBeamProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the mouse movement
  const smoothX = useTransform(mouseX, (value) => value);
  const smoothY = useTransform(mouseY, (value) => value);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Set initial position in the center of the element
    const handleInitialPosition = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 2);
      }
    };

    handleInitialPosition();

    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current || !isHovered) return;
      
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMounted, isHovered, mouseX, mouseY]);

  return (
    <motion.div
      ref={divRef}
      className={cn('relative overflow-hidden', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={cn('pointer-events-none absolute inset-0 z-10 h-full w-full transition-opacity duration-300', beamClassName)}
        style={{
          background: `radial-gradient(${size}px circle at ${smoothX.get()}px ${smoothY.get()}px, rgba(${beamColor}/${isHovered ? beamOpacity : 0}), transparent 80%)`,
          opacity: isHovered ? 1 : 0,
        }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
};
