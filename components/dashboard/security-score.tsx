import { GlassCard } from '@/components/ui/glass-card';

export function SecurityScore({ score, mode }: { score: number; mode: string }) {
  return <GlassCard className='p-6'><p className='text-sm text-white/70'>Protection Score</p><p className='text-4xl font-bold mt-1'>{score}%</p><p className='text-sm mt-2'>{mode}</p></GlassCard>;
}
