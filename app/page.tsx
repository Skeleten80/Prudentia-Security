import Link from 'next/link';
import { LandingHero } from '@/components/marketing/landing-hero';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { marketingFeatures, plans } from '@/lib/mock-data';

export default function Page() {
  return <main className='p-8 space-y-8 max-w-7xl mx-auto'>
    <LandingHero />
    <div><Link href='/dashboard'><GlassButton>Open Dashboard</GlassButton></Link></div>
    <section className='grid md:grid-cols-3 gap-4'>{marketingFeatures.map((f) => <GlassCard className='p-4' key={f}>{f}</GlassCard>)}</section>
    <GlassCard className='p-6'><h2 className='text-xl mb-3'>Pricing</h2><div className='grid md:grid-cols-3 gap-3'>{plans.map((p)=><div className='bg-white/5 rounded-xl p-3' key={p.name}><div>{p.name}</div><div className='text-2xl'>{p.price}</div><p className='text-xs text-white/70 mt-1'>{p.description}</p></div>)}</div></GlassCard>
  </main>;
}
