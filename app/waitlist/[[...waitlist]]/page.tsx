import { Waitlist } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Waitlist - Dubbby AI Video Dubbing Platform',
  description: 'Join the waitlist for early access to Dubbby, the AI-powered video dubbing platform. Be among the first to try our revolutionary lip-sync technology and get 100 free minutes.',
  keywords: [
    'Dubbby waitlist',
    'AI video dubbing early access',
    'video translation waitlist',
    'content creator tools waitlist',
    'AI dubbing beta',
    'multilingual video waitlist'
  ],
  openGraph: {
    title: 'Join the Dubbby Waitlist - Early Access to AI Video Dubbing',
    description: 'Be among the first to experience revolutionary AI video dubbing. Join our waitlist for early access and get 100 free minutes.',
    url: 'https://dubbby.com/waitlist',
    siteName: 'Dubbby',
    type: 'website',
    images: [
      {
        url: '/waitlist-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Join Dubbby Waitlist - AI Video Dubbing Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Dubbby Waitlist - AI Video Dubbing',
    description: 'Early access to revolutionary AI video dubbing with perfect lip-sync. Join now and get 100 free minutes.',
    images: ['/waitlist-twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://dubbby.com/waitlist',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WaitlistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Join Dubbby Waitlist",
            "description": "Join the waitlist for early access to Dubbby AI video dubbing platform",
            "url": "https://dubbby.com/waitlist",
            "mainEntity": {
              "@type": "Service",
              "name": "Dubbby AI Video Dubbing",
              "provider": {
                "@type": "Organization",
                "name": "Dubbby"
              },
              "description": "AI-powered video dubbing with perfect lip synchronization",
              "offers": {
                "@type": "Offer",
                "description": "Early access with 100 free minutes",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          })
        }}
      />
      
      <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              Join the Dubbby Waitlist
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Be among the first to try our AI-powered video dubbing and lip sync technology
            </p>
          </div>
          <Waitlist />
        </div>
      </div>
    </>
  );
} 