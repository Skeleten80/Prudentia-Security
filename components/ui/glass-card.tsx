import { PropsWithChildren } from 'react';

export function GlassCard({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={`glass ${className}`}>{children}</section>;
}
