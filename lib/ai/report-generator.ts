import type { AiReport } from '@/lib/mock-data';

export type ReportPeriod = { start: Date; end: Date };

function formatPeriodLabel(period: ReportPeriod): string {
  const fmt = (d: Date) => d.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' });
  return `${fmt(period.start)} – ${fmt(period.end)}`;
}

/**
 * Mock generator for the monthly AI security report. Swap this body for a
 * real LLM call (e.g. via OPENAI_API_KEY) once an AI provider is wired up —
 * the shape returned here is the contract the report pages expect.
 */
export async function generateMonthlySecurityReport(
  organizationName: string,
  period: ReportPeriod
): Promise<Omit<AiReport, 'id'>> {
  return {
    title: `${period.end.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })} Security Report`,
    periodLabel: formatPeriodLabel(period),
    summary: `${organizationName}'s overall security posture was stable this period. No unresolved critical incidents remain open longer than 24 hours, and endpoint coverage continues to improve.`,
    recommendations: [
      'Confirm all staff laptops are on the latest OS security patch',
      'Review mobile device enrollment for full antivirus coverage',
      'Schedule a phishing awareness refresher for new hires',
    ],
    generatedAt: 'Just now',
  };
}
