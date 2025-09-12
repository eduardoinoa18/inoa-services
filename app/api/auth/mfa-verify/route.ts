import { NextResponse } from "next/server";
import { hashOtp, verifyMfaToken } from "@/lib/mfa";

// naive attempts limiter per token
const attempts = new Map<string, number>();
const MAX_ATTEMPTS = 3;

export async function POST(req: Request) {
  try {
    const { token, otp } = await req.json();
    if (!token || !otp) return NextResponse.json({ error: "Missing token/otp" }, { status: 400 });
  const n = (attempts.get(token) || 0) + 1;
  attempts.set(token, n);
  if (n > MAX_ATTEMPTS) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
    const secret = process.env.NEXTAUTH_SECRET || "dev-secret";
    const payload = verifyMfaToken(token, secret);
    if (!payload) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    if (payload.otpHash !== hashOtp(otp)) return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  attempts.delete(token);
    return NextResponse.json({ ok: true, email: payload.email });
  } catch (err) {
    console.error("mfa-verify error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
