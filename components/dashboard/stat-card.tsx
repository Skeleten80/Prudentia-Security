import { GlassCard } from '@/components/ui/glass-card';

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return <GlassCard className='p-4'><p className='text-xs text-white/70'>{label}</p><p className='text-lg font-semibold mt-1'>{value}</p></GlassCard>;
}
