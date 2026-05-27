import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const config = await prisma.siteConfig.findUnique({
    where: { id: "singleton" },
  });
  return NextResponse.json(config);
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const config = await prisma.siteConfig.upsert({
    where: { id: "singleton" },
    update: body,
    create: { id: "singleton", ...body },
  });
  return NextResponse.json(config);
}
