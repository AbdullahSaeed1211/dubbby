'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Clock, DollarSign, Star, Zap, MessageSquare, Layers, X, ShieldCheck } from 'lucide-react';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { BlurFade } from '@/components/magicui/blur-fade';
import { motion } from 'framer-motion';

export function ComparisonSection() {
  return (
    <section className="bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-background/90 dark:via-blue-950/5 dark:to-background/90 px-4 sm:px-6 py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <BlurFade direction="up">
              <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 mb-4">
                The Dubbby Advantage
              </span>
              <h2 className="text-4xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  3X Cheaper
                </span> Than Alternatives
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Why waste time and money on outdated solutions? Dubbby makes it fast, affordable, and stress-free to reach global audiences.
              </p>
            </BlurFade>
          </div>
          
          {/* Comparison Cards - Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-14">
            {/* Traditional Dubbing Card */}
            <BlurFade className="md:col-span-6" direction="right" delay={0.1}>
              <div className="rounded-xl border border-muted-foreground/10 bg-card p-6 shadow-sm dark:bg-zinc-900/60 backdrop-blur-sm relative overflow-hidden h-full">
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-red-100/50 dark:bg-red-950/20 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center shadow-sm">
                      <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold">Traditional Dubbing</h3>
                  </div>
                  <div className="h-7 w-7 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center">
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                
                <div className="grid gap-4 mb-2">
                  <div className="flex items-center justify-between border-b border-muted-foreground/10 pb-3">
                    <div className="font-semibold text-muted-foreground">Speed</div>
                    <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">2-3 Weeks</span>
                </div>
              </div>
                  <div className="flex items-center justify-between border-b border-muted-foreground/10 pb-3">
                    <div className="font-semibold text-muted-foreground">Quality</div>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Star className="h-4 w-4" />
                      <span className="font-medium">Agency Grade</span>
                </div>
                </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-muted-foreground">Cost</div>
                    <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">$1000+ per video</span>
                </div>
              </div>
            </div>
            
                <p className="mt-5 text-sm text-muted-foreground border-t border-muted-foreground/10 pt-4">
                  Long-term contracts required with rigid terms and limited flexibility. Projects often delayed by weeks.
                </p>
              </div>
            </BlurFade>
            
            {/* DIY Solutions Card */}
            <BlurFade className="md:col-span-6" direction="left" delay={0.2}>
              <div className="rounded-xl border border-muted-foreground/10 bg-card p-6 shadow-sm dark:bg-zinc-900/60 backdrop-blur-sm relative overflow-hidden h-full">
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-amber-100/50 dark:bg-amber-950/20 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center shadow-sm">
                      <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold">DIY Solutions</h3>
                  </div>
                  <div className="h-7 w-7 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                    <X className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                </div>
                
                <div className="grid gap-4 mb-2">
                  <div className="flex items-center justify-between border-b border-muted-foreground/10 pb-3">
                    <div className="font-semibold text-muted-foreground">Speed</div>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">5+ Hours Manual Work</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-muted-foreground/10 pb-3">
                    <div className="font-semibold text-muted-foreground">Quality</div>
                    <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
                      <Star className="h-4 w-4" />
                      <span className="font-medium">Unprofessional</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-muted-foreground">Cost</div>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">Hidden Costs</span>
                </div>
              </div>
            </div>
            
                <p className="mt-5 text-sm text-muted-foreground border-t border-muted-foreground/10 pt-4">
                  Takes valuable time away from creating and requires multiple tools, voice actors, and editing software.
                </p>
              </div>
            </BlurFade>
            
            {/* Dubbby Card */}
            <BlurFade className="md:col-span-12" direction="up" delay={0.3}>
              <div className="rounded-xl border-2 border-primary/30 bg-card p-6 shadow-xl dark:bg-zinc-900/70 backdrop-blur-md relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-xs px-4 py-1.5 font-medium">
                  BEST VALUE
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/3">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center shadow-sm">
                          <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Dubbby</h3>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    
                    <div className="grid gap-4 mb-2">
                      <div className="flex items-center justify-between border-b border-muted-foreground/10 pb-3">
                        <div className="font-semibold text-muted-foreground">Speed</div>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <Zap className="h-4 w-4" />
                          <span className="font-bold">30 Seconds</span>
                </div>
              </div>
                      <div className="flex items-center justify-between border-b border-muted-foreground/10 pb-3">
                        <div className="font-semibold text-muted-foreground">Quality</div>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <Check className="h-4 w-4" />
                          <span className="font-bold">Perfect™</span>
                </div>
                </div>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-muted-foreground">Cost</div>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-bold">$0.63/minute</span>
                </div>
              </div>
            </div>
          </div>
          
                  <div className="md:w-2/3 md:border-l border-muted-foreground/10 md:pl-6 flex flex-col">
                    <h4 className="font-semibold text-lg mb-4">Why Creators Choose Dubbby</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <MessageSquare className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm"><span className="font-medium">Perfect Lip-Sync™</span> that matches audio to movements frame-by-frame</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Zap className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm"><span className="font-medium">30-Second Processing</span> versus weeks of waiting</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <DollarSign className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm"><span className="font-medium">80% Lower Cost</span> than traditional dubbing agencies</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Layers className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm"><span className="font-medium">Batch Processing</span> for TikTok and short-form content</span>
                      </motion.div>
                    </div>
                    
                    <div className="mt-auto">
                      <AnimatedBeam beamOpacity={0.15} size={250} beamColor="79 70 229">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <Button size="lg" className="w-full md:w-auto gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg h-12 text-base px-8" asChild>
                            <Link href="/sign-up">
                              Claim Free 100 Minutes
                              <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
                        </motion.div>
                      </AnimatedBeam>
                      <p className="mt-2 text-center text-xs text-muted-foreground">
                        7-day money-back guarantee — No credit card required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
          
          {/* Dubbby CTA */}
          <div className="text-center">
            <BlurFade direction="up" delay={0.8}>
              <h3 className="text-2xl font-bold mb-5">
                Join the Global Content Revolution
              </h3>
              
              <div className="flex justify-center">
                <AnimatedBeam beamOpacity={0.15} size={200} beamColor="79 70 229">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg h-12 text-base px-8" asChild>
                      <Link href="/sign-up">
                        Claim Free 100 Minutes
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </AnimatedBeam>
              </div>
              
              <motion.p 
                className="mt-3 text-center text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                7-day money-back guarantee — zero risk. No credit card required.
              </motion.p>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
} 