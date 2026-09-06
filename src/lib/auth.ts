import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'development-only-secret');
export async function createSession(userId: string) { return new SignJWT({ userId }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('7d').sign(secret); }
export async function getCurrentUser() {
  const token = (await cookies()).get('driverent_session')?.value;
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, secret); return prisma.user.findUnique({ where: { id: String(payload.userId) }, include: { role: true } }); } catch { return null; }
}
export async function requireRole(roles: string[]) { const user = await getCurrentUser(); if (!user || !roles.includes(user.role.name)) throw new Error('You do not have permission to perform this action.'); return user; }
