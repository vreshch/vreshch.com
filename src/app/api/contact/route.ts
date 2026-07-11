import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(5000),
  website: z.string().optional(),
});

const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, times] of hits) {
    const fresh = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(name: string, email: string, message: string): string {
  return `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#374a60;">
  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p><strong>Message:</strong></p>
  <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
</div>`;
}

export async function POST(req: Request): Promise<NextResponse> {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Please check your name, email, and message.' },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot: silently drop bots that fill the hidden field.
  if (website && website.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return NextResponse.json(
      { success: false, error: 'Email is not configured.' },
      { status: 500 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || 'vreshch@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'Volodymyr Vreshch <no-reply@mail.agentage.io>';

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New message from ${name} via vreshch.com`,
        html: buildHtml(name, email, message),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(`[contact] resend send failed (${res.status}): ${detail}`);
      return NextResponse.json(
        { success: false, error: 'Could not send your message. Please email me directly.' },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('[contact] resend request threw', err);
    return NextResponse.json(
      { success: false, error: 'Could not send your message. Please email me directly.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
