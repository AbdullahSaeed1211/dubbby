'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, TimerIcon, BadgeCheck } from 'lucide-react';
import { BillingToggle } from '@/components/ui/billing-toggle';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { BlurFade } from '@/components/magicui/blur-fade';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [focusedPlan, setFocusedPlan] = useState<string | null>(null);

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      return Math.round(monthlyPrice * 12 * 0.8); // 20% discount for annual
    }
    return monthlyPrice;
  };

  const MotionCheckCircle = motion(CheckCircle);

  return (
    <section id="pricing" className="px-4 sm:px-6 py-20 bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-blue-950/10">
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <BlurFade direction="up">
            <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 mb-4">
              Pricing That Makes Sense
            </span>
            <h2 className="text-4xl font-bold sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Transparent, Affordable Plans</h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Built specifically for short-form creators: Faster, simpler, and more affordable than any alternative
            </p>
          </BlurFade>

          <motion.div 
            className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-full text-red-600 dark:text-red-400"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TimerIcon className="h-4 w-4" />
            <p className="font-medium text-sm animate-pulse">Flash Sale: 20% off all plans ends in 23h 59m</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <BillingToggle onToggle={setIsAnnual} />
          </motion.div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Starter Plan */}
            <BlurFade direction="right" delay={0.1}>
              <motion.div 
                className="rounded-xl border bg-card shadow-sm p-8 transition-all duration-200"
                onHoverStart={() => setFocusedPlan('starter')}
                onHoverEnd={() => setFocusedPlan(null)}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "rgba(59, 130, 246, 0.4)"
                }}
              >
                <AnimatePresence>
                  {focusedPlan === 'starter' && (
                    <motion.div 
                      className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-50 to-transparent dark:from-blue-950/10 dark:to-transparent -z-10" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                
                <div className="mb-6 flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">Starter</h3>
                  <div className="flex items-baseline gap-1">
                    <motion.span 
                      className="text-3xl font-bold"
                      key={`price-starter-${isAnnual}`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      ${calculatePrice(19)}
                    </motion.span>
                    <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Perfect for beginners</p>
                </div>
                
                <div className="mt-4 space-y-3">
                  {['30 minutes/month', '5 languages', '720p max resolution', 'Email support'].map((feature, i) => (
                    <motion.div 
                      className="flex items-center gap-2"
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + (i * 0.1) }}
                    >
                      <MotionCheckCircle 
                        className="h-5 w-5 text-primary opacity-80" 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.2 + (i * 0.1) 
                        }}
                      />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button className="w-full" asChild>
                    <Link href="/waitlist">Get Started</Link>
                  </Button>
                </div>
              </motion.div>
            </BlurFade>
            
            {/* Growth Plan */}
            <BlurFade direction="up" delay={0.2}>
              <motion.div 
                className="rounded-xl border-2 border-primary/50 bg-card shadow-xl p-8 scale-105 relative z-10 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-blue-500/5 before:to-indigo-500/5 before:-z-10"
                onHoverStart={() => setFocusedPlan('growth')}
                onHoverEnd={() => setFocusedPlan(null)}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  borderColor: "rgba(79, 70, 229, 0.6)"
                }}
              >
                <AnimatePresence>
                  {focusedPlan === 'growth' && (
                    <motion.div 
                      className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-50/80 via-blue-50/30 to-transparent dark:from-indigo-950/20 dark:via-blue-950/10 dark:to-transparent -z-10" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    MOST POPULAR
                  </motion.div>
                </div>
                
                <div className="mb-6 flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">Growth</h3>
                  <div className="flex items-baseline gap-1">
                    <motion.span 
                      className="text-3xl font-bold"
                      key={`price-growth-${isAnnual}`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      ${calculatePrice(49)}
                    </motion.span>
                    <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">For professional content creators</p>
                </div>
                
                <div className="mt-4 space-y-3">
                  {[
                    { text: <><span className="font-bold">120 minutes</span>/month + <span className="text-green-600 font-bold">100 FREE</span></>, highlight: true },
                    { text: 'All 15+ languages', highlight: false },
                    { text: '1080p max resolution', highlight: false },
                    { text: 'Priority support', highlight: false },
                    { text: 'API access', highlight: false },
                    { text: 'Save $197/year with annual plan', highlight: true }
                  ].map((feature, i) => (
                    <motion.div 
                      className="flex items-center gap-2"
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + (i * 0.1) }}
                    >
                      <MotionCheckCircle 
                        className={`h-5 w-5 ${feature.highlight ? 'text-green-500' : 'text-primary opacity-80'}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.2 + (i * 0.1) 
                        }}
                      />
                      <span className={`text-sm ${feature.highlight ? 'font-medium' : ''}`}>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <AnimatedBeam>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg h-12 text-base" asChild>
                      <Link href="/sign-up">Claim 20% Discount</Link>
                    </Button>
                  </AnimatedBeam>
                  <p className="text-xs text-center mt-2 text-muted-foreground">Limited time: 100 minutes free on signup</p>
                </div>
              </motion.div>
            </BlurFade>
            
            {/* Scale Plan */}
            <BlurFade direction="left" delay={0.3}>
              <motion.div 
                className="rounded-xl border bg-card shadow-sm p-8 transition-all duration-200"
                onHoverStart={() => setFocusedPlan('scale')}
                onHoverEnd={() => setFocusedPlan(null)}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "rgba(79, 70, 229, 0.4)"
                }}
              >
                <AnimatePresence>
                  {focusedPlan === 'scale' && (
                    <motion.div 
                      className="absolute inset-0 rounded-xl bg-gradient-to-tl from-indigo-50 to-transparent dark:from-indigo-950/10 dark:to-transparent -z-10" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                
                <div className="mb-6 flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">Scale</h3>
                  <div className="flex items-baseline gap-1">
                    <motion.span 
                      className="text-3xl font-bold"
                      key={`price-scale-${isAnnual}`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      ${calculatePrice(99)}
                    </motion.span>
                    <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">For teams and businesses</p>
                </div>
                
                <div className="mt-4 space-y-3">
                  {['300 minutes/month', 'All 15+ languages', '4K max resolution', 'Dedicated support', 'API access', 'Team collaboration'].map((feature, i) => (
                    <motion.div 
                      className="flex items-center gap-2"
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + (i * 0.1) }}
                    >
                      <MotionCheckCircle 
                        className="h-5 w-5 text-primary opacity-80" 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.2 + (i * 0.1) 
                        }}
                      />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button className="w-full" asChild>
                    <Link href="/waitlist">Get Started</Link>
                  </Button>
                </div>
              </motion.div>
            </BlurFade>
          </div>

          <ScrollAnimation variant="fade" delay={0.4}>
            {/* Cost Comparison Table */}
            <div className="mt-20 bg-white dark:bg-zinc-900/50 border rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-50 dark:bg-blue-900/20 py-4 text-center">
                <h3 className="text-xl font-bold">Why Creators Choose Dubbby</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left"></th>
                      <th className="py-4 px-6 text-center">Dubbing Agencies</th>
                      <th className="py-4 px-6 text-center">DIY Methods</th>
                      <th className="py-4 px-6 text-center bg-blue-50 dark:bg-blue-900/20 font-bold">Dubbby</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Cost', agency: '$50–$120/min', diy: 'Hidden costs for tools', dubbby: '$0.63/min', highlight: true },
                      { label: 'Processing Time', agency: '3-14 days', diy: '5+ hours manual work', dubbby: '30 seconds', highlight: false },
                      { label: 'Lip-Sync Quality', agency: 'Variable', diy: 'Poor', dubbby: 'Perfect™', highlight: false },
                      { label: 'Contracts', agency: 'Long-term required', diy: 'None', dubbby: 'Cancel anytime', highlight: false },
                      { label: 'Content Type Focus', agency: 'Corporate videos', diy: 'Any', dubbby: 'Short-form optimized', highlight: false }
                    ].map((row, index) => (
                      <motion.tr 
                        key={row.label} 
                        className="border-b"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.4 }}
                      >
                        <td className="py-4 px-6 font-medium">{row.label}</td>
                        <td className="py-4 px-6 text-center">{row.agency}</td>
                        <td className="py-4 px-6 text-center">{row.diy}</td>
                        <td className={`py-4 px-6 text-center bg-blue-50 dark:bg-blue-900/20 font-bold ${row.highlight ? 'text-green-600' : ''}`}>{row.dubbby}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollAnimation>

          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {['7-day money-back guarantee', 'No credit card required', 'Cancel anytime'].map((text, i) => (
              <motion.div 
                key={text}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.1), duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <BadgeCheck className="h-5 w-5 text-green-600" />
                <span className="text-sm">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 