import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
const schema = z.object({ bookingId: z.string().uuid(), rating: z.number().int().min(1).max(5), comment: z.string().min(5).max(1000) });
export async function POST(request: Request) { const user = await getCurrentUser(); if (!user) return NextResponse.json({ error: 'Your session has expired.' }, { status: 401 }); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: 'Rating and comment are required.' }, { status: 400 }); const booking = await prisma.booking.findFirst({ where: { id: parsed.data.bookingId, userId: user.id, status: 'COMPLETED' } }); if (!booking) return NextResponse.json({ error: 'Reviews are available after a completed rental.' }, { status: 403 }); try { const review = await prisma.review.create({ data: { ...parsed.data, userId: user.id, vehicleId: booking.vehicleId } }); return NextResponse.json({ data: review }, { status: 201 }); } catch { return NextResponse.json({ error: 'This booking already has a review.' }, { status: 409 }); } }
