import { cameraFeeds } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';

export function CameraGrid() {
  return <GlassCard className='p-6'><h2 className='font-semibold mb-4'>Camera Grid</h2><div className='grid sm:grid-cols-2 gap-3'>{cameraFeeds.map(c=><div key={c.id} className='rounded-xl bg-black/30 border border-white/10 p-3'><div className='flex items-center justify-between'><p>{c.name}</p><Badge tone={c.status==='Online'?'success':'danger'}>{c.status}</Badge></div><p className='text-sm text-white/70'>{c.location}</p><p className='text-xs text-white/60 mt-2'>Last motion: {c.lastMotion}</p></div>)}</div></GlassCard>;
}
