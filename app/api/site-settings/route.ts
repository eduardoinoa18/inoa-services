export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'data', 'site-settings.json');

async function readSettings() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function GET() {
  const data = await readSettings();
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'SAVE_FAILED', details: String(e) }, { status: 500 });
  }
}
