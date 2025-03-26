'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from '@/components/icons/quote-icon';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TextReveal } from '@/components/magicui/text-reveal';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Testimonial {
  quote: string;
  author: {
    name: string;
    role: string;
    platform: string;
    followers: string;
    growth: string;
    avatar: string;
  };
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "I gained 12,000 Italian and Spanish followers in a month. My audience doubled and my brand deals now pay 3x more for multilingual promotion.",
      author: {
        name: "Sarah Johnson",
        role: "Lifestyle Creator",
        platform: "Instagram • YouTube",
        followers: "425K+",
        growth: "+52%",
        avatar: "/images/testimonials/sarah.jpg",
      },
    },
    {
      quote: "My gaming videos were stuck at 50K views max. After using Dubbby for Portuguese and Russian translations, I'm averaging 180K per video. Incredible.",
      author: {
        name: "Alex Rodriguez",
        role: "Gaming Creator",
        platform: "YouTube • Twitch",
        followers: "820K+",
        growth: "+75%",
        avatar: "/images/testimonials/alex.jpg",
      },
    },
    {
      quote: "Adding French, Spanish and Hindi versions of my financial tips tripled my passive income from ad revenue. The lip-sync quality is mind-blowing.",
      author: {
        name: "Priya Sharma",
        role: "Finance Creator",
        platform: "TikTok • YouTube",
        followers: "1.2M+",
        growth: "+127%",
        avatar: "/images/testimonials/priya.jpg",
      },
    },
    {
      quote: "As a travel vlogger, Dubbby changed everything. I can now reach people in their native language in every country I visit. Global audience, global income.",
      author: {
        name: "Marcus Chen",
        role: "Travel Creator",
        platform: "YouTube • Instagram",
        followers: "735K+",
        growth: "+93%",
        avatar: "/images/testimonials/marcus.jpg",
      },
    },
    {
      quote: "I thought only huge creators could go multilingual. Dubbby made it possible for me to reach French and German fans. My engagement jumped 4x.",
      author: {
        name: "Emma Wilson",
        role: "Beauty Creator",
        platform: "TikTok • Instagram",
        followers: "340K+",
        growth: "+65%",
        avatar: "/images/testimonials/emma.jpg",
      },
    },
    {
      quote: "My cooking channel now reaches audiences in 7 languages. Ad revenue is up 215% and I'm getting sponsorship offers from global brands weekly.",
      author: {
        name: "Carlos Mendez",
        role: "Culinary Creator",
        platform: "YouTube • TikTok",
        followers: "950K+",
        growth: "+108%",
        avatar: "/images/testimonials/carlos.jpg",
      },
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-100 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        <div className="mx-auto text-center max-w-3xl mb-12 md:mb-16">
          <BlurFade direction="up" delay={0.05} blur={5} distance={20} once={true}>
            <div className="relative mb-2 inline-block">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-100 dark:bg-slate-900 px-2 text-muted-foreground">Testimonials</span>
              </div>
            </div>
          </BlurFade>

          <BlurFade direction="up" delay={0.1} blur={5} distance={20} once={true}>
            <TextReveal
              text="Creators who transformed their reach"
              className="text-3xl md:text-4xl font-bold mb-6"
              splitWords
              delay={0.2}
              duration={0.6}
              once={true}
            />
          </BlurFade>
          
          <BlurFade direction="up" delay={0.3} blur={5} distance={15} once={true}>
            <p className="text-lg text-muted-foreground dark:text-muted-foreground">
              Join thousands of content creators who have multiplied their audience,
              engagement, and revenue with our AI dubbing technology.
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <BlurFade 
              key={testimonial.author.name}
              direction={
                index % 3 === 0 ? 'left' : 
                index % 3 === 1 ? 'up' : 'right'
              }
              delay={0.1 + (index * 0.1)}
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
                <Card className="h-full border-slate-200 dark:border-slate-800 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start mb-4">
                      <div className="mr-3 sm:mr-4 flex-shrink-0">
                        <QuoteIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                      </div>
                      <p className="text-base sm:text-lg leading-relaxed">{testimonial.quote}</p>
                    </div>
                    <div className="flex items-center pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4">
                        <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                        <AvatarFallback>{testimonial.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{testimonial.author.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.author.role}</div>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">{testimonial.author.platform}</span>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                            {testimonial.author.growth}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </BlurFade>
          ))}
        </div>
        
        <BlurFade direction="up" delay={0.6} blur={5} distance={15} once={true}>
          <div className="mt-12 sm:mt-16 text-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-block"
            >
              <Link 
                href="#pricing" 
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Read more success stories from our 5,000+ creators →
              </Link>
            </motion.div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
} 