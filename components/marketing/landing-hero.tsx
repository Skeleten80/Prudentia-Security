import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';

export function LandingHero() {
  return <GlassCard className='p-8'>
    <p className='text-accent'>Prudentia Shield by Nessalk Industries</p>
    <h1 className='text-4xl font-bold mt-2'>Cybersecurity oversight built for Ontario small businesses.</h1>
    <p className='text-white/75 mt-3'>Track your security score, monitor every device, triage alerts, and get a plain-English AI report every month — all from one dashboard.</p>
    <div className='mt-6 flex gap-3'>
      <Link href='/signup' className='px-4 py-2 rounded-lg bg-accent text-black font-medium'>Start Free</Link>
      <Link href='/dashboard' className='px-4 py-2 rounded-lg bg-white/10'>Preview Dashboard</Link>
    </div>
  </GlassCard>;
}
