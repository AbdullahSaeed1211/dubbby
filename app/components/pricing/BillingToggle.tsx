'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

interface BillingToggleProps {
  onToggle: (isAnnual: boolean) => void;
}

export function BillingToggle({ onToggle }: BillingToggleProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleToggle = (checked: boolean) => {
    setIsAnnual(checked);
    onToggle(checked);
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <span className="text-sm text-muted-foreground">Monthly</span>
      <Switch 
        id="billing-toggle" 
        checked={isAnnual}
        onCheckedChange={handleToggle}
      />
      <div className="flex items-center gap-2">
        <span className="text-sm">Annual</span>
        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Save 20%</span>
      </div>
    </div>
  );
} 