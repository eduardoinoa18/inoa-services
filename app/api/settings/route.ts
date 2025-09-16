import { NextResponse } from "next/server";
import { getSiteSettings, upsertSiteSettings } from "@/lib/settings";
import { requireSession } from "@/lib/auth";
import { can } from "@/lib/rbac";

export const runtime = 'nodejs';

export async function GET() {
  // Public read: site settings are safe for public consumption.
  const data = await getSiteSettings();
  return NextResponse.json({ data });
}

export async function PUT(req: Request) {
  const session = await requireSession();
  const role = ((session.user as any)?.role || 'viewer') as any;
  if (!can(role, 'edit_website') && !can(role, 'manage_users')) {
    return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
  }
  const body = await req.json();
  const data = await upsertSiteSettings(body);
  return NextResponse.json({ data });
}
