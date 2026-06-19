import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/state';
import { deviceStatusTone, riskTone } from '@/lib/ui/tone';
import type { Device } from '@/lib/mock-data';

const STATUS_LABEL: Record<Device['status'], string> = {
  protected: 'Protected',
  at_risk: 'At Risk',
  offline: 'Offline',
};

export function DeviceTable({ devices }: { devices: Device[] }) {
  if (devices.length === 0) {
    return <EmptyState title='No devices yet' message='Connect an endpoint agent to start tracking devices.' />;
  }

  return <GlassCard className='p-6 overflow-x-auto'>
    <table className='w-full text-sm'>
      <thead>
        <tr className='text-left text-white/50 text-xs uppercase'>
          <th className='pb-3 pr-4'>Device</th>
          <th className='pb-3 pr-4'>Owner</th>
          <th className='pb-3 pr-4'>OS</th>
          <th className='pb-3 pr-4'>Status</th>
          <th className='pb-3 pr-4'>Risk</th>
          <th className='pb-3'>Last seen</th>
        </tr>
      </thead>
      <tbody className='divide-y divide-white/10'>
        {devices.map((d) => (
          <tr key={d.id}>
            <td className='py-3 pr-4'>
              <p className='font-medium'>{d.name}</p>
              <p className='text-xs text-white/50 capitalize'>{d.type} · {d.ipAddress}</p>
            </td>
            <td className='py-3 pr-4 text-white/70'>{d.owner}</td>
            <td className='py-3 pr-4 text-white/70'>{d.os}</td>
            <td className='py-3 pr-4'><Badge tone={deviceStatusTone[d.status]}>{STATUS_LABEL[d.status]}</Badge></td>
            <td className='py-3 pr-4'><Badge tone={riskTone[d.riskLevel]}>{d.riskLevel}</Badge></td>
            <td className='py-3 text-white/60'>{d.lastSeen}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </GlassCard>;
}
