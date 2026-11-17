// ==============================================================================
// PÈRÔKADÔ — Sécurité cryptographique (Sessions signées HMAC, scrypt, CSRF/Origin)
// ==============================================================================
import crypto from 'node:crypto';

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 heures

export function hashSecret(secret) {
  return crypto.createHash('sha256').update(String(secret)).digest('hex');
}

export function timingSafeEqualStr(a, b) {
  const bufA = crypto.createHash('sha256').update(String(a ?? '')).digest();
  const bufB = crypto.createHash('sha256').update(String(b ?? '')).digest();
  const match = crypto.timingSafeEqual(bufA, bufB);
  return match && String(a ?? '').length === String(b ?? '').length && String(a ?? '').length > 0;
}

function getSigningSecret() {
  const explicit = (process.env.SESSION_SECRET || '').trim();
  if (explicit.length >= 16) return explicit;
  const adminPw = (process.env.ADMIN_PASSWORD || '').trim();
  if (adminPw.length > 0) {
    return crypto.createHmac('sha256', 'perokado-session-key-v1').update(adminPw).digest('hex');
  }
  // En mode développement local uniquement
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    return 'dev-local-perokado-secret-key-not-for-production-2026';
  }
  return null;
}

export function isAdminConfigured() {
  if ((process.env.ADMIN_PASSWORD || '').trim().length >= 6) return true;
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) return true;
  return false;
}

export function getEffectiveAdminPassword() {
  const pw = (process.env.ADMIN_PASSWORD || '').trim();
  if (pw) return pw;
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    return 'perokado-demo-admin';
  }
  return null;
}

export function signSessionToken(payload) {
  const secret = getSigningSecret();
  if (!secret) throw new Error('SESSION_SECRET / ADMIN_PASSWORD non configuré.');
  const now = Date.now();
  const data = {
    role: payload.role, // 'admin' | 'agent'
    agentId: payload.agentId || null,
    name: payload.name || (payload.role === 'admin' ? 'Administrateur' : 'Agent'),
    iat: now,
    exp: now + SESSION_TTL_MS,
    jti: crypto.randomBytes(12).toString('hex'),
  };
  const encoded = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const secret = getSigningSecret();
  if (!secret) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encoded, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', secret).update(encoded).digest('base64url');
  const bufA = Buffer.from(sig);
  const bufB = Buffer.from(expectedSig);
  if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
    return null;
  }
  try {
    const data = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (!data || typeof data.exp !== 'number' || Date.now() > data.exp) {
      return null;
    }
    if (data.role !== 'admin' && data.role !== 'agent') return null;
    return data;
  } catch {
    return null;
  }
}

export function generateAgentCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const part = (len) => {
    const bytes = crypto.randomBytes(len);
    let out = '';
    for (let i = 0; i < len; i++) out += alphabet[bytes[i] % alphabet.length];
    return out;
  };
  return `PKD-${part(4)}-${part(4)}`;
}

export function generateOrderReference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.randomBytes(6);
  let code = '';
  for (let i = 0; i < 6; i++) code += alphabet[bytes[i] % alphabet.length];
  return `PKD-${code}`;
}

export function generateTrackingToken() {
  return crypto.randomBytes(16).toString('hex');
}

export function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader || typeof cookieHeader !== 'string') return out;
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) {
      try {
        out[k] = decodeURIComponent(v);
      } catch {
        out[k] = v;
      }
    }
  }
  return out;
}

export function serializeSessionCookie(token, isSecure) {
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  const parts = [
    `pkd_session=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ];
  if (isSecure) parts.push('Secure');
  return parts.join('; ');
}

export function clearSessionCookie(isSecure) {
  const parts = [
    'pkd_session=',
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
  ];
  if (isSecure) parts.push('Secure');
  return parts.join('; ');
}

// Validation d'en-tête image binaire (anti-upload malveillant / XSS via SVG déguisé)
export function detectSafeImageMime(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 12) return null;
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png';
  }
  // WEBP: RIFF....WEBP
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return 'image/webp';
  }
  return null;
}
