import { Header } from '@/components/layout/header';
import { GlassCard } from '@/components/ui/glass-card';
import { getSupabaseConfigStatus } from '@/lib/supabase/client';

export default function SettingsPage(){const s=getSupabaseConfigStatus();return <><Header title='Settings' subtitle='Workspace configuration (mock + env status)' /><GlassCard className='p-6 text-sm bg-white/5 rounded-lg'>Supabase URL configured: {s.hasUrl ? 'Yes' : 'No'}<br/>Supabase anon key configured: {s.hasAnonKey ? 'Yes' : 'No'}</GlassCard></>}
