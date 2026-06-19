'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { organizationSettingsSchema, type OrganizationSettingsInput } from '@/lib/validators';

export function OrgSettingsForm({ defaultValues }: { defaultValues: OrganizationSettingsInput }) {
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationSettingsInput>({
    resolver: zodResolver(organizationSettingsSchema),
    defaultValues,
  });

  const onSubmit = async () => {
    // No backend wired yet — once Supabase is connected, persist via
    // an organizations update call here.
    await new Promise((r) => setTimeout(r, 300));
    setSaved(true);
  };

  return <GlassCard className='p-6'>
    <h3 className='font-semibold mb-4'>Organization Profile</h3>
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 max-w-md'>
      <div>
        <label className='text-xs text-white/60'>Organization name</label>
        <input className='mt-1 w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-sm' {...register('name')} />
        {errors.name ? <p className='text-xs text-bad mt-1'>{errors.name.message}</p> : null}
      </div>
      <div>
        <label className='text-xs text-white/60'>Industry</label>
        <input className='mt-1 w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-sm' {...register('industry')} />
        {errors.industry ? <p className='text-xs text-bad mt-1'>{errors.industry.message}</p> : null}
      </div>
      <div className='flex gap-3'>
        <div className='flex-1'>
          <label className='text-xs text-white/60'>City</label>
          <input className='mt-1 w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-sm' {...register('city')} />
          {errors.city ? <p className='text-xs text-bad mt-1'>{errors.city.message}</p> : null}
        </div>
        <div className='w-24'>
          <label className='text-xs text-white/60'>Province</label>
          <input className='mt-1 w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-sm' {...register('province')} />
        </div>
      </div>
      <div className='flex items-center gap-3 pt-1'>
        <GlassButton type='submit' disabled={isSubmitting}>{isSubmitting ? 'Saving…' : 'Save Changes'}</GlassButton>
        {saved ? <p className='text-xs text-good'>Saved</p> : null}
      </div>
    </form>
  </GlassCard>;
}
