import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('UNAUTHORIZED');
  return session as (typeof session) & { user: { email?: string; role?: 'owner'|'admin'|'staff'|'viewer' } };
}

export async function getSessionSafe() {
  try { return await getServerSession(authOptions); } catch { return null; }
}
