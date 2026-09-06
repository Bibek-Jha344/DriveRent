import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export async function GET() { const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: 'Your session has expired.' }, { status: 401 }); const payments = await prisma.payment.findMany({ where: user.role.name === 'CUSTOMER' ? { booking: { userId: user.id } } : {}, include: { booking: { include: { vehicle: true, user: { select: { name: true, email: true } } } } }, orderBy: { createdAt: 'desc' } }); return NextResponse.json({ data: payments }); }
