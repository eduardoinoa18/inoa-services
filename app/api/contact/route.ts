import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Ensure Node.js runtime (required for Nodemailer on Vercel)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
  const { name, email, phone, message, service } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!user || !pass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS env vars");
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
      replyTo: email,
      to: "inoaserv@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ""}\nService: ${service || "(not specified)"}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
