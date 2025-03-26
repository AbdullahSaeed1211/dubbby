'use client';

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { MessageSquare, Globe, Zap, Rocket, Users, RefreshCw } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className="px-4 sm:px-6 py-16" id="features">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Features</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create professional dubbed videos that engage your audience
          </p>
        </div>
        
        <BentoGrid className="mx-auto">
          <BentoGridItem
            title="Perfect Lip Synchronization"
            description="AI technology ensures lips match the dubbed audio perfectly, creating a seamless viewing experience"
            icon={<MessageSquare className="h-6 w-6 text-primary opacity-80" />}
            className="border hover:border-primary/20"
          />
          
          <BentoGridItem
            title="15+ Languages"
            description="Translate your content to over 15 languages, reaching a global audience with natural-sounding voices"
            icon={<Globe className="h-6 w-6 text-primary opacity-80" />}
            className="border hover:border-primary/20"
          />
          
          <BentoGridItem
            title="Fast Processing"
            description="Get your dubbed videos in minutes, not days or weeks, with our high-performance AI engine"
            icon={<Zap className="h-6 w-6 text-primary opacity-80" />}
            className="border hover:border-primary/20"
          />
          
          <BentoGridItem
            title="Simple Upload Process"
            description="Just upload your video, select your target languages, and our AI handles the rest automatically"
            icon={<Rocket className="h-6 w-6 text-primary opacity-80" />}
            className="border hover:border-primary/20"
          />
          
          <BentoGridItem
            title="Voice Customization"
            description="Choose from a variety of voice styles and accents to match your brand and content style"
            icon={<Users className="h-6 w-6 text-primary opacity-80" />}
            className="border hover:border-primary/20"
          />
          
          <BentoGridItem
            title="Batch Processing"
            description="Upload multiple videos at once and process them in batch for maximum efficiency"
            icon={<RefreshCw className="h-6 w-6 text-primary opacity-80" />}
            className="border hover:border-primary/20"
          />
        </BentoGrid>
      </div>
    </section>
  );
} 