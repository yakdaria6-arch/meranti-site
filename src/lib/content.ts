import { readFileSync } from "fs";
import { join } from "path";

export function getContent() {
  const raw = readFileSync(join(process.cwd(), "data", "content.json"), "utf-8");
  return JSON.parse(raw);
}
