import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";
import { imageSize } from "image-size";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-session")?.value;
  if (!token || !(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let width: number | undefined;
  let height: number | undefined;
  try {
    const dims = imageSize(buffer);
    width = dims.width;
    height = dims.height;
  } catch {
    // ignore unsupported types
  }

  const blob = await put(file.name, buffer, {
    access: "public",
    contentType: file.type,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const image = await prisma.uploadedImage.create({
    data: {
      url: blob.url,
      filename: file.name,
      width: width ?? null,
      height: height ?? null,
      sizeBytes: buffer.length,
      mimeType: file.type,
    },
  });

  return NextResponse.json(image);
}
