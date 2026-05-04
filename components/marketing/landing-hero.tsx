import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';

export function LandingHero() {
  return <GlassCard className='p-8'>
    <p className='text-accent'>Prudentia Security by Nessalk Industries</p>
    <h1 className='text-4xl font-bold mt-2'>Intelligent home security, unified in one command center.</h1>
    <p className='text-white/75 mt-3'>Monitor cameras, sensors, locks, alerts, automations, and AI summaries from one premium dashboard.</p>
    <div className='mt-6 flex gap-3'>
      <Link href='/signup' className='px-4 py-2 rounded-lg bg-accent text-black font-medium'>Start Free</Link>
      <Link href='/dashboard' className='px-4 py-2 rounded-lg bg-white/10'>Preview Dashboard</Link>
    </div>
  </GlassCard>;
}
