import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';

/*
 * Versand über SMTP. Ohne SMTP_HOST wird die Nachricht nur protokolliert –
 * Buchungen und Anfragen landen trotzdem im Backend.
 */

let transport: Transporter | null | undefined;

function getTransport() {
  if (transport !== undefined) return transport;
  if (!process.env.SMTP_HOST) return (transport = null);
  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });
  return transport;
}

export async function sendMail(msg: { to: string; subject: string; text: string; replyTo?: string }) {
  const t = getTransport();
  if (!t) {
    console.info(`[mail] (kein SMTP konfiguriert) an ${msg.to}: ${msg.subject}`);
    return false;
  }
  try {
    await t.sendMail({ from: process.env.MAIL_FROM || 'Merkle Schweißkurse <info@schweisskurse-merkle.de>', ...msg });
    return true;
  } catch (e) {
    console.error('[mail] Versand fehlgeschlagen', e);
    return false;
  }
}

export function teamAdresse(standort: string | null | undefined) {
  if (standort === 'hamburg') return process.env.MAIL_TO_HAMBURG || 'info@schweisskurse-merkle.de';
  return process.env.MAIL_TO_MUENCHEN || 'info@schweisskurse-merkle.de';
}
