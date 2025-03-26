'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, TimerIcon, BadgeCheck, Globe, Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TextReveal } from '@/components/magicui/text-reveal';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { useState } from 'react';

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative px-4 sm:px-6 py-16 md:py-24 overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/70 to-purple-50/50 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-purple-950/5">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <motion.div 
          className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-200/20 dark:bg-blue-900/10 blur-3xl"
          animate={{
            x: [0, 15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-200/20 dark:bg-indigo-900/10 blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto relative">
        <div className="mx-auto max-w-4xl text-center">
          <BlurFade direction="up" delay={0.1} blur={5} distance={15} once={true}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 mb-6">
              <DollarSign className="h-3.5 w-3.5" />
              Join 5,000+ creators already growing their global audience
            </span>
          </BlurFade>
          
          <div className="mb-3">
            <TextReveal
              text="Turn Language Barriers"
              className="text-3xl sm:text-4xl font-bold sm:text-5xl max-w-2xl mx-auto inline"
              splitWords
              delay={0.1}
              duration={0.6}
              once={true}
            />
          </div>
          
          <div className="mb-6 sm:mb-8">
            <AnimatedGradientText
              text="Into Opportunities – Grow Your Reach by 2.7X"
              className="text-3xl sm:text-4xl font-bold sm:text-5xl inline-block"
            />
          </div>
          
          <BlurFade direction="up" delay={0.3} blur={5} distance={15} once={true}>
            <p className="mt-4 sm:mt-6 mx-auto max-w-2xl text-muted-foreground text-base sm:text-lg">
              Why limit your content to just one language? The most successful creators are expanding to new markets and seeing their engagement soar. Imagine your content resonating with viewers worldwide in their native languages.
            </p>
          </BlurFade>
          
          <BlurFade direction="up" delay={0.4} blur={5} distance={15} once={true}>
            <motion.div 
              className="mt-6 sm:mt-8 flex justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-full">
                <TimerIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-medium text-sm sm:text-base text-red-600 dark:text-red-400">
                    <span className="animate-pulse">Limited time offer ends in: 1d 23h 59m</span>
                  </p>
                  <p className="text-xs text-red-500/70 dark:text-red-400/70">First 100 minutes free + 20% off all plans</p>
                </div>
              </div>
            </motion.div>
          </BlurFade>
          
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedBeam beamOpacity={0.3} size={200} beamColor="99 102 241">
              <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base group" asChild>
                  <Link href="/sign-up">
                    Start Your Free Trial Now
                    <motion.div
                      animate={{ x: isHovered ? 3 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </AnimatedBeam>
            
            <BlurFade direction="up" delay={0.5} blur={5} distance={15} once={true}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base" asChild>
                  <Link href="#pricing">
                    See Pricing Plans
                  </Link>
                </Button>
              </motion.div>
            </BlurFade>
          </div>
          
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { 
                icon: <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700 dark:text-blue-400" />, 
                title: "80% Cost Savings", 
                description: "Fraction of the cost of traditional dubbing agencies or freelancers."
              },
              { 
                icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700 dark:text-blue-400" />, 
                title: "15+ Languages", 
                description: "Reach 90% of internet users with perfect lip-synced translations."
              },
              { 
                icon: <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700 dark:text-blue-400" />, 
                title: "30-Second Processing", 
                description: "From upload to ready-to-publish in seconds, not weeks."
              }
            ].map((feature, i) => (
              <BlurFade 
                key={feature.title}
                direction={i === 0 ? 'left' : i === 1 ? 'up' : 'right'} 
                delay={0.3 + (i * 0.1)}
                blur={5}
                distance={20}
                once={true}
              >
                <motion.div 
                  className="bg-white dark:bg-zinc-900/70 shadow-sm border rounded-xl p-4 sm:p-6 flex flex-col items-center text-center h-full"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-3 sm:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-medium">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{feature.description}</p>
                </motion.div>
              </BlurFade>
            ))}
          </div>
          
          <motion.div 
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { text: "100% Secure Payment" },
              { text: "GDPR Compliant" },
              { text: "4.9/5 Rating" }
            ].map((item, i) => (
              <motion.div 
                key={item.text}
                className="flex items-center gap-1.5 my-1 md:my-0"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (i * 0.1), duration: 0.3 }}
              >
                <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span>{item.text}</span>
                {i < 2 && <span className="hidden sm:inline text-muted-foreground px-2">|</span>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 