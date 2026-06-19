# Prudentia Shield

Prudentia Shield is a multi-tenant cybersecurity dashboard for small Ontario
businesses, by **Nessalk Industries**. It gives a small business owner one
place to see their organization's security score, device inventory, active
alerts, and a monthly AI-generated security report.

This is an **MVP**: mock-first, production-shaped, intentionally simple. The
UI runs entirely on in-memory mock data until a Supabase project and (later)
Stripe/AI keys are connected — nothing here requires a backend to demo.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS (dark UI)
- Supabase Postgres + Auth (magic link) — schema and RLS included
- Stripe — placeholder checkout flow
- Zod + React Hook Form for validated forms
- Vitest for unit tests
- Vercel-ready

## Folder Structure

```
app/
  page.tsx                     Landing page
  layout.tsx                   Root layout, metadata
  globals.css                  Tailwind base + dark theme
  signup/page.tsx               Magic-link auth
  dashboard/
    layout.tsx                  Sidebar shell + auth guard
    page.tsx                    Overview: score, stats, recent alerts/devices
    devices/page.tsx            Device inventory table
    alerts/page.tsx              Alerts table
    reports/page.tsx            Monthly AI report generator
    settings/page.tsx           Org profile + team members
    billing/page.tsx            Plans + mock Stripe checkout

components/
  ui/                          Shared primitives (card, badge, button, empty/error/loading states)
  layout/                      Sidebar, header
  dashboard/                   Security score (with trend chart), stat card
  devices/                     Device inventory table
  alerts/                      Alert list
  reports/                     AI report list + generator UI
  settings/                    Org settings form, members list
  billing/                     Plan card
  marketing/                   Landing hero
  icons/                       App icon

lib/
  mock-data.ts                 Central mock dataset (org, devices, alerts, reports, members)
  security/score.ts             Security score calculation from open alerts
  ui/tone.ts                    Severity/status → badge color mapping
  validators/index.ts           Zod schemas (org settings)
  supabase/                     Client init, auth guard, DB-adapter placeholders
  ai/report-generator.ts        Mock monthly report generator (swap for a real LLM call)
  billing/stripe.ts             Stripe key check + mock checkout session
  utils.ts                      `cn()` class-merge helper

supabase/
  migrations/001_initial.sql    Full schema + RLS policies
  seed.sql                      Demo data for one organization

tests/
  lib/                          Vitest unit tests
```

## Local Setup

1. Install dependencies: `npm install`
2. Copy environment file: `cp .env.example .env.local`
3. Run dev server: `npm run dev`
4. Open `http://localhost:3000`

If Supabase/Stripe/AI keys are missing, the app runs fully in mock mode —
this is the default for local development.

## Environment Variables

See `.env.example` for the full list:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key (browser auth) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side key for privileged DB access (never expose to the browser) |
| `STRIPE_SECRET_KEY` | Server-side Stripe key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Browser-side Stripe key |
| `STRIPE_WEBHOOK_SECRET` | Verifies incoming Stripe webhook events |
| `OPENAI_API_KEY` | Powers the real AI report generator once wired up |
| `RESEND_API_KEY` | Email delivery (alert notifications, invites) |
| `APP_URL` | Base URL used for auth redirects |

None of these are required to run the app locally — every integration has a
mock fallback.

## Database Schema

Defined in `supabase/migrations/001_initial.sql`:

- **profiles** — mirrors `auth.users`; `is_platform_admin` reserves a hook for a future internal admin surface.
- **organizations** — one row per tenant/workspace. `plan` tracks billing tier.
- **organization_members** — join table with `role` (`owner` / `admin` / `member`) and `status`, scoping every other table to a tenant.
- **devices** — the device inventory: type, OS, owner, AV/patch status, risk level.
- **alerts** — security alerts, optionally linked to a device, with `severity` and `status` (`open` / `acknowledged` / `resolved`).
- **security_score_snapshots** — periodic score captures for the dashboard trend line. The live score is computed from open alerts (see `lib/security/score.ts`); snapshots are for historical trend only.
- **ai_reports** — generated monthly reports (summary + recommendations).
- **subscriptions** — Stripe plan/status per organization.
- **audit_logs** — admin-ready activity trail (member changes, alert actions, report generation).

Row Level Security is enabled on every tenant-scoped table via two helper
functions: `is_org_member(org_id)` (read access for active members) and
`is_org_admin(org_id)` (write access to organization profile and member
management, restricted to `owner`/`admin` roles).

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_initial.sql` in the SQL editor.
3. (Optional) Run `supabase/seed.sql` for demo data — replace the placeholder UUIDs with real `auth.users` IDs first.
4. Enable email magic-link auth in Supabase Auth settings.

## Deployment (Vercel)

1. Push this repository to your Git provider.
2. Import the project in Vercel.
3. Set environment variables from `.env.example`.
4. Build command: `npm run build`. Output: Next.js default.

## Security Notes

- RLS policies scope every read and write to active members of an organization.
- Admin-only actions (organization profile edits, member management) require `owner`/`admin` role via `is_org_admin`.
- Product messaging avoids guarantees of breach prevention; this is a monitoring and reporting dashboard, not a managed security service.

## Testing

`npm run test` runs Vitest unit tests covering the security score calculation
and the organization settings validator.

## Next Steps Roadmap

**Near-term (make the mock real):**
1. Wire `lib/supabase/repositories.ts` to real Supabase queries; replace mock-data reads in pages with server-side fetches scoped by the active organization.
2. Implement server-side session verification in `lib/supabase/auth.ts` (currently a config-check placeholder) and an organization-creation flow after signup.
3. Replace `lib/ai/report-generator.ts`'s mock body with a real OpenAI call, and add a cron/scheduled function to auto-generate the monthly report.
4. Build real Stripe checkout + webhook handling (`/api/billing/checkout`, `/api/billing/webhook`) to replace `lib/billing/stripe.ts`'s mock session.

**Medium-term:**
5. Member invite flow (email via Resend) and role management UI.
6. Alert acknowledgement/resolution actions that write to `alerts` and `audit_logs`.
7. Device agent or integration ingestion path (e.g. a lightweight endpoint agent or MDM webhook) to populate `devices`/`alerts` from real telemetry.
8. Pagination/filtering on the devices and alerts tables as data volume grows.

**Later:**
9. Platform admin view (cross-tenant) using `profiles.is_platform_admin`.
10. Audit log export and basic compliance reporting (PIPEDA-aligned summary for Ontario SMBs).
11. E2E tests (Playwright) for the signup → dashboard → settings flows.
