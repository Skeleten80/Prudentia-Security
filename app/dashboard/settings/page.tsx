import { Header } from '@/components/layout/header';
import { GlassCard } from '@/components/ui/glass-card';
import { OrgSettingsForm } from '@/components/settings/org-settings-form';
import { MembersList } from '@/components/settings/members-list';
import { getSupabaseConfigStatus } from '@/lib/supabase/client';
import { members, organization } from '@/lib/mock-data';

export default function SettingsPage() {
  const status = getSupabaseConfigStatus();

  return <>
    <Header title='Settings' subtitle='Workspace configuration' />
    <div className='grid md:grid-cols-2 gap-6'>
      <OrgSettingsForm defaultValues={organization} />
      <MembersList members={members} />
    </div>
    <GlassCard className='p-6 text-sm bg-white/5 rounded-lg'>
      Supabase URL configured: {status.hasUrl ? 'Yes' : 'No'}<br />
      Supabase anon key configured: {status.hasAnonKey ? 'Yes' : 'No'}
    </GlassCard>
  </>;
}
