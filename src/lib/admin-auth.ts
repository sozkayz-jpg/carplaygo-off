import { createHmac, timingSafeEqual } from "crypto";

const ADMIN_PASSWORD = "carplaygo2026";
const SECRET = "carplaygo-secret-key-2026";

export async function verifyPassword(password: string) {
  const input = Buffer.from(password || "");
  const expected = Buffer.from(ADMIN_PASSWORD);
  if (input.length !== expected.length) return false;
  return timingSafeEqual(input, expected);
}

function sign(data: string) {
  return createHmac("sha256", SECRET).update(data).digest("hex");
}

export async function createSession() {
  const expires = Date.now() + 1000 * 60 * 60 * 8; // 8h
  const payload = JSON.stringify({ role: "admin", exp: expires });
  const sig = sign(payload);
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export async function verifySession(token: string) {
  try {
    const [b64, sig] = token.split(".");
    if (!b64 || !sig) return false;
    const payload = Buffer.from(b64, "base64url").toString("utf8");
    if (sign(payload) !== sig) return false;
    const data = JSON.parse(payload);
    if (data.role !== "admin") return false;
    if (Date.now() > data.exp) return false;
    return true;
  } catch {
    return false;
  }
}
