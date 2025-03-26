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

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollIndicator color="#3B82F6" height={4} />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <ComparisonSection />
        <PricingSection />
        <CTASection />
        
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
