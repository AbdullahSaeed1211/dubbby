'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface BillingToggleProps {
  onToggle: (isAnnual: boolean) => void;
}

export function BillingToggle({ onToggle }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Label htmlFor="billing-toggle" className="text-sm text-muted-foreground">
        Monthly
      </Label>
      <Switch
        id="billing-toggle"
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-primary"
      />
      <div className="flex items-center gap-2">
        <Label htmlFor="billing-toggle" className="text-sm text-muted-foreground">
          Annual
        </Label>
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          Save 20%
        </span>
      </div>
    </div>
  );
} 