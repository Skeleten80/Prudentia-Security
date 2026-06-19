import { z } from 'zod';

export const organizationSettingsSchema = z.object({
  name: z.string().min(2, 'Organization name is required'),
  industry: z.string().min(2, 'Industry is required'),
  city: z.string().min(2, 'City is required'),
  province: z.string().min(2).default('ON'),
});

export type OrganizationSettingsInput = z.infer<typeof organizationSettingsSchema>;
