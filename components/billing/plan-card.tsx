'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { createCheckoutSession } from '@/lib/billing/stripe';
import type { plans } from '@/lib/mock-data';

type Plan = (typeof plans)[number];

export function PlanCard({ plan, isCurrent }: { plan: Plan; isCurrent: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const onSelect = async () => {
    setIsLoading(true);
    const session = await createCheckoutSession(plan.name);
    window.location.href = session.url;
  };

  return <GlassCard className={`p-5 ${isCurrent ? 'border-accent/60' : ''}`}>
    <div className='flex items-center justify-between'>
      <p className='font-semibold'>{plan.name}</p>
      {isCurrent ? <span className='text-xs text-accent'>Current Plan</span> : null}
    </div>
    <p className='text-2xl font-bold mt-1'>{plan.price}</p>
    <p className='text-xs text-white/60 mt-1'>{plan.description}</p>
    {!isCurrent ? (
      <GlassButton className='mt-4 w-full' onClick={onSelect} disabled={isLoading}>
        {isLoading ? 'Redirecting…' : 'Choose Plan'}
      </GlassButton>
    ) : null}
  </GlassCard>;
}
