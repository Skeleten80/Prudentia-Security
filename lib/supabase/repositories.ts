export type AlertInsert = {
  organization_id: string;
  device_id?: string | null;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  title: string;
  description?: string;
};

export type AuditLogInsert = {
  organization_id: string;
  user_id?: string;
  action: string;
  target_type?: string;
  target_id?: string;
  metadata?: Record<string, unknown>;
};

/**
 * Thin placeholders for the real Supabase-backed persistence layer. Pages
 * currently render from `lib/mock-data.ts` directly; once a Supabase project
 * is connected, swap these bodies for `getServerSupabaseClient().from(...)`
 * calls without changing the call sites.
 */
export async function insertAlert(alert: AlertInsert) {
  return alert;
}

export async function writeAuditLog(entry: AuditLogInsert) {
  return entry;
}
