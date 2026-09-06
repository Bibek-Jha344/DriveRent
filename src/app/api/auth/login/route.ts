import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';
const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
export async function POST(request: Request) { const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: 'Enter a valid email and password.' }, { status: 400 }); const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() }, include: { role: true } }); if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 }); const response = NextResponse.json({ data: { id: user.id, name: user.name, role: user.role.name } }); response.cookies.set('driverent_session', await createSession(user.id), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7, path: '/' }); return response; }
