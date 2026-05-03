import { PageShell } from '@/components/layout/page-shell';
import { EmptyState } from '@/components/ui/state';
export default function Page(){return <PageShell title='Admin Overview'><EmptyState title='Admin Overview module ready' message='This mock-first view is prepared for Supabase-backed data and integration events.'/></PageShell>}
export default function Page(){return <PageShell title='Admin'><div className='glass p-4'>Mock UI for Admin.</div></PageShell>}
