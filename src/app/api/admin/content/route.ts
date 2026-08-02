import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "data", "content.json");

function checkAuth(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  return req.headers.get("x-admin-password") === password;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = JSON.parse(readFileSync(CONTENT_PATH, "utf-8"));
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  writeFileSync(CONTENT_PATH, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}
