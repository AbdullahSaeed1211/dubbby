'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, X, Check } from 'lucide-react';

export function ComparisonSection() {
  return (
    <section className="bg-muted/50 px-4 sm:px-6 py-16">
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Alternatives Are Expensive</h2>
          <p className="mt-4 text-muted-foreground">
            Skip expensive agencies and time-consuming DIY tasks.
            Dubbby makes it easy and affordable to create professional dubbed videos.
          </p>
          
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-destructive/20 bg-card p-6 shadow-sm">
              <div className="mb-2 flex justify-between">
                <h3 className="font-medium">Dubbing Agencies</h3>
                <div className="text-destructive">
                  <X className="h-5 w-5" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm">$50-120 per minute, monthly contracts starting at $4000</p>
            </div>
            
            <div className="rounded-lg border border-destructive/20 bg-card p-6 shadow-sm">
              <div className="mb-2 flex justify-between">
                <h3 className="font-medium">Do It Yourself</h3>
                <div className="text-destructive">
                  <X className="h-5 w-5" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm">Hours of work planning, recording, editing, and publishing</p>
            </div>
            
            <div className="rounded-lg border-2 border-primary/30 bg-card p-6 shadow-md relative overflow-hidden">
              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-2 py-1 rotate-0 font-medium">
                Recommended
              </div>
              <div className="mb-2 flex justify-between">
                <h3 className="font-medium">Dubbby</h3>
                <div className="text-primary">
                  <Check className="h-5 w-5" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm">Instantly create and publish videos with perfect AI dubbing</p>
            </div>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button size="lg" className="group" asChild>
              <Link href="/sign-up" className="flex items-center gap-2">
                Get Started Free
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 