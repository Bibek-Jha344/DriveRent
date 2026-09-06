import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'DriveRent | Your Journey. Your Car. Your Freedom.', description: 'A considered car rental experience for every kind of journey.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><header className="border-b border-ink/10 bg-paper/90 backdrop-blur"><nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"><Link href="/" className="font-display text-2xl font-bold tracking-tight">Drive<span className="text-moss">Rent</span><span className="ml-1 text-lime">.</span></Link><div className="flex items-center gap-6 text-sm font-semibold"><Link href="/cars" className="hover:text-moss">Browse cars</Link><Link href="/dashboard" className="rounded-full bg-ink px-5 py-2.5 text-paper hover:bg-moss">Dashboard</Link></div></nav></header>{children}</body></html>; }
