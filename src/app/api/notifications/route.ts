import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export async function GET() { const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: 'Your session has expired.' }, { status: 401 }); return NextResponse.json({ data: await prisma.notification.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }, take: 50 }) }); }
export async function PATCH(request: Request) { const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: 'Your session has expired.' }, { status: 401 }); const body = await request.json().catch(() => ({})); const id = typeof body.id === 'string' ? body.id : undefined; await prisma.notification.updateMany({ where: { userId: user.id, ...(id ? { id } : {}) }, data: { readAt: new Date() } }); return NextResponse.json({ data: true }); }
