import { Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Globe, MessageSquareText, Zap, CheckCircle, PlayCircle, ChevronRight, Check, X, Rocket, Users, MessageSquare, RefreshCw } from 'lucide-react';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { AvatarCircles } from '@/components/magicui/avatar-circles';

export default function Home() {
  const avatarUsers = [
    { imageUrl: '/avatars/user1.png', profileUrl: '#' },
    { imageUrl: '/avatars/user2.png', profileUrl: '#' },
    { imageUrl: '/avatars/user3.png', profileUrl: '#' },
    { imageUrl: '/avatars/user4.png', profileUrl: '#' },
    { imageUrl: '/avatars/user5.png', profileUrl: '#' },
    { imageUrl: '/avatars/user6.png', profileUrl: '#' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section with Spotlight Effect */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-12 md:py-20">
        <Spotlight
          className="hidden md:block -top-40 left-0 md:left-60"
          fill="hsl(var(--primary) / 0.15)"
        />
        <div className="container relative mx-auto">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Create Multilingual Videos{" "}
              <AnimatedGradientText>in Minutes</AnimatedGradientText>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              It&#39;s like having a professional dubbing studio at your fingertips, but way cheaper
            </p>
            
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm">
                <Globe className="h-4 w-4" />
                <span>15+ Languages</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm">
                <MessageSquareText className="h-4 w-4" />
                <span>Perfect Lip-Sync</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm">
                <Zap className="h-4 w-4" />
                <span>Fast Processing</span>
              </div>
            </div>

            <div className="mt-8 flex flex-row gap-4 items-center">
              <Button size="lg" className="group" asChild>
                <Link href="/sign-up" className="flex items-center gap-2">
                  Get Started Free
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="/sign-up">
                  <PlayCircle className="h-4 w-4" />
                  Try Now
                </Link>
              </Button>
            </div>
            
            <div className="mt-10 flex flex-col items-center">
              <AvatarCircles 
                avatarUrls={avatarUsers} 
                numPeople={99} 
                className="mb-3"
              />
              <p className="text-sm text-muted-foreground">Join thousands of creators already using Dubbby</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-muted/50 px-4 sm:px-6 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Alternatives Are Expensive</h2>
            <p className="mt-4 text-muted-foreground">
              Skip expensive agencies and time-consuming DIY tasks.
              Dubbby makes it easy and affordable to create professional dubbed videos.
            </p>
            
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-destructive/20 bg-card p-6 shadow-sm">
                <div className="mb-2 flex justify-between">
                  <h3 className="font-medium">Dubbing Agencies</h3>
                  <div className="text-destructive">
                    <X className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">$50-120 per minute, monthly contracts starting at $4000</p>
              </div>
              
              <div className="rounded-lg border border-destructive/20 bg-card p-6 shadow-sm">
                <div className="mb-2 flex justify-between">
                  <h3 className="font-medium">Do It Yourself</h3>
                  <div className="text-destructive">
                    <X className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">Hours of work planning, recording, editing, and publishing</p>
              </div>
              
              <div className="rounded-lg border-2 border-primary/30 bg-card p-6 shadow-md relative overflow-hidden">
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs px-2 py-1 rotate-0 font-medium">
                  Recommended
                </div>
                <div className="mb-2 flex justify-between">
                  <h3 className="font-medium">Dubbby</h3>
                  <div className="text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">Instantly create and publish videos with perfect AI dubbing</p>
              </div>
            </div>
            
            <div className="mt-10 flex justify-center">
              <Button size="lg" className="group" asChild>
                <Link href="/sign-up" className="flex items-center gap-2">
                  Get Started Free
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-16" id="features">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Features</h2>
            <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
              Everything you need to create professional dubbed videos that engage your audience
            </p>
          </div>
          
          <BentoGrid className="mx-auto">
            {/* Feature 1 */}
            <BentoGridItem
              title="Perfect Lip Synchronization"
              description="AI technology ensures lips match the dubbed audio perfectly, creating a seamless viewing experience"
              icon={<MessageSquare className="h-6 w-6 text-primary opacity-80" />}
              className="border hover:border-primary/20"
            />
            
            {/* Feature 2 */}
            <BentoGridItem
              title="15+ Languages"
              description="Translate your content to over 15 languages, reaching a global audience with natural-sounding voices"
              icon={<Globe className="h-6 w-6 text-primary opacity-80" />}
              className="border hover:border-primary/20"
            />
            
            {/* Feature 3 */}
            <BentoGridItem
              title="Fast Processing"
              description="Get your dubbed videos in minutes, not days or weeks, with our high-performance AI engine"
              icon={<Zap className="h-6 w-6 text-primary opacity-80" />}
              className="border hover:border-primary/20"
            />
            
            {/* Feature 4 */}
            <BentoGridItem
              title="Simple Upload Process"
              description="Just upload your video, select your target languages, and our AI handles the rest automatically"
              icon={<Rocket className="h-6 w-6 text-primary opacity-80" />}
              className="border hover:border-primary/20"
            />
            
            {/* Feature 5 */}
            <BentoGridItem
              title="Voice Customization"
              description="Choose from a variety of voice styles and accents to match your brand and content style"
              icon={<Users className="h-6 w-6 text-primary opacity-80" />}
              className="border hover:border-primary/20"
            />
            
            {/* Feature 6 */}
            <BentoGridItem
              title="Batch Processing"
              description="Upload multiple videos at once and process them in batch for maximum efficiency"
              icon={<RefreshCw className="h-6 w-6 text-primary opacity-80" />}
              className="border hover:border-primary/20"
            />
          </BentoGrid>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 sm:px-6 py-16 bg-muted/30">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Choose the plan that&apos;s right for you and start creating professional dubbed videos today
            </p>
            
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {/* Starter Plan */}
              <div className="rounded-xl border bg-card shadow-sm p-8 transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-primary/20">
                <div className="mb-4 flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">Starter</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$19</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Perfect for individuals and small creators</p>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">30 minutes/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">5 languages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">720p max resolution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">Email support</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </div>
              </div>
              
              {/* Growth Plan */}
              <div className="rounded-xl border-2 border-primary/20 bg-card shadow-md p-8 scale-105 relative z-10 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <div className="bg-primary/80 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
                
                <div className="mb-4 flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">Growth</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$49</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">For professional content creators</p>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">120 minutes/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">All languages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">1080p max resolution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </div>
              </div>
              
              {/* Scale Plan */}
              <div className="rounded-xl border bg-card shadow-sm p-8 transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-primary/20">
                <div className="mb-4 flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">Scale</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">For teams and businesses</p>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">300 minutes/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">All languages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">4K max resolution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">Dedicated support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary opacity-80" />
                    <span className="text-sm">API access</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Go Global?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Start creating professional dubbed videos today and expand your reach to audiences worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group transition-all duration-200" asChild>
                <Link href="/sign-up" className="flex items-center gap-2">
                  Start Creating Now
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="/sign-up">
                  <PlayCircle className="h-4 w-4" />
                  Try Now
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="flex items-center gap-1 text-primary opacity-80">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-1 text-primary opacity-80">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">14-day free trial</span>
              </div>
              <div className="flex items-center gap-1 text-primary opacity-80">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20 px-4 sm:px-6 py-12">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-medium mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                  <li><Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About us</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tutorials</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <PlayCircle className="h-5 w-5" />
                <span className="font-bold">Dubbby</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Dubbby. All rights reserved.
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
