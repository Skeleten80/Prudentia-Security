import { SecureCredentialRef } from './types';

export function createEncryptedPlaceholder(label: string): SecureCredentialRef {
  return {
    encryptedValue: `enc::placeholder::${label}`,
    keyVersion: 'v1',
    lastRotatedAt: new Date().toISOString(),
  };
}
