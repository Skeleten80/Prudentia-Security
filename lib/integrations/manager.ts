import { integrationProviders } from './providers';
import { IntegrationConfigBase, IntegrationEvent } from './types';
import { mapIntegrationEventToSecurityEvent } from './security-event-mapper';
import { insertSecurityEvent, writeAuditLog } from '@/lib/supabase/repositories';

export async function checkIntegrationStatus(config: IntegrationConfigBase) {
  const provider = integrationProviders.find((p) => p.id === config.provider);
  if (!provider) throw new Error('Provider not found');
  return provider.checkStatus(config);
}

export async function processIntegrationEvents(config: IntegrationConfigBase) {
  const provider = integrationProviders.find((p) => p.id === config.provider);
  if (!provider?.ingestEvents) return [] as IntegrationEvent[];

  const processed: IntegrationEvent[] = [];
  for await (const evt of provider.ingestEvents(config)) {
    const securityEvent = mapIntegrationEventToSecurityEvent(evt);
    await insertSecurityEvent(securityEvent);
    processed.push(evt);
  }

  await writeAuditLog({
    household_id: config.householdId,
    action: 'integration_events_processed',
    target_type: 'integration',
    target_id: config.integrationId,
    metadata: { provider: config.provider, processedCount: processed.length },
  });

  return processed;
}
