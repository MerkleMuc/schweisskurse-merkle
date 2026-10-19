import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { StandortId } from './site';

/*
 * Ein eigener Zugang je Standort. Das Passwort steht in der Umgebung
 * (ADMIN_PASSWORD_MUENCHEN / ADMIN_PASSWORD_HAMBURG); die Sitzung ist ein
 * HMAC-signiertes Cookie, das nur für den jeweiligen Standort gilt.
 */

const SESSION_HOURS = 12;
const DEV_PASSWORDS: Record<StandortId, string> = { muenchen: 'muenchen-demo', hamburg: 'hamburg-demo' };

export function isStandort(s: string): s is StandortId {
  return s === 'muenchen' || s === 'hamburg';
}

function passwordFor(standort: StandortId): string | null {
  const env = standort === 'muenchen' ? process.env.ADMIN_PASSWORD_MUENCHEN : process.env.ADMIN_PASSWORD_HAMBURG;
  if (env) return env;
  return process.env.NODE_ENV === 'production' ? null : DEV_PASSWORDS[standort];
}

export function loginConfigured(standort: StandortId) {
  return passwordFor(standort) !== null;
}

function secret(): string {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  return crypto.createHash('sha256')
    .update(`sk:${process.env.ADMIN_PASSWORD_MUENCHEN || ''}:${process.env.ADMIN_PASSWORD_HAMBURG || ''}:${process.env.DATA_DIR || ''}`)
    .digest('hex');
}

function sign(value: string) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url');
}

const cookieName = (standort: StandortId) => `sk_admin_${standort}`;

export function checkPassword(standort: StandortId, input: string): boolean {
  const pw = passwordFor(standort);
  if (!pw) return false;
  const a = crypto.createHash('sha256').update(input).digest();
  const b = crypto.createHash('sha256').update(pw).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function startSession(standort: StandortId) {
  const exp = Date.now() + SESSION_HOURS * 3600_000;
  const payload = `${standort}.${exp}`;
  (await cookies()).set(cookieName(standort), `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: SESSION_HOURS * 3600
  });
}

export async function endSession(standort: StandortId) {
  (await cookies()).delete({ name: cookieName(standort), path: '/admin' });
}

export async function hasSession(standort: StandortId): Promise<boolean> {
  const raw = (await cookies()).get(cookieName(standort))?.value;
  if (!raw) return false;
  const i = raw.lastIndexOf('.');
  const payload = raw.slice(0, i);
  const sig = raw.slice(i + 1);
  const expected = sign(payload);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const [s, exp] = payload.split('.');
  return s === standort && Number(exp) > Date.now();
}

export async function requireSession(standort: StandortId) {
  if (!(await hasSession(standort))) redirect(`/admin/${standort}/login/`);
}
