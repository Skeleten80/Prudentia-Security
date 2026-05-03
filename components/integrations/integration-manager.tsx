import { integrationProviders } from '@/lib/integrations/providers';
import { Card } from '@/components/ui/card';

const mockStatuses: Record<string, string> = {
  home_assistant: 'connected',
  mqtt: 'needs_attention',
  onvif: 'not_configured',
  rtsp: 'not_configured',
  webhook: 'connected',
};

export function IntegrationManager() {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {integrationProviders.map((provider) => (
        <Card key={provider.id} title={provider.displayName} sub={provider.description}>
          <div className='space-y-2 text-sm'>
            <p>Status: <span className='font-medium'>{mockStatuses[provider.id]}</span></p>
            <p>Credential Handling: encrypted placeholder references only.</p>
            <div className='flex gap-2'>
              <button className='rounded bg-accent/20 px-3 py-1 hover:bg-accent/30'>Connect</button>
              <button className='rounded bg-white/10 px-3 py-1 hover:bg-white/20'>Check Status</button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
