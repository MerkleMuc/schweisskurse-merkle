import 'server-only';
import crypto from 'node:crypto';

/* Kurzes, signiertes Token für die Bestätigungsseite – verhindert, dass
   Fremde über geratene Buchungsnummern Daten einsehen. */
function key() {
  return process.env.ADMIN_SESSION_SECRET || `sk-token:${process.env.ADMIN_PASSWORD_MUENCHEN || ''}:${process.env.DATA_DIR || ''}`;
}

export function refToken(ref: string) {
  return crypto.createHmac('sha256', key()).update(`ref:${ref}`).digest('base64url').slice(0, 22);
}

export function checkRefToken(ref: string, token: string | undefined | null) {
  if (!token) return false;
  const a = Buffer.from(refToken(ref));
  const b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
