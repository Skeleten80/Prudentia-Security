'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { dashboardNav } from '@/lib/mock-data';

export function DashboardShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return <div className='min-h-screen p-6 lg:p-8'>
    <div className='grid gap-6 lg:grid-cols-[240px_1fr]'>
      <aside className='glass p-4 h-fit'>
        <h2 className='text-sm text-white/70 mb-3'>Prudentia Security</h2>
        <nav className='space-y-1'>
          {dashboardNav.map(item => <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname===item.href?'bg-white/20':'hover:bg-white/10'}`}><span>{item.icon}</span>{item.label}</Link>)}
        </nav>
      </aside>
      <main className='space-y-6'>{children}</main>
    </div>
  </div>;
}
