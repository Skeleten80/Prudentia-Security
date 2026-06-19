import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/state';
import { alertStatusTone, severityTone } from '@/lib/ui/tone';
import type { Alert } from '@/lib/mock-data';

export function AlertTable({ alerts, limit }: { alerts: Alert[]; limit?: number }) {
  const rows = limit ? alerts.slice(0, limit) : alerts;

  if (rows.length === 0) {
    return <EmptyState title='No alerts' message='Nothing needs your attention right now.' />;
  }

  return <GlassCard className='p-6'>
    <div className='space-y-3'>
      {rows.map((a) => (
        <div key={a.id} className='p-3 rounded-lg bg-white/5'>
          <div className='flex items-center justify-between gap-3'>
            <p className='text-sm font-medium'>{a.title}</p>
            <div className='flex items-center gap-2 shrink-0'>
              <Badge tone={severityTone[a.severity]}>{a.severity}</Badge>
              <Badge tone={alertStatusTone[a.status]}>{a.status}</Badge>
            </div>
          </div>
          <p className='text-xs text-white/60 mt-1'>{a.category}{a.deviceName ? ` · ${a.deviceName}` : ''} · {a.occurredAt}</p>
          <p className='text-xs text-white/70 mt-2'>{a.description}</p>
        </div>
      ))}
    </div>
  </GlassCard>;
}
