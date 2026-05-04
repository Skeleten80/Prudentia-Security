import { redirect } from 'next/navigation';
import { getSupabaseConfigStatus } from '@/lib/supabase/client';

export type DashboardAuthState = {
  isSupabaseConfigured: boolean;
  isAuthenticated: boolean;
  mode: 'mock' | 'supabase';
};

export async function requireDashboardAuth(): Promise<DashboardAuthState> {
  const status = getSupabaseConfigStatus();

  if (!status.isConfigured) {
    return {
      isSupabaseConfigured: false,
      isAuthenticated: true,
      mode: 'mock',
    };
  }

  // Placeholder for server-side Supabase auth verification.
  // Until integrated with secure cookie/session exchange, redirect to signup.
  redirect('/signup?next=/dashboard');
}
