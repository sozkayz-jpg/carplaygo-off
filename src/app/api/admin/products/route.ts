import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const product = await prisma.product.create({ data: body });
  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { id, ...data } = body;
  const product = await prisma.product.update({ where: { id }, data });
  return NextResponse.json(product);
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
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
