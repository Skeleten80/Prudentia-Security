-- Mock seed for "Trillium Bookkeeping & Tax Co.", a fictional Ontario SMB.
-- Replace the placeholder UUIDs with real auth.users IDs before running
-- against a live project; these values are for local/staging demos only.

insert into organizations (id, owner_id, name, industry, city, province, plan)
values (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'Trillium Bookkeeping & Tax Co.',
  'Professional Services',
  'Kitchener',
  'ON',
  'growth'
);

insert into profiles (id, email, full_name, is_platform_admin)
values
  ('22222222-2222-2222-2222-222222222222', 'owner@trilliumbooks.ca', 'Avery Klassen', false),
  ('33333333-3333-3333-3333-333333333333', 'admin@trilliumbooks.ca', 'Priya Nandakumar', false),
  ('44444444-4444-4444-4444-444444444444', 'staff@trilliumbooks.ca', 'Marcus Lee', false);

insert into organization_members (organization_id, user_id, role, status)
values
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'owner', 'active'),
  ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'admin', 'active'),
  ('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'member', 'active');

insert into devices (id, organization_id, name, device_type, operating_system, owner_name, ip_address, status, av_status, patch_status, risk_level, last_seen_at)
values
  ('aaaaaaaa-0001-4000-8000-000000000001', '11111111-1111-1111-1111-111111111111', 'Reception Desktop', 'desktop', 'Windows 11', 'Front Desk', '192.168.1.12', 'protected', 'up_to_date', 'up_to_date', 'low', now() - interval '5 minutes'),
  ('aaaaaaaa-0001-4000-8000-000000000002', '11111111-1111-1111-1111-111111111111', 'Avery''s Laptop', 'laptop', 'Windows 11', 'Avery Klassen', '192.168.1.21', 'at_risk', 'outdated', 'pending', 'medium', now() - interval '2 hours'),
  ('aaaaaaaa-0001-4000-8000-000000000003', '11111111-1111-1111-1111-111111111111', 'Accounting File Server', 'server', 'Windows Server 2022', 'IT Managed', '192.168.1.5', 'protected', 'up_to_date', 'up_to_date', 'low', now() - interval '1 minute'),
  ('aaaaaaaa-0001-4000-8000-000000000004', '11111111-1111-1111-1111-111111111111', 'Priya''s MacBook Pro', 'laptop', 'macOS 15', 'Priya Nandakumar', '192.168.1.34', 'protected', 'up_to_date', 'up_to_date', 'low', now() - interval '10 minutes'),
  ('aaaaaaaa-0001-4000-8000-000000000005', '11111111-1111-1111-1111-111111111111', 'Marcus''s Laptop', 'laptop', 'Windows 10', 'Marcus Lee', '192.168.1.40', 'at_risk', 'not_installed', 'overdue', 'critical', now() - interval '3 days'),
  ('aaaaaaaa-0001-4000-8000-000000000006', '11111111-1111-1111-1111-111111111111', 'Office Wi-Fi Router', 'network', 'RouterOS 7', 'IT Managed', '192.168.1.1', 'protected', 'up_to_date', 'up_to_date', 'low', now() - interval '1 minute'),
  ('aaaaaaaa-0001-4000-8000-000000000007', '11111111-1111-1111-1111-111111111111', 'POS Terminal', 'other', 'Linux (embedded)', 'Front Desk', '192.168.1.50', 'protected', 'up_to_date', 'pending', 'medium', now() - interval '20 minutes'),
  ('aaaaaaaa-0001-4000-8000-000000000008', '11111111-1111-1111-1111-111111111111', 'Marcus''s Work Phone', 'mobile', 'Android 14', 'Marcus Lee', '192.168.1.60', 'offline', 'not_installed', 'overdue', 'high', now() - interval '6 days');

insert into alerts (organization_id, device_id, severity, category, title, description, status, occurred_at)
values
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-0001-4000-8000-000000000005', 'critical', 'malware', 'Ransomware-pattern file activity detected', 'Mass file rename/encryption pattern observed on Marcus''s Laptop. Network share access has been suspended pending review.', 'open', now() - interval '3 hours'),
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-0001-4000-8000-000000000002', 'high', 'patch', 'Critical OS security patch overdue', 'Windows security update KB5034123 has been pending for 14 days on Avery''s Laptop.', 'open', now() - interval '1 day'),
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-0001-4000-8000-000000000008', 'high', 'configuration', 'Antivirus not installed on mobile device', 'Marcus''s Work Phone has no mobile threat protection enrolled.', 'acknowledged', now() - interval '2 days'),
  ('11111111-1111-1111-1111-111111111111', null, 'medium', 'phishing', 'Phishing email reported by staff', 'Marcus Lee reported a suspicious invoice email impersonating a known vendor.', 'resolved', now() - interval '4 days'),
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-0001-4000-8000-000000000002', 'medium', 'login_anomaly', 'Sign-in from unrecognized location', 'A login to Avery''s Microsoft 365 account occurred from an unfamiliar IP range.', 'acknowledged', now() - interval '5 days'),
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-0001-4000-8000-000000000007', 'low', 'patch', 'POS terminal update available', 'A vendor firmware update is available for the POS Terminal.', 'open', now() - interval '6 days'),
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-0001-4000-8000-000000000006', 'low', 'configuration', 'Guest Wi-Fi network not isolated', 'Guest network traffic is not segmented from internal office devices.', 'resolved', now() - interval '10 days');

insert into security_score_snapshots (organization_id, score, captured_at)
values
  ('11111111-1111-1111-1111-111111111111', 88, now() - interval '60 days'),
  ('11111111-1111-1111-1111-111111111111', 84, now() - interval '45 days'),
  ('11111111-1111-1111-1111-111111111111', 79, now() - interval '30 days'),
  ('11111111-1111-1111-1111-111111111111', 81, now() - interval '15 days'),
  ('11111111-1111-1111-1111-111111111111', 73, now() - interval '2 days');

insert into ai_reports (organization_id, title, period_start, period_end, summary, recommendations, status, generated_at)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'May 2026 Security Report',
    '2026-05-01', '2026-05-31',
    'Your security posture held steady overall. Two devices fell behind on patching, and staff successfully flagged one phishing attempt before it caused harm.',
    '["Enable automatic OS updates on all staff laptops", "Enroll mobile devices in mobile threat defense", "Run a phishing awareness refresher for the front-desk team"]',
    'ready',
    now() - interval '20 days'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'April 2026 Security Report',
    '2026-04-01', '2026-04-30',
    'No critical incidents this period. Antivirus coverage was at 100% across managed endpoints for the first time in three months.',
    '["Continue current patch cadence", "Review guest Wi-Fi isolation settings"]',
    'ready',
    now() - interval '50 days'
  );

insert into subscriptions (organization_id, plan_name, status, current_period_end)
values ('11111111-1111-1111-1111-111111111111', 'growth', 'active', now() + interval '18 days');

insert into audit_logs (organization_id, user_id, action, target_type, target_id, metadata)
values
  ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'alert.acknowledged', 'alert', 'login_anomaly', '{}'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'member.invited', 'organization_member', 'staff@trilliumbooks.ca', '{}'),
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'report.generated', 'ai_report', 'May 2026 Security Report', '{}');
