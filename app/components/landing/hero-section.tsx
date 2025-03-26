'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { AvatarCircles } from '@/components/magicui/avatar-circles';
import { Globe, MessageSquareText, Zap, ChevronRight, PlayCircle } from 'lucide-react';

interface HeroSectionProps {
  avatarUsers: Array<{ imageUrl: string; profileUrl: string }>;
}

export function HeroSection({ avatarUsers }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="px-4 sm:px-6 relative">
        <Spotlight
          className="absolute top-[-20rem] left-[-20rem] md:left-[-15rem] md:top-[-20rem]"
          fill="white"
        />
        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="max-w-4xl text-4xl font-bold md:text-6xl lg:text-7xl">
              Scale Your Content{' '}
              <AnimatedGradientText>Globally</AnimatedGradientText>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Stop losing revenue to language barriers. Our AI-powered dubbing platform helps you reach 15+ markets instantly, with perfect lip-sync and natural voices.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-muted/60 px-4 py-1.5 text-sm">
                <Globe className="h-4 w-4" />
                <span>15+ Languages</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-muted/60 px-4 py-1.5 text-sm">
                <MessageSquareText className="h-4 w-4" />
                <span>Perfect Lip-Sync</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-muted/60 px-4 py-1.5 text-sm">
                <Zap className="h-4 w-4" />
                <span>Fast Processing</span>
              </div>
            </div>

            <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:gap-3 items-center justify-center">
              <Button size="lg" className="group w-full sm:w-auto" asChild>
                <Link href="/sign-up" className="flex items-center gap-2">
                  Start Scaling Now
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto" asChild>
                <Link href="/sign-up">
                  <PlayCircle className="h-4 w-4" />
                  See How It Works
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 flex flex-col items-center">
              <AvatarCircles 
                avatarUrls={avatarUsers} 
                numPeople={99} 
                className="mb-3"
              />
              <p className="text-sm text-muted-foreground">Join content creators who are already scaling their reach globally</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 