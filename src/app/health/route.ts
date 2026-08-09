import { healthResponse } from '@agentage/observability/health';

// Never prerender, or commit/buildTime are baked at build instead of read from the
// running container.
export const dynamic = 'force-dynamic';

// No explicit `service`: deploy.yml writes OTEL_SERVICE_NAME=vreshch-web to the
// runtime .env (consumed via docker-compose's env_file), so the kit's default
// keeps this route and telemetry service.name equal by construction.
export const GET = () => healthResponse();
