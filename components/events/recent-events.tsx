import { events } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';

const tone = { Low: 'neutral', Medium: 'warning', High: 'danger' } as const;

export function RecentEvents() {
  return <GlassCard className='p-6'><h2 className='font-semibold mb-4'>Recent Events</h2><div className='space-y-3'>{events.map(e=><div key={e.id} className='p-3 rounded-lg bg-white/5'><div className='flex items-center justify-between'><p className='text-sm'>{e.title} · {e.source}</p><Badge tone={tone[e.severity]}>{e.severity}</Badge></div><p className='text-xs text-white/70'>{e.time} · {e.details}</p></div>)}</div></GlassCard>;
}
