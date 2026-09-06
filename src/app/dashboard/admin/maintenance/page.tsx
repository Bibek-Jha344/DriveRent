import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export default async function AdminMaintenance() { const user = await getCurrentUser(); if (!user || !['ADMIN', 'STAFF'].includes(user.role.name)) redirect('/dashboard'); const records = await prisma.maintenance.findMany({ include: { vehicle: true }, orderBy: { startAt: 'desc' } }); return <main className="min-h-screen bg-ink px-6 py-12 text-paper"><div className="mx-auto max-w-6xl"><p className="text-sm font-bold uppercase tracking-[.2em] text-lime">Fleet health</p><h1 className="mt-3 font-display text-5xl">Maintenance.</h1><div className="mt-10 grid gap-4">{records.map((record) => <article key={record.id} className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-paper p-6 text-ink"><div><h2 className="font-semibold">{record.vehicle.brand} {record.vehicle.model}</h2><p className="mt-1 text-sm text-ink/55">{record.type} · {record.description}</p></div><div className="text-right"><span className="rounded-full bg-lime px-2 py-1 text-xs font-bold">{record.status}</span><p className="mt-2 text-sm">{formatCurrency(record.cost)}</p></div></article>)}{!records.length && <p className="text-paper/60">No maintenance records found.</p>}</div></div></main>; }
