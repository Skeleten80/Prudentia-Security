export type NavItem = { label: string; href: string; icon: string };

export type DeviceType = 'laptop' | 'desktop' | 'server' | 'mobile' | 'network' | 'other';
export type DeviceStatus = 'protected' | 'at_risk' | 'offline';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'open' | 'acknowledged' | 'resolved';
export type MemberRole = 'owner' | 'admin' | 'member';

export type Device = {
  id: string;
  name: string;
  type: DeviceType;
  os: string;
  owner: string;
  ipAddress: string;
  status: DeviceStatus;
  avStatus: 'up_to_date' | 'outdated' | 'not_installed';
  patchStatus: 'up_to_date' | 'pending' | 'overdue';
  riskLevel: RiskLevel;
  lastSeen: string;
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  category: string;
  status: AlertStatus;
  deviceName?: string;
  occurredAt: string;
};

export type AiReport = {
  id: string;
  title: string;
  periodLabel: string;
  summary: string;
  recommendations: string[];
  generatedAt: string;
};

export type OrganizationMember = {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: 'active' | 'invited';
};

export type ScoreSnapshot = { capturedAt: string; score: number };

export const organization = {
  name: 'Trillium Bookkeeping & Tax Co.',
  industry: 'Professional Services',
  city: 'Kitchener',
  province: 'ON',
  plan: 'growth' as const,
};

export const marketingFeatures = [
  'Real-time cyber risk score',
  'Device inventory & patch tracking',
  'Centralized security alerts',
  'Monthly AI-generated reports',
  'Multi-user team workspace',
  'Built for Ontario small businesses',
];

export const plans = [
  { name: 'Starter', price: '$29/mo', description: 'Up to 10 devices, core alerts and monthly reports.' },
  { name: 'Growth', price: '$79/mo', description: 'Up to 50 devices, team roles, priority alerting.' },
  { name: 'Business', price: '$179/mo', description: 'Unlimited devices, audit log export, dedicated support.' },
];

export const devices: Device[] = [
  { id: 'd1', name: 'Reception Desktop', type: 'desktop', os: 'Windows 11', owner: 'Front Desk', ipAddress: '192.168.1.12', status: 'protected', avStatus: 'up_to_date', patchStatus: 'up_to_date', riskLevel: 'low', lastSeen: '5 minutes ago' },
  { id: 'd2', name: "Avery's Laptop", type: 'laptop', os: 'Windows 11', owner: 'Avery Klassen', ipAddress: '192.168.1.21', status: 'at_risk', avStatus: 'outdated', patchStatus: 'pending', riskLevel: 'medium', lastSeen: '2 hours ago' },
  { id: 'd3', name: 'Accounting File Server', type: 'server', os: 'Windows Server 2022', owner: 'IT Managed', ipAddress: '192.168.1.5', status: 'protected', avStatus: 'up_to_date', patchStatus: 'up_to_date', riskLevel: 'low', lastSeen: '1 minute ago' },
  { id: 'd4', name: "Priya's MacBook Pro", type: 'laptop', os: 'macOS 15', owner: 'Priya Nandakumar', ipAddress: '192.168.1.34', status: 'protected', avStatus: 'up_to_date', patchStatus: 'up_to_date', riskLevel: 'low', lastSeen: '10 minutes ago' },
  { id: 'd5', name: "Marcus's Laptop", type: 'laptop', os: 'Windows 10', owner: 'Marcus Lee', ipAddress: '192.168.1.40', status: 'at_risk', avStatus: 'not_installed', patchStatus: 'overdue', riskLevel: 'critical', lastSeen: '3 days ago' },
  { id: 'd6', name: 'Office Wi-Fi Router', type: 'network', os: 'RouterOS 7', owner: 'IT Managed', ipAddress: '192.168.1.1', status: 'protected', avStatus: 'up_to_date', patchStatus: 'up_to_date', riskLevel: 'low', lastSeen: '1 minute ago' },
  { id: 'd7', name: 'POS Terminal', type: 'other', os: 'Linux (embedded)', owner: 'Front Desk', ipAddress: '192.168.1.50', status: 'protected', avStatus: 'up_to_date', patchStatus: 'pending', riskLevel: 'medium', lastSeen: '20 minutes ago' },
  { id: 'd8', name: "Marcus's Work Phone", type: 'mobile', os: 'Android 14', owner: 'Marcus Lee', ipAddress: '192.168.1.60', status: 'offline', avStatus: 'not_installed', patchStatus: 'overdue', riskLevel: 'high', lastSeen: '6 days ago' },
];

export const alerts: Alert[] = [
  { id: 'a1', title: 'Ransomware-pattern file activity detected', description: "Mass file rename/encryption pattern observed on Marcus's Laptop. Network share access has been suspended pending review.", severity: 'critical', category: 'Malware', status: 'open', deviceName: "Marcus's Laptop", occurredAt: '3 hours ago' },
  { id: 'a2', title: 'Critical OS security patch overdue', description: "Windows security update KB5034123 has been pending for 14 days on Avery's Laptop.", severity: 'high', category: 'Patch Management', status: 'open', deviceName: "Avery's Laptop", occurredAt: '1 day ago' },
  { id: 'a3', title: 'Antivirus not installed on mobile device', description: "Marcus's Work Phone has no mobile threat protection enrolled.", severity: 'high', category: 'Configuration', status: 'acknowledged', deviceName: "Marcus's Work Phone", occurredAt: '2 days ago' },
  { id: 'a4', title: 'Phishing email reported by staff', description: 'Marcus Lee reported a suspicious invoice email impersonating a known vendor.', severity: 'medium', category: 'Phishing', status: 'resolved', occurredAt: '4 days ago' },
  { id: 'a5', title: 'Sign-in from unrecognized location', description: "A login to Avery's Microsoft 365 account occurred from an unfamiliar IP range.", severity: 'medium', category: 'Login Anomaly', status: 'acknowledged', deviceName: "Avery's Laptop", occurredAt: '5 days ago' },
  { id: 'a6', title: 'POS terminal update available', description: 'A vendor firmware update is available for the POS Terminal.', severity: 'low', category: 'Patch Management', status: 'open', deviceName: 'POS Terminal', occurredAt: '6 days ago' },
  { id: 'a7', title: 'Guest Wi-Fi network not isolated', description: 'Guest network traffic is not segmented from internal office devices.', severity: 'low', category: 'Configuration', status: 'resolved', deviceName: 'Office Wi-Fi Router', occurredAt: '10 days ago' },
];

export const scoreHistory: ScoreSnapshot[] = [
  { capturedAt: '60d ago', score: 88 },
  { capturedAt: '45d ago', score: 84 },
  { capturedAt: '30d ago', score: 79 },
  { capturedAt: '15d ago', score: 81 },
  { capturedAt: 'Today', score: 73 },
];

export const aiReports: AiReport[] = [
  {
    id: 'r1',
    title: 'May 2026 Security Report',
    periodLabel: 'May 1 – May 31, 2026',
    summary: 'Your security posture held steady overall. Two devices fell behind on patching, and staff successfully flagged one phishing attempt before it caused harm.',
    recommendations: [
      'Enable automatic OS updates on all staff laptops',
      'Enroll mobile devices in mobile threat defense',
      'Run a phishing awareness refresher for the front-desk team',
    ],
    generatedAt: '20 days ago',
  },
  {
    id: 'r2',
    title: 'April 2026 Security Report',
    periodLabel: 'Apr 1 – Apr 30, 2026',
    summary: 'No critical incidents this period. Antivirus coverage was at 100% across managed endpoints for the first time in three months.',
    recommendations: ['Continue current patch cadence', 'Review guest Wi-Fi isolation settings'],
    generatedAt: '50 days ago',
  },
];

export const members: OrganizationMember[] = [
  { id: 'm1', name: 'Avery Klassen', email: 'owner@trilliumbooks.ca', role: 'owner', status: 'active' },
  { id: 'm2', name: 'Priya Nandakumar', email: 'admin@trilliumbooks.ca', role: 'admin', status: 'active' },
  { id: 'm3', name: 'Marcus Lee', email: 'staff@trilliumbooks.ca', role: 'member', status: 'active' },
];

export const dashboardNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: '⌂' },
  { label: 'Devices', href: '/dashboard/devices', icon: '▦' },
  { label: 'Alerts', href: '/dashboard/alerts', icon: '⚠' },
  { label: 'Reports', href: '/dashboard/reports', icon: '✦' },
  { label: 'Billing', href: '/dashboard/billing', icon: '$' },
  { label: 'Settings', href: '/dashboard/settings', icon: '☰' },
];
