'use client';

import { MessageSquare, Globe, Zap, Rocket, Users, RefreshCw, TrendingUp, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

interface BentoFeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
  delay?: number;
}

function BentoFeature({ 
  title, 
  description, 
  icon, 
  className,
  iconClassName,
  delay = 0
}: BentoFeatureProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-background p-6 transition-all hover:shadow-md",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
    >
      <motion.div 
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-muted/50",
          iconClassName
        )}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: delay + 0.1,
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {icon}
      </motion.div>
      <motion.h3 
        className="mt-4 font-semibold text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ 
          duration: 0.5, 
          delay: delay + 0.2,
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="mt-2 text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ 
          duration: 0.5, 
          delay: delay + 0.3,
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="px-4 sm:px-6 py-20" id="features">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation variant="fade">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Your Next Viral Video is Waiting in 15+ Languages</h2>
            <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
              Create viral-ready content for global audiences. Average 2.7X engagement boost for localized content.
            </p>
          </div>
        </ScrollAnimation>
        
        {/* Main grid layout with tailored layout for both desktop and mobile */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* First Row */}
          <div className="md:col-span-6">
            <BentoFeature
              title="Perfect Lip-Sync™"
              description="AI matches dubbed audio to lip movements frame-by-frame for results that look completely natural to viewers. Our advanced technology ensures that the dubbing appears authentic, with precise sync between audio and visual elements."
              icon={<MessageSquare className="h-6 w-6 text-blue-600" />}
              className="h-full border bg-blue-50/50 dark:bg-blue-900/5"
              delay={0.1}
            />
          </div>
          
          <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <BentoFeature
              title="30-Second Processing"
              description="Get dubbed videos in seconds, not days or weeks."
              icon={<Zap className="h-6 w-6 text-amber-500" />}
              className="bg-amber-50/50 dark:bg-amber-900/5"
              delay={0.2}
            />
            
            <BentoFeature
              title="Multiple Voice Styles"
              description="Choose youthful, professional, or energetic styles for your brand."
              icon={<Users className="h-6 w-6 text-purple-600" />}
              className="bg-purple-50/50 dark:bg-purple-900/5"
              delay={0.3}
            />
          </div>
          
          {/* Second Row */}
          <div className="md:col-span-4">
            <BentoFeature
              title="15+ Languages in One Click"
              description="Instantly translate your content to Spanish, Hindi, French, and 12+ more languages with natural-sounding voices. Reach global audiences across Europe, Asia, Latin America, and beyond."
              icon={<Globe className="h-6 w-6 text-green-600" />}
              className="h-full bg-green-50/50 dark:bg-green-900/5"
              delay={0.4}
            />
          </div>
          
          <div className="md:col-span-4">
            <BentoFeature
              title="80% Lower Cost vs Agencies"
              description="Skip the $4,000/month agencies. Our pricing starts at just $0.63/minute."
              icon={<TrendingUp className="h-6 w-6 text-cyan-600" />}
              className="h-full bg-cyan-50/50 dark:bg-cyan-900/5"
              delay={0.5}
            />
          </div>
          
          <div className="md:col-span-4">
            <BentoFeature
              title="Start in 5 Minutes"
              description="Upload, select languages, and our AI handles the rest. No technical skills needed."
              icon={<Rocket className="h-6 w-6 text-indigo-600" />}
              className="h-full bg-indigo-50/50 dark:bg-indigo-900/5"
              delay={0.6}
            />
          </div>
          
          {/* Third Row */}
          <div className="md:col-span-6">
            <BentoFeature
              title="Batch Processing for TikTok"
              description="Dub 10 videos at once for TikTok marathons, saving production time."
              icon={<RefreshCw className="h-6 w-6 text-teal-600" />}
              className="h-full bg-teal-50/50 dark:bg-teal-900/5"
              delay={0.7}
            />
          </div>
          
          <div className="md:col-span-6">
            <ScrollAnimation variant="slide" direction="left" delay={0.3}>
              <div className="rounded-xl border bg-background p-6 h-full">
                <h3 className="font-semibold text-lg">Why Creators Love Dubbby</h3>
                <div className="space-y-3 mt-4">
                  <motion.div 
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-sm text-muted-foreground">Reach global audiences without language barriers</p>
                  </motion.div>
                  <motion.div 
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-sm text-muted-foreground">Create once, publish worldwide in minutes</p>
                  </motion.div>
                  <motion.div 
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-sm text-muted-foreground">Grow audience engagement by 2.7X on average</p>
                  </motion.div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 