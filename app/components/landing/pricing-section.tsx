'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { BillingToggle } from '@/components/ui/billing-toggle';
import { useState } from 'react';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      return Math.round(monthlyPrice * 12 * 0.8); // 20% discount for annual
    }
    return monthlyPrice;
  };

  return (
    <section id="pricing" className="px-4 sm:px-6 py-16 bg-muted/30">
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Choose the plan that&apos;s right for you and start creating professional dubbed videos today
          </p>

          <BillingToggle onToggle={setIsAnnual} />
          
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Starter Plan */}
            <div className="rounded-xl border bg-card shadow-sm p-8 transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-primary/20">
              <div className="mb-4 flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">${calculatePrice(19)}</span>
                  <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
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
                  <Link href="/sign-up">Start Dubbing Now</Link>
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
                  <span className="text-3xl font-bold">${calculatePrice(49)}</span>
                  <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
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
                  <Link href="/sign-up">Start Dubbing Now</Link>
                </Button>
              </div>
            </div>
            
            {/* Scale Plan */}
            <div className="rounded-xl border bg-card shadow-sm p-8 transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-primary/20">
              <div className="mb-4 flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Scale</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">${calculatePrice(99)}</span>
                  <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
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
                  <Link href="/sign-up">Start Dubbing Now</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="mt-16 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left">Features</th>
                  <th className="py-4 px-6 text-center">Starter</th>
                  <th className="py-4 px-6 text-center">Growth</th>
                  <th className="py-4 px-6 text-center">Scale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-6">Monthly Minutes</td>
                  <td className="py-4 px-6 text-center">30</td>
                  <td className="py-4 px-6 text-center">120</td>
                  <td className="py-4 px-6 text-center">300</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6">Languages</td>
                  <td className="py-4 px-6 text-center">5</td>
                  <td className="py-4 px-6 text-center">All</td>
                  <td className="py-4 px-6 text-center">All</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6">Max Resolution</td>
                  <td className="py-4 px-6 text-center">720p</td>
                  <td className="py-4 px-6 text-center">1080p</td>
                  <td className="py-4 px-6 text-center">4K</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6">Support</td>
                  <td className="py-4 px-6 text-center">Email</td>
                  <td className="py-4 px-6 text-center">Priority</td>
                  <td className="py-4 px-6 text-center">Dedicated</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">API Access</td>
                  <td className="py-4 px-6 text-center">-</td>
                  <td className="py-4 px-6 text-center">-</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
} 