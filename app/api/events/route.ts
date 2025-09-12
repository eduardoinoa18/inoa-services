import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth';

export async function GET() {
  await requireSession();
  const data = await prisma.event.findMany({ take: 200, orderBy: { start: 'asc' } });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const session = await requireSession();
  const body = await req.json();
  const created = await prisma.event.create({ data: {
    title: body.title,
    start: new Date(body.start),
    end: new Date(body.end),
    timezone: body.timezone || 'UTC',
    type: body.type || 'appointment',
    clientId: body.clientId || null,
    location: body.location || null,
    notes: body.notes || null,
    attendees: body.attendees || [],
    createdBy: session.user?.email || null,
    assignedTo: body.assignedTo || null,
  }});
  return NextResponse.json({ data: created }, { status: 201 });
}
