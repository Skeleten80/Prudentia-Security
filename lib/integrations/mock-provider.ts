import { IntegrationConfigBase, IntegrationProvider, IntegrationProviderId, IntegrationStatus } from './types';

export const mockProvider = (id: IntegrationProviderId, status: IntegrationStatus): IntegrationProvider => ({
  id,
  displayName: id,
  description: 'Mock provider',
  supportsCredentialRotation: false,
  validateConfig: async (_config: IntegrationConfigBase) => ({ valid: true }),
  checkStatus: async () => status,
});
