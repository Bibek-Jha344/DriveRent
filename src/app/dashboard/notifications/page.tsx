import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export default async function NotificationsPage() { const user = await getCurrentUser(); if (!user) redirect('/login'); const notifications = await prisma.notification.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } }); return <main className="min-h-screen px-6 py-14"><div className="mx-auto max-w-5xl"><p className="text-sm font-bold uppercase tracking-[.2em] text-moss">Account</p><h1 className="mt-3 font-display text-5xl">Notifications.</h1><div className="mt-10 divide-y divide-ink/10 rounded-2xl bg-white ring-1 ring-ink/10">{notifications.map((notification) => <div key={notification.id} className={`p-5 ${!notification.readAt ? 'bg-lime/10' : ''}`}><p className="font-semibold">{notification.title}</p><p className="mt-1 text-sm text-ink/60">{notification.message}</p></div>)}{!notifications.length && <p className="p-10 text-center text-ink/50">You are all caught up.</p>}</div></div></main>; }
