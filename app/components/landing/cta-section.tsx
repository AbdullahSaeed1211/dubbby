'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="px-4 sm:px-6 py-16 bg-primary/5">
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Scale Your Content Globally?
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Join successful creators who are already reaching international audiences. Our platform helps you break through language barriers and grow your revenue.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/sign-up">
                Start Scaling Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Get Pricing Details
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Transparent pricing</span>
            <span>•</span>
            <span>No hidden fees</span>
            <span>•</span>
            <span>Pay-as-you-go options</span>
          </div>
        </div>
      </div>
    </section>
  );
} 