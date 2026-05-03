import { PageShell } from '@/components/layout/page-shell';
import { IntegrationManager } from '@/components/integrations/integration-manager';

export default function IntegrationsPage() {
  return (
    <PageShell title='Integrations'>
      <IntegrationManager />
    </PageShell>
  );
}
