import { GlassButton } from '@/components/ui/glass-button';

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return <header className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
    <div><h1 className='text-2xl font-semibold'>{title}</h1>{subtitle ? <p className='text-white/70 text-sm mt-1'>{subtitle}</p> : null}</div>
    <GlassButton>Export Report</GlassButton>
  </header>;
}
