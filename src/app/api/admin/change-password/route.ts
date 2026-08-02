import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  const current = process.env.ADMIN_PASSWORD ?? "admin123";

  if (auth !== current) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { newPassword } = await req.json();
  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: "Пароль должен быть минимум 6 символов" }, { status: 400 });
  }

  // На Vercel пароль меняется через переменную окружения ADMIN_PASSWORD в настройках проекта
  return NextResponse.json({
    ok: false,
    message: "Для смены пароля на продакшене измените переменную ADMIN_PASSWORD в настройках Vercel → Settings → Environment Variables"
  });
}
