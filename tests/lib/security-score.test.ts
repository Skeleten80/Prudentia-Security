import { describe, it, expect } from 'vitest';
import { computeSecurityScore, getRiskLabel } from '@/lib/security/score';
import type { Alert } from '@/lib/mock-data';

const baseAlert: Omit<Alert, 'id' | 'severity' | 'status'> = {
  title: 'Test alert',
  description: 'Test',
  category: 'Test',
  occurredAt: 'now',
};

describe('computeSecurityScore', () => {
  it('returns 100 when there are no unresolved alerts', () => {
    const alerts: Alert[] = [{ ...baseAlert, id: 'a1', severity: 'critical', status: 'resolved' }];
    expect(computeSecurityScore(alerts)).toBe(100);
  });

  it('deducts more for higher severity alerts', () => {
    const alerts: Alert[] = [{ ...baseAlert, id: 'a1', severity: 'critical', status: 'open' }];
    expect(computeSecurityScore(alerts)).toBe(80);
  });

  it('never drops below zero', () => {
    const alerts: Alert[] = Array.from({ length: 10 }, (_, i) => ({
      ...baseAlert,
      id: `a${i}`,
      severity: 'critical' as const,
      status: 'open' as const,
    }));
    expect(computeSecurityScore(alerts)).toBe(0);
  });
});

describe('getRiskLabel', () => {
  it('maps score ranges to labels', () => {
    expect(getRiskLabel(95)).toBe('Excellent');
    expect(getRiskLabel(80)).toBe('Good');
    expect(getRiskLabel(65)).toBe('Fair');
    expect(getRiskLabel(40)).toBe('Poor');
  });
});
