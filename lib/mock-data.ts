export type NavItem = { label: string; href: string; icon: string };
export type CameraFeed = { id: string; name: string; status: 'Online' | 'Offline'; location: string; lastMotion: string };
export type SecurityEvent = { id: string; title: string; severity: 'Low' | 'Medium' | 'High'; source: string; time: string; details: string };
export type Device = { id: string; name: string; type: string; health: 'Healthy' | 'Warning'; battery: string; zone: string };
export type Automation = { id: string; name: string; trigger: string; action: string; enabled: boolean };

export const marketingFeatures = [
  'Unified security dashboard','Camera and sensor monitoring','AI security summaries','Smart alerts',
  'Device health monitoring','Home security automations','Property monitoring','Household access control'
];

export const plans = [
  { name: 'Free', price: '$0', description: 'Single property monitoring.' },
  { name: 'Basic', price: '$9', description: 'Essential camera + sensor support.' },
  { name: 'Pro', price: '$19', description: 'Advanced alerts and automations.' },
  { name: 'Family+', price: '$29', description: 'Multi-user and AI assistant.' },
  { name: 'Installer / Property Manager', price: '$99+', description: 'Multi-property tenant controls.' },
];

export const dashboardSummary = { score: 92, mode: 'Armed Home', camerasOnline: '7/8', sensorsOnline: '19/21', alerts: 1, network: 'Healthy' };

export const cameraFeeds: CameraFeed[] = [
  { id: 'c1', name: 'Front Door Camera', status: 'Online', location: 'Entry', lastMotion: '2 min ago' },
  { id: 'c2', name: 'Driveway Camera', status: 'Online', location: 'Driveway', lastMotion: '5 min ago' },
  { id: 'c3', name: 'Garage Camera', status: 'Offline', location: 'Garage', lastMotion: '1 hr ago' },
  { id: 'c4', name: 'Backyard Camera', status: 'Online', location: 'Backyard', lastMotion: '12 min ago' },
];

export const events: SecurityEvent[] = [
  { id: 'e1', title: 'Motion detected', severity: 'Medium', source: 'Driveway Camera', time: '08:22', details: 'Vehicle entered driveway.' },
  { id: 'e2', title: 'Door opened', severity: 'Low', source: 'Front Door Sensor', time: '07:55', details: 'Family member arrived home.' },
  { id: 'e3', title: 'Camera offline', severity: 'High', source: 'Garage Camera', time: '07:18', details: 'Connection lost for 7 minutes.' },
];

export const devices: Device[] = [
  { id: 'd1', name: 'Front Door Contact Sensor', type: 'Contact', health: 'Healthy', battery: '91%', zone: 'Main Entry' },
  { id: 'd2', name: 'Backyard Camera', type: 'Camera', health: 'Warning', battery: '16%', zone: 'Backyard' },
  { id: 'd3', name: 'Hallway Motion Sensor', type: 'Motion', health: 'Healthy', battery: '74%', zone: 'Interior' },
];

export const automations: Automation[] = [
  { id: 'a1', name: 'Night perimeter lock', trigger: '11:00 PM schedule', action: 'Lock all smart locks', enabled: true },
  { id: 'a2', name: 'Suspicious motion escalation', trigger: 'Motion + no known face', action: 'Push alert + siren delay mode', enabled: true },
  { id: 'a3', name: 'Away mode arm', trigger: 'No residents detected for 15 min', action: 'Arm Home + reduce notifications', enabled: false },
];

export const dashboardNav: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: '⌂' },
  { label: 'Events', href: '/dashboard/events', icon: '◷' },
  { label: 'Devices', href: '/dashboard/devices', icon: '▦' },
  { label: 'Automations', href: '/dashboard/automations', icon: '⚙' },
  { label: 'AI Assistant', href: '/dashboard/assistant', icon: '✦' },
  { label: 'Billing', href: '/dashboard/billing', icon: '$' },
  { label: 'Settings', href: '/dashboard/settings', icon: '☰' },
];

// Backward-compatible aliases for existing components.
export const dashboard = {
  score: dashboardSummary.score,
  mode: dashboardSummary.mode,
  camerasOnline: dashboardSummary.camerasOnline,
  sensorsOnline: dashboardSummary.sensorsOnline,
  alerts: dashboardSummary.alerts,
  lastMotion: 'Driveway Camera, 2 minutes ago',
  network: dashboardSummary.network,
  recommendation: 'Backyard camera battery is low. Replace or recharge within 48 hours.',
  lastAlert: 'Garage camera went offline for 7 minutes.',
  dailySummary: 'No critical threats detected overnight. Four motion events were recorded.',
};
export const cameras = cameraFeeds.map((c) => c.name);
export const sensors = devices.map((d) => d.name);
