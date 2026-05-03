import { IntegrationEvent, SecurityEventInsert } from './types';

export function mapIntegrationEventToSecurityEvent(event: IntegrationEvent): SecurityEventInsert {
  return {
    household_id: event.householdId,
    event_type: event.eventType,
    severity: classifySeverity(event.eventType),
    title: `Integration Event: ${event.provider}`,
    description: `Event ${event.eventType} received from ${event.provider}.`,
    metadata: { provider: event.provider, integrationId: event.integrationId, payload: event.payload },
    occurred_at: event.occurredAt,
  };
}

function classifySeverity(eventType: string): SecurityEventInsert['severity'] {
  if (eventType.includes('offline') || eventType.includes('unknown_device')) return 'High';
  if (eventType.includes('battery_low')) return 'Medium';
  return 'Low';
}
