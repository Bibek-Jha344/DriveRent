import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
export async function GET() { try { await requireRole(['ADMIN', 'STAFF']); const [revenue, statuses, categories, maintenance] = await Promise.all([prisma.booking.aggregate({ _sum: { totalAmount: true }, _count: true, where: { status: { not: 'CANCELLED' } } }), prisma.booking.groupBy({ by: ['status'], _count: { _all: true } }), prisma.vehicle.groupBy({ by: ['categoryId'], _count: { _all: true } }), prisma.maintenance.aggregate({ _sum: { cost: true }, _count: true })]); return NextResponse.json({ data: { revenue, statuses, categories, maintenance } }); } catch { return NextResponse.json({ error: 'You do not have permission to view reports.' }, { status: 403 }); } }
