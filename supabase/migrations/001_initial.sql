create extension if not exists "pgcrypto";

-- Profiles mirror auth.users with app-level fields. is_platform_admin powers
-- a future internal admin surface without needing a separate table for MVP.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  is_platform_admin boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  industry text,
  city text,
  province text default 'ON',
  plan text not null default 'starter' check (plan in ('starter', 'growth', 'business')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  invited_email text,
  status text not null default 'active' check (status in ('active', 'invited', 'suspended')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (organization_id, user_id)
);

create table if not exists devices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  device_type text not null check (device_type in ('laptop', 'desktop', 'server', 'mobile', 'network', 'other')),
  operating_system text,
  owner_name text,
  ip_address text,
  status text not null default 'protected' check (status in ('protected', 'at_risk', 'offline')),
  av_status text not null default 'up_to_date' check (av_status in ('up_to_date', 'outdated', 'not_installed')),
  patch_status text not null default 'up_to_date' check (patch_status in ('up_to_date', 'pending', 'overdue')),
  risk_level text not null default 'low' check (risk_level in ('low', 'medium', 'high', 'critical')),
  last_seen_at timestamptz,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  device_id uuid references devices(id) on delete set null,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  category text not null,
  title text not null,
  description text,
  status text not null default 'open' check (status in ('open', 'acknowledged', 'resolved')),
  acknowledged_by uuid,
  resolved_at timestamptz,
  occurred_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Periodic snapshots let the dashboard show a score trend without
-- recomputing history; the live score is still derived from open alerts.
create table if not exists security_score_snapshots (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  score int not null check (score between 0 and 100),
  captured_at timestamptz default now()
);

create table if not exists ai_reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  title text not null,
  period_start date not null,
  period_end date not null,
  summary text,
  recommendations jsonb default '[]'::jsonb,
  status text not null default 'ready' check (status in ('generating', 'ready')),
  generated_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_name text not null default 'starter',
  status text not null default 'active' check (status in ('active', 'trialing', 'past_due', 'canceled')),
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid,
  action text not null,
  target_type text,
  target_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create or replace function is_org_member(target_org uuid)
returns boolean language sql stable as $$
  select auth.uid() is not null and exists (
    select 1
    from organization_members om
    where om.organization_id = target_org
      and om.user_id = auth.uid()
      and om.status = 'active'
  );
$$;

create or replace function is_org_admin(target_org uuid)
returns boolean language sql stable as $$
  select auth.uid() is not null and exists (
    select 1
    from organization_members om
    where om.organization_id = target_org
      and om.user_id = auth.uid()
      and om.status = 'active'
      and om.role in ('owner', 'admin')
  );
$$;

alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table devices enable row level security;
alter table alerts enable row level security;
alter table security_score_snapshots enable row level security;
alter table ai_reports enable row level security;
alter table subscriptions enable row level security;
alter table audit_logs enable row level security;

create policy organizations_read on organizations
  for select using (is_org_member(id));
create policy organizations_write on organizations
  for update using (is_org_admin(id)) with check (is_org_admin(id));

create policy organization_members_read on organization_members
  for select using (is_org_member(organization_id));
create policy organization_members_write on organization_members
  for insert with check (is_org_admin(organization_id));
create policy organization_members_modify on organization_members
  for update using (is_org_admin(organization_id)) with check (is_org_admin(organization_id));
create policy organization_members_delete on organization_members
  for delete using (is_org_admin(organization_id));

create policy devices_scope on devices
  for all using (is_org_member(organization_id)) with check (is_org_member(organization_id));
create policy alerts_scope on alerts
  for all using (is_org_member(organization_id)) with check (is_org_member(organization_id));
create policy security_score_snapshots_scope on security_score_snapshots
  for all using (is_org_member(organization_id)) with check (is_org_member(organization_id));
create policy ai_reports_scope on ai_reports
  for all using (is_org_member(organization_id)) with check (is_org_member(organization_id));
create policy subscriptions_scope on subscriptions
  for all using (is_org_member(organization_id)) with check (is_org_member(organization_id));
create policy audit_logs_scope on audit_logs
  for all using (is_org_member(organization_id)) with check (is_org_member(organization_id));
