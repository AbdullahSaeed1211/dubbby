'use client';

import { GradientCard } from '@/components/magicui/gradient-card';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TextReveal } from '@/components/magicui/text-reveal';
import { motion } from 'framer-motion';
import { 
  Globe, 
  FileCheck,
  Speaker, 
  Zap, 
  Youtube, 
  Layers, 
  ShieldCheck, 
  Megaphone,
  Share2
} from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      title: "15+ Languages",
      description: "Instantly translate your videos into 15+ languages, reaching 90% of global internet users with one click.",
      icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-blue-500 to-indigo-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      delay: 0.1
    },
    {
      title: "Perfect Lip-Sync",
      description: "Our AI matches mouth movements precisely to translated speech for a natural, authentic look.",
      icon: <Speaker className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-indigo-500 to-purple-500",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
      delay: 0.2
    },
    {
      title: "30-Second Processing",
      description: "No waiting. Get your dubbed videos within 30 seconds, ready to publish across all platforms.",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-100 dark:bg-purple-900/40",
      delay: 0.3
    },
    {
      title: "Natural Voice Quality",
      description: "AI voices sound indistinguishable from human speech with emotional tone preserved.",
      icon: <Megaphone className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-pink-500 to-red-500",
      iconBg: "bg-pink-100 dark:bg-pink-900/40",
      delay: 0.4
    },
    {
      title: "Platform Integration",
      description: "One-click publishing to YouTube, TikTok, Instagram, and more with our direct integrations.",
      icon: <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-red-500 to-orange-500",
      iconBg: "bg-red-100 dark:bg-red-900/40",
      delay: 0.5
    },
    {
      title: "Automatic Subtitles",
      description: "Generate and embed accurate subtitles in any language to maximize audience accessibility.",
      icon: <FileCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-orange-500 to-amber-500",
      iconBg: "bg-orange-100 dark:bg-orange-900/40",
      delay: 0.6
    },
    {
      title: "AI Content Library",
      description: "Store and manage all your original and translated videos in our cloud dashboard.",
      icon: <Layers className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-amber-500 to-yellow-500",
      iconBg: "bg-amber-100 dark:bg-amber-900/40",
      delay: 0.7
    },
    {
      title: "Content Protection",
      description: "Enterprise-grade security ensures your videos remain private and protected at all times.",
      icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-yellow-500 to-lime-500",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/40",
      delay: 0.8
    },
    {
      title: "Cross-Platform Sharing",
      description: "Schedule and distribute your translated videos across multiple platforms simultaneously.",
      icon: <Share2 className="h-5 w-5 sm:h-6 sm:w-6" />,
      gradient: "from-lime-500 to-green-500",
      iconBg: "bg-lime-100 dark:bg-lime-900/40",
      delay: 0.9
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container px-4 mx-auto">
        <div className="mx-auto text-center max-w-3xl mb-12 md:mb-16">
          <div className="relative mb-2 inline-block">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-50 dark:bg-zinc-950 px-2 text-muted-foreground">Key Features</span>
            </div>
          </div>

          <BlurFade direction="up" delay={0.1} blur={5} distance={20} once={true}>
            <TextReveal
              text="Everything you need to reach a global audience"
              className="text-3xl md:text-4xl font-bold mb-6"
              splitWords
              delay={0.2}
              duration={0.6}
              once={true}
            />
          </BlurFade>
          
          <BlurFade direction="up" delay={0.3} blur={5} distance={15} once={true}>
            <p className="text-lg text-muted-foreground dark:text-zinc-400">
              Our platform provides all the tools content creators need to break language barriers, 
              expand their audience, and grow their revenue without any extra work.
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <BlurFade 
              key={feature.title}
              direction={
                index % 3 === 0 ? 'left' : 
                index % 3 === 1 ? 'up' : 'right'
              }
              delay={feature.delay}
              blur={5}
              distance={20}
              margin="50px"
              once={true}
            >
              <motion.div
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <GradientCard
                  gradientClassName={`bg-gradient-to-br ${feature.gradient}`}
                  className="h-full p-4 sm:p-6 md:p-8"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-5 rounded-full ${feature.iconBg} flex items-center justify-center text-foreground`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </GradientCard>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
} 