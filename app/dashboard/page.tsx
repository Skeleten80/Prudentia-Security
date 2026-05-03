import { PageShell } from '@/components/layout/page-shell';
import { DashboardOverview } from '@/components/dashboard/overview';

export default function Page(){return <PageShell title='Security Command Center'><DashboardOverview/></PageShell>}
export default function Page(){return <PageShell title='Dashboard'><div className='glass p-4'>Mock UI for Dashboard.</div></PageShell>}
