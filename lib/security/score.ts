import type { Alert, Severity } from '@/lib/mock-data';

const SEVERITY_PENALTY: Record<Severity, number> = {
  critical: 20,
  high: 10,
  medium: 5,
  low: 2,
};

export function computeSecurityScore(alerts: Alert[]): number {
  const penalty = alerts
    .filter((alert) => alert.status !== 'resolved')
    .reduce((total, alert) => total + SEVERITY_PENALTY[alert.severity], 0);

  return Math.max(0, Math.min(100, 100 - penalty));
}

export type RiskLabel = 'Excellent' | 'Good' | 'Fair' | 'Poor';

export function getRiskLabel(score: number): RiskLabel {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Poor';
}
