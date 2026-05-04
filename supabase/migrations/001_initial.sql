create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key,
  email text not null unique,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists households (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  address_label text,
  security_mode text default 'Armed Home',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists household_members (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  user_id uuid not null,
  role text check (role in ('owner', 'admin', 'viewer', 'guest')),
  invited_email text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(household_id, user_id)
);

create table if not exists devices (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name text,
  type text,
  manufacturer text,
  model text,
  protocol text,
  location text,
  status text,
  battery_level int,
  signal_strength int,
  last_seen_at timestamptz,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists security_events (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  device_id uuid references devices(id) on delete set null,
  event_type text,
  severity text,
  title text,
  description text,
  metadata jsonb default '{}'::jsonb,
  acknowledged boolean default false,
  acknowledged_by uuid,
  occurred_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists alert_rules (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name text,
  trigger_type text,
  device_id uuid references devices(id) on delete set null,
  conditions jsonb default '{}'::jsonb,
  actions jsonb default '{}'::jsonb,
  severity text,
  enabled boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists ai_summaries (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  summary_type text,
  title text,
  content text,
  recommendations jsonb default '[]'::jsonb,
  period_start timestamptz,
  period_end timestamptz,
  created_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  user_id uuid,
  event_id uuid references security_events(id) on delete set null,
  channel text,
  title text,
  message text,
  status text,
  sent_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_name text,
  status text,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists integrations (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  provider text,
  name text,
  status text,
  credentials_encrypted text,
  configuration jsonb default '{}'::jsonb,
  last_checked_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  user_id uuid,
  action text,
  target_type text,
  target_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create or replace function is_household_member(target_household uuid)
returns boolean language sql stable as $$
  select auth.uid() is not null and exists (
    select 1
    from household_members hm
    where hm.household_id = target_household
      and hm.user_id = auth.uid()
      and hm.status = 'active'
  );
$$;

alter table households enable row level security;
alter table household_members enable row level security;
alter table devices enable row level security;
alter table security_events enable row level security;
alter table alert_rules enable row level security;
alter table ai_summaries enable row level security;
alter table notifications enable row level security;
alter table integrations enable row level security;
alter table audit_logs enable row level security;

create policy household_member_access on households using (is_household_member(id));
create policy household_members_scope on household_members using (is_household_member(household_id));
create policy devices_scope on devices using (is_household_member(household_id));
create policy security_events_scope on security_events using (is_household_member(household_id));
create policy alert_rules_scope on alert_rules using (is_household_member(household_id));
create policy ai_summaries_scope on ai_summaries using (is_household_member(household_id));
create policy notifications_scope on notifications using (is_household_member(household_id));
create policy integrations_scope on integrations using (is_household_member(household_id));
create policy audit_logs_scope on audit_logs using (is_household_member(household_id));
