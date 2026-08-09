import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GET } from './route';

describe('GET /health', () => {
  // Mirrors deploy.yml's runtime .env, so the kit's default service resolution
  // (OTEL_SERVICE_NAME) is exercised the same way it is in production.
  beforeEach(() => {
    process.env.OTEL_SERVICE_NAME = 'vreshch-web';
  });

  afterEach(() => {
    delete process.env.OTEL_SERVICE_NAME;
  });

  it('returns the v1 health envelope for vreshch-web', async () => {
    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.service).toBe('vreshch-web');
    expect(body.data.status).toBe('ok');
  });
});
