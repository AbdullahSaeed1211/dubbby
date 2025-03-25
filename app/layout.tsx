import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Navigation } from '@/components/ui/navigation';
import { Suspense } from 'react';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dubbby - AI Video Dubbing & Lip Sync",
  description: "Transform your videos with AI-powered dubbing and lip synchronization",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: 'hsl(var(--primary))',
          colorTextOnPrimaryBackground: 'hsl(var(--primary-foreground))',
        },
        elements: {
          formButtonPrimary: 
            'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2',
          card: 'bg-card',
          footer: 'text-muted-foreground',
        }
      }}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      afterSignOutUrl="/"
    >
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={<div className="container mx-auto max-w-4xl">Loading...</div>}>
              <Navigation />
            </Suspense>
            <main className="mx-auto w-full">{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
