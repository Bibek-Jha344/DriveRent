import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Fuel, Gauge, Settings2, Users } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { BookingForm } from '@/components/booking/BookingForm';

export const dynamic = 'force-dynamic';

export default async function CarDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id }, include: { category: true, images: { orderBy: { sortOrder: 'asc' } }, reviews: { include: { user: true }, take: 4, orderBy: { createdAt: 'desc' } } } }).catch(() => null);
  if (!vehicle) notFound();
  const rating = vehicle.reviews.length ? (vehicle.reviews.reduce((sum, review) => sum + review.rating, 0) / vehicle.reviews.length).toFixed(1) : 'New';
  return <main className="min-h-screen px-6 py-12"><div className="mx-auto max-w-7xl"><Link href="/cars" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-moss"><ArrowLeft size={16} /> Back to collection</Link><div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]"><div><div className="h-[420px] overflow-hidden rounded-3xl bg-ink/5">{vehicle.images[0] && <img src={vehicle.images[0].url} alt={vehicle.images[0].alt || vehicle.model} className="h-full w-full object-cover" />}</div><div className="mt-8 flex flex-wrap gap-3">{vehicle.features.map((feature) => <span key={feature} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm ring-1 ring-ink/10"><Check size={15} className="text-moss" /> {feature}</span>)}</div></div><aside className="rounded-3xl bg-moss p-8 text-paper"><p className="text-sm font-bold uppercase tracking-[.2em] text-lime">{vehicle.category.name} · {vehicle.year}</p><h1 className="mt-3 font-display text-5xl">{vehicle.brand} {vehicle.model}</h1><p className="mt-4 text-paper/70">{vehicle.description}</p><div className="mt-8 grid grid-cols-2 gap-4 border-y border-paper/20 py-6 text-sm"><span className="flex items-center gap-2"><Settings2 size={16} /> {vehicle.transmission.toLowerCase()}</span><span className="flex items-center gap-2"><Fuel size={16} /> {vehicle.fuelType.toLowerCase()}</span><span className="flex items-center gap-2"><Users size={16} /> {vehicle.seats} seats</span><span className="flex items-center gap-2"><Gauge size={16} /> {vehicle.mileage.toLocaleString()} km</span></div><div className="mt-7 flex items-end justify-between"><div><span className="font-display text-4xl">₹{vehicle.dailyPrice.toLocaleString('en-IN')}</span><span className="text-paper/60"> / day</span></div><span className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink">{rating} rating</span></div><BookingForm vehicleId={vehicle.id} dailyPrice={vehicle.dailyPrice} /></aside></div></div></main>;
}
