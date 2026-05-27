import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-session", "", { maxAge: 0, path: "/" });
  return res;
}
