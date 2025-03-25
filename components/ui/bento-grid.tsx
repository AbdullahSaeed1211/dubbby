"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function BentoGridItem({
  title,
  description,
  icon,
  className,
  ...props
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-lg border bg-card p-6 transition-all hover:shadow-md",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
} 