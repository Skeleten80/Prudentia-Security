import { IntegrationConfigBase, IntegrationProvider, IntegrationProviderId, IntegrationStatus } from './types';

export const mockProvider = (
  id: IntegrationProviderId,
  status: IntegrationStatus
): IntegrationProvider => ({
  id,
  displayName: `${id} mock provider`,
  description: `Mock provider for ${id} integration testing.`,
  supportsCredentialRotation: false,
  validateConfig: async (_config: IntegrationConfigBase) => ({ valid: true }),
  checkStatus: async (_config: IntegrationConfigBase) => status,
});
