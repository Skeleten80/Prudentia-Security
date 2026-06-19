import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import type { OrganizationMember } from '@/lib/mock-data';

const ROLE_TONE = { owner: 'success', admin: 'warning', member: 'neutral' } as const;

export function MembersList({ members }: { members: OrganizationMember[] }) {
  return <GlassCard className='p-6'>
    <h3 className='font-semibold mb-4'>Team Members</h3>
    <div className='space-y-2'>
      {members.map((m) => (
        <div key={m.id} className='flex items-center justify-between p-3 rounded-lg bg-white/5'>
          <div>
            <p className='text-sm font-medium'>{m.name}</p>
            <p className='text-xs text-white/60'>{m.email}</p>
          </div>
          <Badge tone={ROLE_TONE[m.role]}>{m.role}</Badge>
        </div>
      ))}
    </div>
  </GlassCard>;
}
