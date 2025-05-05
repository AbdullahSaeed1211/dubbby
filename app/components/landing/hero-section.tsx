'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle, ArrowRight, Globe, MessageSquareText, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { useState } from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-background to-blue-50/30 dark:from-black dark:via-black/95 dark:to-blue-900/10">
      {/* Limited Time Offer Banner */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 px-4 text-sm font-medium z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse"></span>
          LIMITED TIME OFFER: First 100 minutes free when you sign up today! Offer ends in 1d 23h 59m
        </span>
      </motion.div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-1/3 left-1/3 w-full h-full bg-gradient-to-br from-indigo-100/30 via-blue-100/30 to-purple-100/30 dark:from-indigo-900/10 dark:via-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute -bottom-1/3 right-1/4 w-full h-full bg-gradient-to-br from-purple-100/30 via-indigo-100/30 to-blue-100/30 dark:from-purple-900/10 dark:via-indigo-900/10 dark:to-blue-900/10 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>
      
      <div className="relative">
        <Spotlight
          className="md:hidden pointer-events-none"
          fill="rgba(99, 102, 241, 0.15)"
        />
      </div>
        
      <div className="container relative px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl relative">
          {/* Top-left "Traditional Dubbing" Widget */}
          <motion.div 
            initial={{ x: -100, y: -50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -left-40 top-10 p-3 bg-white dark:bg-zinc-800 shadow-xl rounded-lg z-5 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center shadow-sm">
                <span className="text-red-600 dark:text-red-400 font-bold text-xs">VS</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Traditional Dubbing</div>
                <div className="text-xs text-muted-foreground">
                  <span className="line-through">2-3 weeks</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Bottom-right "Dubbby Speed" Widget */}
          <motion.div 
            initial={{ x: 100, y: 50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -right-8 bottom-20 p-3 bg-white dark:bg-zinc-800 shadow-xl rounded-lg z-5 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center shadow-sm">
                <span className="text-green-600 dark:text-green-400 font-medium">30s</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Dubbby Speed</div>
                <div className="text-xs text-muted-foreground">Ready to publish</div>
              </div>
            </div>
          </motion.div>
          
          {/* Left-center "Agency Quality" Widget */}
          <motion.div 
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-zinc-800 shadow-xl rounded-lg z-5 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                <span className="text-amber-600 dark:text-amber-400 font-bold text-xs">VS</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Agency Quality</div>
                <div className="text-xs text-muted-foreground">
                  <span className="line-through">$1000+ per video</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right-center "Dubbby Price" Widget */}
          <motion.div 
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-zinc-800 shadow-xl rounded-lg z-5 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center shadow-sm">
                <span className="text-teal-600 dark:text-teal-400 font-medium">$</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Dubbby Price</div>
                <div className="text-xs text-muted-foreground">Fraction of the cost</div>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative connecting lines between widgets (desktop only) */}
          <motion.div 
            className="absolute inset-0 hidden md:block z-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="absolute h-[1px] w-[115%] bg-gradient-to-r from-blue-300/30 via-indigo-500/50 to-blue-300/30 dark:from-blue-500/20 dark:via-indigo-400/30 dark:to-blue-500/20 top-0 -left-[5%] -rotate-12 translate-y-8 blur-[2px]"></div>
            <div className="absolute h-[1px] w-[115%] bg-gradient-to-r from-blue-300/30 via-indigo-500/50 to-blue-300/30 dark:from-blue-500/20 dark:via-indigo-400/30 dark:to-blue-500/20 bottom-0 -left-[5%] rotate-12 -translate-y-8 blur-[2px]"></div>
            <div className="absolute w-[1px] h-[115%] bg-gradient-to-b from-purple-300/30 via-indigo-500/40 to-purple-300/30 dark:from-purple-500/20 dark:via-indigo-400/30 dark:to-purple-500/20 left-0 -top-[5%] rotate-12 translate-x-8 blur-[2px]"></div>
            <div className="absolute w-[1px] h-[115%] bg-gradient-to-b from-purple-300/30 via-indigo-500/40 to-purple-300/30 dark:from-purple-500/20 dark:via-indigo-400/30 dark:to-purple-500/20 right-0 -top-[5%] -rotate-12 -translate-x-8 blur-[2px]"></div>
          </motion.div>
          
          {/* Centered Content */}
          <div className="flex flex-col items-center text-center">
            <BlurFade direction="up" delay={0.8} blur={7} distance={20} once={true}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-extrabold tracking-tight mb-6 relative z-20">
                <span className="inline-block">
                  Stop Losing <span className="text-pink-500 dark:text-pink-400">70%</span> of Your Viewers
                </span>
                <span className="block mt-3">
                  Go <span className="text-blue-600 dark:text-blue-400">Global</span>{" "}
                  <AnimatedGradientText className="inline-block">Instantly</AnimatedGradientText> with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    Dubbby
                  </span>
                </span>
              </h1>
            </BlurFade>
            
            <BlurFade direction="up" delay={1.0} blur={5} distance={15} once={true}>
              <p className="text-xl leading-relaxed text-muted-foreground max-w-2xl mb-8">
                Stop losing <span className="font-bold text-pink-500 dark:text-pink-400">70%</span> of your audience. Dubbby translates your short-form videos into 15+ languages with perfect lip-syncing—no agencies, no delays. Creators see an average <span className="font-bold text-green-600 dark:text-green-400">2.7X</span> <span className="font-bold">engagement boost</span>.
              </p>
            </BlurFade>
            
            <BlurFade direction="up" delay={1.2} blur={5} distance={15} once={true}>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <div className="flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/20 shadow-sm px-4 py-2 text-sm font-medium text-blue-800 dark:text-blue-300">
                  <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>15+ Languages</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/20 shadow-sm px-4 py-2 text-sm font-medium text-indigo-800 dark:text-indigo-300">
                  <MessageSquareText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Perfect Lip-Sync</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/20 shadow-sm px-4 py-2 text-sm font-medium text-purple-800 dark:text-purple-300">
                  <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span>30-Second Processing</span>
                </div>
              </div>
            </BlurFade>
            
            <div className="flex flex-col sm:flex-row justify-center w-full sm:w-auto gap-4 mb-4">
              <AnimatedBeam beamOpacity={0.3} size={300} beamColor="99 102 241">
                <motion.div 
                  className="w-full sm:w-auto"
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg h-12 sm:h-14 px-8 text-base group" asChild>
                    <Link href="/waitlist">
                      Claim Free 100 Minutes
                      <motion.div
                        animate={{ x: isHovered ? 3 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              </AnimatedBeam>
              
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 sm:h-14 gap-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/70" asChild>
                <Link href="#how-it-works">
                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                  See How It Works
                </Link>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center mb-10">No credit card required.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 