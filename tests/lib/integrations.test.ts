import { describe, expect, it } from 'vitest';
import { createEncryptedPlaceholder } from '@/lib/integrations/credential-placeholders';
import { mapIntegrationEventToSecurityEvent } from '@/lib/integrations/security-event-mapper';

describe('integration architecture', () => {
  it('creates encrypted credential placeholders', () => {
    const placeholder = createEncryptedPlaceholder('rtsp_password');
    expect(placeholder.encryptedValue.startsWith('enc::placeholder::')).toBe(true);
  });

  it('maps integration events to security events', () => {
    const mapped = mapIntegrationEventToSecurityEvent({
      householdId: 'h1', integrationId: 'i1', provider: 'mqtt', eventType: 'unknown_device_detected', occurredAt: new Date().toISOString(), payload: {}
    });
    expect(mapped.event_type).toBe('unknown_device_detected');
    expect(mapped.severity).toBe('High');
  });
});
