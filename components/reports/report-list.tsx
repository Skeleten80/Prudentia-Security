'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { generateMonthlySecurityReport } from '@/lib/ai/report-generator';
import { organization, type AiReport } from '@/lib/mock-data';

export function ReportList({ initialReports }: { initialReports: AiReport[] }) {
  const [reports, setReports] = useState(initialReports);
  const [isGenerating, setIsGenerating] = useState(false);

  const onGenerate = async () => {
    setIsGenerating(true);
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const report = await generateMonthlySecurityReport(organization.name, { start, end: now });
    setReports((prev) => [{ id: `r-${Date.now()}`, ...report }, ...prev]);
    setIsGenerating(false);
  };

  return <div className='space-y-4'>
    <div className='flex items-center justify-between'>
      <p className='text-sm text-white/70'>AI-generated reports summarize alerts and device health into plain-English guidance, once per month.</p>
      <GlassButton onClick={onGenerate} disabled={isGenerating}>
        {isGenerating ? 'Generating…' : 'Generate Report'}
      </GlassButton>
    </div>
    <div className='space-y-4'>
      {reports.map((r) => (
        <GlassCard className='p-6' key={r.id}>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold'>{r.title}</h3>
            <p className='text-xs text-white/50'>{r.generatedAt}</p>
          </div>
          <p className='text-xs text-white/50 mt-1'>{r.periodLabel}</p>
          <p className='text-sm text-white/80 mt-3'>{r.summary}</p>
          <ul className='mt-3 space-y-1'>
            {r.recommendations.map((rec) => (
              <li key={rec} className='text-sm text-white/70 flex gap-2'><span className='text-accent'>•</span>{rec}</li>
            ))}
          </ul>
        </GlassCard>
      ))}
    </div>
  </div>;
}
