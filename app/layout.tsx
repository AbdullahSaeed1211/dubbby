import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast' 
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { ThemeProvider } from "./components/providers/theme-provider";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dubbby.com'),
  title: {
    default: 'Dubbby - AI Video Dubbing & Lip Sync for Content Creators',
    template: '%s | Dubbby - AI Video Dubbing Platform'
  },
  description: 'Transform your videos with AI-powered dubbing and perfect lip synchronization. Translate content into 15+ languages in 30 seconds. Boost engagement by 2.7X with Dubbby.',
  keywords: [
    'AI video dubbing',
    'lip sync technology',
    'video translation',
    'content creator tools',
    'multilingual videos',
    'AI dubbing software',
    'video localization',
    'automatic dubbing',
    'short form video',
    'TikTok dubbing',
    'YouTube dubbing',
    'Instagram reels dubbing'
  ],
  authors: [{ name: 'Dubbby Team' }],
  creator: 'Dubbby',
  publisher: 'Dubbby',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dubbby.com',
    siteName: 'Dubbby',
    title: 'Dubbby - AI Video Dubbing & Lip Sync for Content Creators',
    description: 'Transform your videos with AI-powered dubbing and perfect lip synchronization. Translate content into 15+ languages in 30 seconds. Boost engagement by 2.7X.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dubbby AI Video Dubbing Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubbby - AI Video Dubbing & Lip Sync',
    description: 'Transform your videos with AI-powered dubbing. 15+ languages, perfect lip-sync, 30-second processing.',
    images: ['/twitter-image.jpg'],
    creator: '@dubbby',
    site: '@dubbby',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://dubbby.com',
    languages: {
      'en-US': 'https://dubbby.com',
      'es-ES': 'https://dubbby.com/es',
      'fr-FR': 'https://dubbby.com/fr',
    },
  },
  category: 'Technology',
  classification: 'AI Video Tools',
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png", 
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider waitlistUrl="/waitlist">
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://api.clerk.com" />
          <link rel="dns-prefetch" href="https://fal.ai" />
          <meta name="theme-color" content="#3B82F6" />
          <meta name="application-name" content="Dubbby" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Dubbby" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#3B82F6" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <Navigation />
              {children}
              <Toaster />
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
