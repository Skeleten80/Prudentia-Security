import { Header } from '@/components/layout/header';
import { GlassCard } from '@/components/ui/glass-card';
import { PlanCard } from '@/components/billing/plan-card';
import { hasStripeKeys } from '@/lib/billing/stripe';
import { organization, plans } from '@/lib/mock-data';

export default function BillingPage() {
  return <>
    <Header title='Billing' subtitle='Subscription and plan management' />
    {!hasStripeKeys ? (
      <GlassCard className='p-4 text-sm text-amber-100 border border-amber-400/40 bg-amber-400/10'>
        Stripe keys are not configured. Plan selection redirects to a mock checkout state.
      </GlassCard>
    ) : null}
    <section className='grid md:grid-cols-3 gap-4'>
      {plans.map((plan) => (
        <PlanCard key={plan.name} plan={plan} isCurrent={plan.name.toLowerCase() === organization.plan} />
      ))}
    </section>
  </>;
}
