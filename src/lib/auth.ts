// Lightweight session signing and verification using Web Crypto API.
// 100% compatible with Next.js Edge Runtime (middleware) and Node.js.

export interface SessionPayload {
  email: string;
  exp: number; // Unix timestamp in seconds
}

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToArrayBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes.buffer;
}

export async function signSession(
  email: string,
  secret: string,
  maxAgeSeconds: number = 60 * 60 * 24 * 7 // 7 days
): Promise<string> {
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  };

  const payloadB64 = btoa(JSON.stringify(payload));
  const key = await getCryptoKey(secret);
  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(payloadB64)
  );

  const signatureHex = arrayBufferToHex(signatureBuffer);
  return `${payloadB64}.${signatureHex}`;
}

export async function verifySession(
  token: string | undefined | null,
  secret: string
): Promise<SessionPayload | null> {
  if (!token || !secret) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, signatureHex] = parts;
  if (!payloadB64 || !signatureHex) return null;

  try {
    const key = await getCryptoKey(secret);
    const enc = new TextEncoder();
    const signatureBuffer = hexToArrayBuffer(signatureHex);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      enc.encode(payloadB64)
    );

    if (!isValid) return null;

    const payloadText = atob(payloadB64);
    const payload: SessionPayload = JSON.parse(payloadText);

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp < nowSeconds) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}
