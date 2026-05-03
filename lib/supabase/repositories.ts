import { SecurityEventInsert } from '@/lib/integrations/types';

export async function insertSecurityEvent(event: SecurityEventInsert) {
  // Placeholder for Supabase insert. Keep safe for local mock mode.
  return event;
}

export async function writeAuditLog(input: {
  household_id: string;
  action: string;
  target_type: string;
  target_id: string;
  metadata: Record<string, unknown>;
}) {
  return input;
}
