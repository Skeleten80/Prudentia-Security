import type { AlertStatus, DeviceStatus, RiskLevel, Severity } from '@/lib/mock-data';

export const severityTone: Record<Severity, 'neutral' | 'warning' | 'danger' | 'critical'> = {
  low: 'neutral',
  medium: 'warning',
  high: 'danger',
  critical: 'critical',
};

export const riskTone: Record<RiskLevel, 'neutral' | 'warning' | 'danger' | 'critical'> = {
  low: 'neutral',
  medium: 'warning',
  high: 'danger',
  critical: 'critical',
};

export const deviceStatusTone: Record<DeviceStatus, 'success' | 'warning' | 'danger'> = {
  protected: 'success',
  at_risk: 'warning',
  offline: 'danger',
};

export const alertStatusTone: Record<AlertStatus, 'danger' | 'warning' | 'success'> = {
  open: 'danger',
  acknowledged: 'warning',
  resolved: 'success',
};
