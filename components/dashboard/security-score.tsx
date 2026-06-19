'use client';

import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { GlassCard } from '@/components/ui/glass-card';
import { getRiskLabel } from '@/lib/security/score';
import type { ScoreSnapshot } from '@/lib/mock-data';

const RISK_COLOR: Record<string, string> = {
  Excellent: '#15b86a',
  Good: '#15b86a',
  Fair: '#ffb020',
  Poor: '#f04438',
};

export function SecurityScore({ score, history }: { score: number; history: ScoreSnapshot[] }) {
  const label = getRiskLabel(score);
  const color = RISK_COLOR[label];

  return <GlassCard className='p-6 md:col-span-2'>
    <p className='text-sm text-white/70'>Security Score</p>
    <div className='flex items-end gap-3 mt-1'>
      <p className='text-4xl font-bold'>{score}</p>
      <p className='text-sm font-medium mb-1' style={{ color }}>{label}</p>
    </div>
    <div className='h-12 mt-3'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={history}>
          <Line type='monotone' dataKey='score' stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className='text-xs text-white/50 mt-2'>Based on open alerts across all devices · last 60 days</p>
  </GlassCard>;
}
