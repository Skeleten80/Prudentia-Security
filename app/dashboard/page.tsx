import { Header } from '@/components/layout/header';
import { SecurityScore } from '@/components/dashboard/security-score';
import { StatCard } from '@/components/dashboard/stat-card';
import { AlertTable } from '@/components/alerts/alert-table';
import { DeviceTable } from '@/components/devices/device-table';
import { alerts, devices, members, scoreHistory } from '@/lib/mock-data';
import { computeSecurityScore } from '@/lib/security/score';

export default function DashboardPage() {
  const score = computeSecurityScore(alerts);
  const openAlerts = alerts.filter((a) => a.status === 'open');
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical' && a.status !== 'resolved');
  const atRiskDevices = devices.filter((d) => d.status !== 'protected');

  return <>
    <Header title='Security Dashboard' subtitle='Live overview across your organization' />
    <section className='grid md:grid-cols-4 gap-4'>
      <SecurityScore score={score} history={scoreHistory} />
      <StatCard label='Devices Monitored' value={devices.length} />
      <StatCard label='Open Alerts' value={openAlerts.length} />
      <StatCard label='Critical Alerts' value={criticalAlerts.length} />
    </section>
    <section className='grid xl:grid-cols-2 gap-6'>
      <div>
        <h2 className='font-semibold mb-3'>Recent Alerts</h2>
        <AlertTable alerts={alerts} limit={4} />
      </div>
      <div>
        <h2 className='font-semibold mb-3'>Devices Needing Attention</h2>
        <DeviceTable devices={atRiskDevices.length ? atRiskDevices : devices.slice(0, 4)} />
      </div>
    </section>
    <p className='text-xs text-white/40'>{members.length} team members · last updated just now</p>
  </>;
}
