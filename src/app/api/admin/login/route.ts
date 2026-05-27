import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!password) {
    return NextResponse.json({ error: "Missing password" }, { status: 400 });
  }

  const ok = await verifyPassword(password);
  if (!ok) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await createSession();
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return res;
}
