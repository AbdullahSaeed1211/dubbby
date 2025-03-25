"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: string;
}

export function Spotlight({
  className,
  fill = "white",
  ...props
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("fixed h-screen w-screen top-0 left-0 pointer-events-none", className)}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${fill}, transparent 40%)`,
        }}
      />
    </div>
  );
} 