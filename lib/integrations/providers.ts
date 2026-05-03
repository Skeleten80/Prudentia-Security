import { IntegrationConfigBase, IntegrationEvent, IntegrationProvider } from './types';

const now = () => new Date().toISOString();

async function* mockEventStream(config: IntegrationConfigBase, eventType: string): AsyncGenerator<IntegrationEvent> {
  yield {
    householdId: config.householdId,
    integrationId: config.integrationId,
    provider: config.provider,
    eventType,
    occurredAt: now(),
    payload: { source: config.name, mock: true },
  };
}

export const homeAssistantProvider: IntegrationProvider = {
  id: 'home_assistant',
  displayName: 'Home Assistant REST API',
  description: 'Pulls automation and device events from Home Assistant.',
  supportsCredentialRotation: true,
  async validateConfig(config) { return { valid: Boolean(config.configuration.baseUrl) }; },
  async checkStatus(config) { return config.configuration.baseUrl ? 'connected' : 'not_configured'; },
  ingestEvents: async function* (config) { yield* mockEventStream(config, 'automation_triggered'); },
};

export const mqttProvider: IntegrationProvider = {
  id: 'mqtt',
  displayName: 'MQTT Event Ingestion',
  description: 'Consumes telemetry events from MQTT topics.',
  supportsCredentialRotation: true,
  async validateConfig(config) { return { valid: Boolean(config.configuration.brokerHost) }; },
  async checkStatus(config) { return config.configuration.brokerHost ? 'needs_attention' : 'not_configured'; },
  ingestEvents: async function* (config) { yield* mockEventStream(config, 'unknown_device_detected'); },
};

export const onvifProvider: IntegrationProvider = {
  id: 'onvif',
  displayName: 'ONVIF Discovery',
  description: 'Discovers compatible camera endpoints (placeholder only).',
  supportsCredentialRotation: true,
  async validateConfig() { return { valid: true }; },
  async checkStatus() { return 'not_configured'; },
  async discoverDevices() { return [{ name: 'Discovered Camera Placeholder', type: 'Camera', location: 'Unknown' }]; },
};

export const rtspProvider: IntegrationProvider = {
  id: 'rtsp',
  displayName: 'RTSP Stream Registration',
  description: 'Registers stream metadata only; no live streaming implemented.',
  supportsCredentialRotation: true,
  async validateConfig(config) { return { valid: Boolean(config.configuration.streamName) }; },
  async checkStatus(config) { return config.configuration.streamName ? 'connected' : 'not_configured'; },
};

export const webhookProvider: IntegrationProvider = {
  id: 'webhook',
  displayName: 'Webhook Event Ingestion',
  description: 'Receives signed webhook events and maps them to security events.',
  supportsCredentialRotation: false,
  async validateConfig(config) { return { valid: Boolean(config.configuration.signingSecretRef) }; },
  async checkStatus(config) { return config.configuration.signingSecretRef ? 'connected' : 'not_configured'; },
  ingestEvents: async function* (config) { yield* mockEventStream(config, 'motion_detected'); },
};

export const integrationProviders: IntegrationProvider[] = [homeAssistantProvider, mqttProvider, onvifProvider, rtspProvider, webhookProvider];
