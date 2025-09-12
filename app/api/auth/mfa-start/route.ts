import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { hashOtp, signMfaToken } from "@/lib/mfa";

// naive in-memory rate limit by IP+email (resets on server restart)
const rateMap = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQ = 5; // 5 requests per window

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Missing email/password" }, { status: 400 });
    const ip = (req.headers as any).get?.("x-forwarded-for") || "local";
    const key = `${ip}:${email}`;
    const now = Date.now();
    const rec = rateMap.get(key);
    if (!rec || now - rec.ts > WINDOW_MS) {
      rateMap.set(key, { count: 1, ts: now });
    } else {
      if (rec.count >= MAX_REQ) return NextResponse.json({ error: "Too many requests. Try later." }, { status: 429 });
      rec.count++; rec.ts = now; rateMap.set(key, rec);
    }
    // Basic credential check using env vars
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate OTP
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const otpHash = hashOtp(otp);
    const secret = process.env.NEXTAUTH_SECRET || "dev-secret";
  const token = signMfaToken({ email, otpHash, exp: Math.floor(Date.now()/1000) + 5 * 60 }, secret);

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!user || !pass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS env vars for MFA email");
      return NextResponse.json({ error: "Email is not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to: email,
      subject: "Your Inoa Admin verification code",
      text: `Your verification code is: ${otp}\nThis code expires in 5 minutes.`,
    });

    return NextResponse.json({ token });
  } catch (err) {
    console.error("mfa-start error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
