export type IntegrationProviderId = 'home_assistant' | 'mqtt' | 'onvif' | 'rtsp' | 'webhook';
export type IntegrationStatus = 'connected' | 'needs_attention' | 'not_configured' | 'error';

export type SecureCredentialRef = {
  encryptedValue: string;
  keyVersion: string;
  lastRotatedAt?: string;
};

export interface IntegrationConfigBase {
  householdId: string;
  integrationId: string;
  name: string;
  provider: IntegrationProviderId;
  status: IntegrationStatus;
  configuration: Record<string, unknown>;
  credentials?: Record<string, SecureCredentialRef>;
}

export interface IntegrationEvent {
  householdId: string;
  integrationId: string;
  provider: IntegrationProviderId;
  eventType: string;
  occurredAt: string;
  payload: Record<string, unknown>;
}

export interface SecurityEventInsert {
  household_id: string;
  device_id?: string;
  event_type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  occurred_at: string;
}

export interface IntegrationProvider {
  id: IntegrationProviderId;
  displayName: string;
  description: string;
  supportsCredentialRotation: boolean;
  validateConfig(config: IntegrationConfigBase): Promise<{ valid: boolean; message?: string }>;
  checkStatus(config: IntegrationConfigBase): Promise<IntegrationStatus>;
  ingestEvents?(config: IntegrationConfigBase): AsyncGenerator<IntegrationEvent, void, unknown>;
  discoverDevices?(config: IntegrationConfigBase): Promise<Array<{ name: string; type: string; location?: string }>>;
}
export type IntegrationStatus='connected'|'needs_attention'|'not_configured';export interface IntegrationProvider{name:string;checkStatus:()=>Promise<IntegrationStatus>;}
