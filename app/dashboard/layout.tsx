import { Sidebar } from '@/components/layout/sidebar';
import { requireDashboardAuth } from '@/lib/supabase/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const authState = await requireDashboardAuth();

  return (
    <div className='min-h-screen p-6 lg:p-8'>
      {!authState.isSupabaseConfigured ? (
        <div className='mb-4 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm text-amber-100'>
          Supabase environment variables are missing. Dashboard is running in mock mode.
        </div>
      ) : null}
      <div className='grid gap-6 lg:grid-cols-[240px_1fr]'>
        <Sidebar />
        <main className='space-y-6'>{children}</main>
      </div>
    </div>
  );
}
