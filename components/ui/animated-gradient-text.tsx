"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  const gradientRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const gradientElement = gradientRef.current;
    if (!gradientElement) return;

    const updateGradientPosition = (e: MouseEvent) => {
      const rect = gradientElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate positions relative to the element
      const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

      gradientElement.style.setProperty("--x-position", `${xPercent}%`);
      gradientElement.style.setProperty("--y-position", `${yPercent}%`);
    };

    window.addEventListener("mousemove", updateGradientPosition);

    return () => {
      window.removeEventListener("mousemove", updateGradientPosition);
    };
  }, []);

  return (
    <span
      ref={gradientRef}
      className={cn(
        "relative bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]",
        className
      )}
      style={{
        "--x-position": "0%",
        "--y-position": "50%",
        backgroundSize: "400% 400%",
        backgroundPosition: "var(--x-position) var(--y-position)",
      } as React.CSSProperties}
    >
      {children}
    </span>
  );
} 