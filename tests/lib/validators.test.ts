import { describe, it, expect } from 'vitest';
import { organizationSettingsSchema } from '@/lib/validators';

describe('organization settings schema', () => {
  it('accepts a valid payload', () => {
    const payload = { name: 'Trillium Bookkeeping & Tax Co.', industry: 'Professional Services', city: 'Kitchener', province: 'ON' };
    expect(organizationSettingsSchema.safeParse(payload).success).toBe(true);
  });

  it('rejects a missing organization name', () => {
    const payload = { name: '', industry: 'Professional Services', city: 'Kitchener', province: 'ON' };
    expect(organizationSettingsSchema.safeParse(payload).success).toBe(false);
  });
});
