import { PropsWithChildren } from 'react';

type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger';
const toneClass: Record<BadgeTone, string> = {
  neutral: 'bg-white/10 text-white/80',
  success: 'bg-emerald-500/20 text-emerald-200',
  warning: 'bg-amber-500/20 text-amber-200',
  danger: 'bg-rose-500/20 text-rose-200',
};

export function Badge({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: BadgeTone }>) {
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${toneClass[tone]}`}>{children}</span>;
}
