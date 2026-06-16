import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin/auth";

export const runtime = "nodejs";

/** Clear the admin session cookie. */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
