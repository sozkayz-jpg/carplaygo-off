import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const ADMIN_PASSWORD = "carplaygo2026";
const SECRET = new TextEncoder().encode("carplaygo-secret-key-2026");

export async function verifyPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) {
    return bcrypt.compare(password, hash);
  }
  return password === ADMIN_PASSWORD;
}

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(SECRET);
  return token;
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET, { clockTolerance: 60 });
    return payload.role === "admin";
  } catch {
    return false;
  }
}
