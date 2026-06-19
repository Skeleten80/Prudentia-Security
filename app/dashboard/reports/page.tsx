import { Header } from '@/components/layout/header';
import { ReportList } from '@/components/reports/report-list';
import { aiReports } from '@/lib/mock-data';

export default function ReportsPage() {
  return <>
    <Header title='AI Security Reports' subtitle='Monthly, plain-English summaries of your security posture' />
    <ReportList initialReports={aiReports} />
  </>;
}
