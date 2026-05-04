import { Header } from '@/components/layout/header';
import { dashboardSummary } from '@/lib/mock-data';
import { SecurityScore } from '@/components/dashboard/security-score';
import { StatCard } from '@/components/dashboard/stat-card';
import { CameraGrid } from '@/components/cameras/camera-grid';
import { RecentEvents } from '@/components/events/recent-events';

export default function DashboardPage() {
  return <>
    <Header title='Security Dashboard' subtitle='Live property status from mock data' />
    <section className='grid md:grid-cols-5 gap-4'>
      <SecurityScore score={dashboardSummary.score} mode={dashboardSummary.mode} />
      <StatCard label='Cameras Online' value={dashboardSummary.camerasOnline} />
      <StatCard label='Sensors Online' value={dashboardSummary.sensorsOnline} />
      <StatCard label='Active Alerts' value={dashboardSummary.alerts} />
      <StatCard label='Network' value={dashboardSummary.network} />
    </section>
    <section className='grid xl:grid-cols-2 gap-6'><CameraGrid /><RecentEvents /></section>
  </>;
}
