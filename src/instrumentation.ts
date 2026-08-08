// Next runs this once per server process. Inert unless the OTEL env pair is set
// (written to /opt/vreshch-com/.env by the deploy).
export { register } from '@agentage/observability/next';
