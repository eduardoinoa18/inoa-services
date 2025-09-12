import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth';
import { can } from '@/lib/rbac';

export async function GET() {
  const session = await requireSession();
  // TODO: filter by ownership for staff
  const data = await prisma.client.findMany({ take: 100, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const session = await requireSession();
  if (!can((session.user as any).role || 'viewer', 'manage_crm')) return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
  const body = await req.json();
  const created = await prisma.client.create({ data: {
    displayName: body.displayName || `${body.firstName||''} ${body.lastName||''}`.trim() || body.email,
    firstName: body.firstName||null,
    lastName: body.lastName||null,
    email: body.email,
    phone: body.phone||null,
    status: body.status || 'Lead',
    tags: body.tags || [],
    assignedToId: body.assignedToId || null,
    notes: body.notes || null,
    createdBy: session.user?.email || null,
  }});
  return NextResponse.json({ data: created }, { status: 201 });
}
