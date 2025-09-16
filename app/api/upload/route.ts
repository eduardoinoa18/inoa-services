import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { can } from "@/lib/rbac";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const session = await requireSession();
  const role = ((session.user as any)?.role || 'viewer') as any;
  if (!can(role, 'edit_website') && !can(role, 'manage_users')) {
    return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
  }
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'NO_FILE' }, { status: 400 });
    }
    const arrayBuffer = await (file as File).arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const url = `data:${(file as File).type || 'application/octet-stream'};base64,${base64}`;
    return NextResponse.json({ url, name: (file as any).name || 'upload', type: (file as any).type, size: (file as any).size });
  } catch (err) {
    return NextResponse.json({ error: 'UPLOAD_ERROR', details: String(err) }, { status: 500 });
  }
}
