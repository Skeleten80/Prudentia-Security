import { Header } from '@/components/layout/header';
import { GlassCard } from '@/components/ui/glass-card';
import { getStripePlaceholderSession } from '@/lib/stripe/placeholders';

export default function BillingPage(){const session=getStripePlaceholderSession();return <><Header title='Billing' subtitle='Subscription and invoices (mock)' /><GlassCard className='p-6'><pre className='text-xs bg-black/30 rounded-lg p-3 overflow-auto'>{JSON.stringify(session,null,2)}</pre></GlassCard></>}
