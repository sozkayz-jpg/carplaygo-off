import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await prisma.fAQItem.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const item = await prisma.fAQItem.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { id, ...data } = body;
  const item = await prisma.fAQItem.update({ where: { id }, data });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await prisma.fAQItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
