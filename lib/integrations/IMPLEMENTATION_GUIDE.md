# Integration Implementation Guide

This module uses a provider-based architecture to isolate integration logic from UI and core event pipelines.

## Safety requirements
- Never store plaintext credentials.
- Persist only encrypted references (see `credential-placeholders.ts` for structure).
- Never render credential values in UI after initial submission.
- Keep video/stream operations disabled until explicit secure configuration and permission checks are in place.

## Provider contract
Implement `IntegrationProvider` from `types.ts`:
1. `validateConfig` for schema validation and required fields.
2. `checkStatus` for health checks.
3. Optional `ingestEvents` async generator for event pipelines.
4. Optional `discoverDevices` for placeholder discovery workflows.

## Event pipeline
`processIntegrationEvents` in `manager.ts`:
1. Reads provider stream.
2. Maps each integration event using `security-event-mapper.ts`.
3. Persists into `security_events` via repository adapter.
4. Writes `audit_logs` entry for traceability.

## Production path
- Replace repository placeholders with Supabase client inserts.
- Add Zod config validation per provider.
- Add signature verification for webhooks.
- Add connection retry/backoff and dead-letter handling for ingestion.
