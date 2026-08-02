import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "data", "content.json");

export async function GET() {
  const content = JSON.parse(readFileSync(CONTENT_PATH, "utf-8"));
  return NextResponse.json({
    privacyText: content.privacyText ?? "",
    ofertaText: content.ofertaText ?? "",
  });
}
