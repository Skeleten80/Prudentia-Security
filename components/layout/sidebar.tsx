'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNav } from '@/lib/mock-data';
import { AppIcon } from '@/components/icons/app-icon';

export function Sidebar() {
  const pathname = usePathname();
  return <aside className='glass p-4 h-fit'>
    <div className='flex items-center gap-3 mb-4'><AppIcon /><div><p className='font-semibold'>Prudentia</p><p className='text-xs text-white/70'>Shield</p></div></div>
    <nav className='space-y-1'>
      {dashboardNav.map((item) => <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname===item.href?'bg-white/20':'hover:bg-white/10'}`}>{item.label}</Link>)}
    </nav>
  </aside>;
}
