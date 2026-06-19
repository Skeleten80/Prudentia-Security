import { PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex rounded-full px-2 py-0.5 text-xs', {
  variants: {
    tone: {
      neutral: 'bg-white/10 text-white/80',
      success: 'bg-good/20 text-good',
      warning: 'bg-warn/20 text-warn',
      danger: 'bg-bad/20 text-bad',
      critical: 'bg-bad text-white',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

type BadgeProps = PropsWithChildren<VariantProps<typeof badgeVariants> & { className?: string }>;

export function Badge({ children, tone, className }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)}>{children}</span>;
}
