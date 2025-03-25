'use client';

import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { ModeToggle } from './mode-toggle';
import { VideoIcon } from 'lucide-react';
import { Button } from './button';

export function Navigation() {
  const { isLoaded } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto max-w-4xl px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <VideoIcon className="h-6 w-6" />
            <span className="font-bold">Dubbby</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <ModeToggle />
          
          {isLoaded && (
            <>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <Link 
                    href="/dashboard" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-9 h-9"
                      }
                    }}
                    userProfileMode="modal"
                  />
                </div>
              </SignedIn>
              <SignedOut>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href="/sign-up">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </SignedOut>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 