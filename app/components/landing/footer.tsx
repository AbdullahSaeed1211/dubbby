'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto border-t border-border/40 py-4 bg-background">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dubbby. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
} 