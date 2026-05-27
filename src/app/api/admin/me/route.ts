import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
