'use client';

import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

interface GradientCardProps extends HTMLAttributes<HTMLDivElement> {
  gradientClassName?: string;
  borderClassName?: string;
  containerClassName?: string;
}

export function GradientCard({
  gradientClassName = 'bg-gradient-to-br from-blue-500 to-indigo-500',
  borderClassName = 'border border-white/10',
  containerClassName = 'bg-white dark:bg-zinc-900/80',
  className,
  children,
  ...props
}: GradientCardProps) {
  return (
    <div className="relative group">
      {/* Gradient background with blur effect */}
      <div 
        className={cn(
          "absolute -inset-0.5 opacity-30 group-hover:opacity-50 rounded-xl blur-sm transition duration-300",
          gradientClassName
        )}
        aria-hidden="true"
      />
      
      {/* Card content container */}
      <div 
        className={cn(
          "relative rounded-xl backdrop-blur-sm",
          borderClassName,
          containerClassName,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
} 