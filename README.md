# Prudentia Security
Prudentia Security is a mock-first, production-oriented SaaS dashboard by **Nessalk Industries**.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase schema + RLS SQL
- Zod + Vitest baseline
- Mock AI, billing, and integration providers

## Local Setup
1. Install dependencies: `npm install`
2. Copy environment file: `cp .env.example .env.local`
3. Run dev server: `npm run dev`
4. Open `http://localhost:3000`

If third-party keys are missing, the app falls back to mock behavior.

## Environment Variables
See `.env.example` for all required keys:
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Stripe: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- AI/Email placeholders: `OPENAI_API_KEY`, `RESEND_API_KEY`
- App: `APP_URL`

## Supabase Setup
1. Create a Supabase project.
2. Run `supabase/migrations/001_initial.sql`.
3. (Optional) run `supabase/seed.sql` and replace placeholder seed content with your local test IDs.

## Deployment (Vercel)
1. Push repository to Git provider.
2. Import project in Vercel.
3. Set environment variables from `.env.example`.
4. Build command: `npm run build`
5. Output: Next.js default.

## Security Notes
- RLS policies limit `households`, `devices`, and `security_events` to members of each household.
- Credential-bearing fields are modeled as encrypted placeholders and are not displayed post-save.
- Product messaging avoids guarantees and clearly states it is not emergency monitoring.

## Integration Architecture
- Providers are defined with typed contracts in `lib/integrations/types.ts`.
- Built-in providers: Home Assistant, MQTT, ONVIF, RTSP, Webhook (`lib/integrations/providers.ts`).
- Integration events are normalized and mapped into `security_events` by `lib/integrations/security-event-mapper.ts`.
- Processing flow is orchestrated by `lib/integrations/manager.ts`, which also writes audit entries.
- Integration UI management is available at `/dashboard/integrations`.
- See `lib/integrations/IMPLEMENTATION_GUIDE.md` for production implementation guidance.
