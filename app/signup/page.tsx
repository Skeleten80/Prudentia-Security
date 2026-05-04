'use client';

import { useMemo, useState } from 'react';
import { getBrowserSupabaseClient, getSupabaseConfigStatus } from '@/lib/supabase/client';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const next = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('next') ?? '/dashboard' : '/dashboard';

  const config = useMemo(() => getSupabaseConfigStatus(), []);

  const onSignIn = async () => {
    if (!config.isConfigured) {
      setMessage('Supabase not configured. Mock mode enabled; open /dashboard directly.');
      return;
    }

    setIsLoading(true);
    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      setMessage('Supabase client unavailable. Check environment variables.');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}${next}` },
    });

    setMessage(error ? error.message : 'Check your email for the magic sign-in link.');
    setIsLoading(false);
  };

  return <main className='p-8 max-w-xl mx-auto'>
    <h1 className='text-3xl font-bold'>Start Free</h1>
    <p className='text-white/70 mt-2'>Use secure magic-link authentication powered by Supabase.</p>
    {!config.isConfigured ? (
      <p className='mt-4 rounded border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-100'>
        Supabase variables are not set. The app will continue to use mock dashboard data.
      </p>
    ) : null}
    <div className='mt-6 space-y-3'>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='you@example.com'
        className='w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2'
      />
      <button
        onClick={onSignIn}
        disabled={isLoading || !email}
        className='rounded-lg border border-white/20 px-4 py-2 disabled:opacity-60'
      >
        {isLoading ? 'Sending…' : 'Send magic link'}
      </button>
      {message ? <p className='text-sm text-white/80'>{message}</p> : null}
    </div>
  </main>;
}
