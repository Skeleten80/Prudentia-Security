import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className='min-h-screen p-6 lg:p-8'><div className='grid gap-6 lg:grid-cols-[240px_1fr]'><Sidebar /><main className='space-y-6'>{children}</main></div></div>;
}
