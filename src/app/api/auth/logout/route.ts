import { NextResponse } from 'next/server';
export async function POST() { const response = NextResponse.json({ data: true }); response.cookies.delete('driverent_session'); return response; }
