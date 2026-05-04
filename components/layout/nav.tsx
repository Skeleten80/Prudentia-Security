import Link from 'next/link';

const links = [
  ['/dashboard', 'Dashboard'],
  ['/dashboard/events', 'Events'],
  ['/dashboard/devices', 'Devices'],
  ['/dashboard/automations', 'Automations'],
  ['/dashboard/assistant', 'AI'],
  ['/dashboard/billing', 'Billing'],
  ['/dashboard/settings', 'Settings'],
] as const;

export function Nav() {
  return <nav className='glass p-3 flex flex-wrap gap-2'>{links.map(([href, label]) => <Link className='px-3 py-1 rounded bg-white/5 hover:bg-accent/30' key={href} href={href}>{label}</Link>)}</nav>;
}
