'use client';

import { useEffect, useState } from 'react';
import { HeroSection } from '@/app/components/landing/hero-section';
import { ComparisonSection } from '@/app/components/landing/comparison-section';
import { FeaturesSection } from '@/app/components/landing/features-section';
import { PricingSection } from '@/app/components/landing/pricing-section';
import { CTASection } from '@/app/components/landing/cta-section';
import { Footer } from '@/app/components/landing/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Head from 'next/head';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWaitlistFloat, setShowWaitlistFloat] = useState(true);

  // Handle scroll event to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    // Add smooth scrolling to the document
    document.documentElement.style.scrollBehavior = 'smooth';

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://dubbby.com/#website",
        "url": "https://dubbby.com/",
        "name": "Dubbby",
        "description": "Transform your videos with AI-powered dubbing and perfect lip synchronization",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://dubbby.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://dubbby.com/#software",
        "name": "Dubbby",
        "applicationCategory": "VideoApplication",
        "operatingSystem": "Web Browser",
        "url": "https://dubbby.com/",
        "description": "AI-powered video dubbing platform that translates content into 15+ languages with perfect lip synchronization in 30 seconds",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free trial with 100 minutes included"
        },
        "featureList": [
          "AI Video Dubbing",
          "Perfect Lip Synchronization", 
          "15+ Language Support",
          "30-Second Processing",
          "High-Quality Voice Synthesis",
          "Content Creator Tools"
        ],
        "screenshot": "https://dubbby.com/og-image.jpg",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "150",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://dubbby.com/#organization",
        "name": "Dubbby",
        "url": "https://dubbby.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dubbby.com/logo.png"
        },
        "description": "Leading AI video dubbing platform for content creators",
        "foundingDate": "2024",
        "sameAs": [
          "https://twitter.com/dubbby",
          "https://linkedin.com/company/dubbby",
          "https://youtube.com/@dubbby"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "support@dubbby.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://dubbby.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://dubbby.com/"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      {/* Scroll Progress Indicator */}
      <ScrollIndicator color="#3B82F6" height={4} />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <ComparisonSection />
        <PricingSection />
        <CTASection />
        
        {/* Floating Waitlist Button */}
        <AnimatePresence>
          {showWaitlistFloat && (
            <motion.div
              className="fixed bottom-20 right-8 z-40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg" 
                asChild
              >
                <Link href="/waitlist">
                  Join Waitlist
                </Link>
              </Button>
              <button 
                onClick={() => setShowWaitlistFloat(false)}
                className="absolute -top-2 -right-2 h-5 w-5 bg-zinc-800 text-white rounded-full flex items-center justify-center text-xs"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
