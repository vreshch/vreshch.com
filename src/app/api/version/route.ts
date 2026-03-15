import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';

let versionInfo: Record<string, string> = {};
try {
  versionInfo = JSON.parse(readFileSync('./public/version.json', 'utf-8'));
} catch {
  // version.json not available (local development)
}

export function GET() {
  return NextResponse.json(versionInfo);
}
