import { Header } from '@/components/layout/header';
import { AlertTable } from '@/components/alerts/alert-table';
import { alerts } from '@/lib/mock-data';

export default function AlertsPage() {
  const openCount = alerts.filter((a) => a.status !== 'resolved').length;
  return <>
    <Header title='Alerts' subtitle={`${openCount} alerts need review`} />
    <AlertTable alerts={alerts} />
  </>;
}
