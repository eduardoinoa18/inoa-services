import { NextResponse } from "next/server";
import { calculateEstimate } from "@/lib/pricing";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = calculateEstimate(body);
    return NextResponse.json({ ok: true, amount });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }
}
