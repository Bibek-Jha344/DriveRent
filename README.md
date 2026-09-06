# DriveRent

DriveRent is a full-stack car rental management system built with Next.js App Router, TypeScript, Prisma, PostgreSQL, Tailwind CSS, and REST route handlers.

## Quick start

1. Copy `.env.example` to `.env` and set `AUTH_SECRET`.
2. Start PostgreSQL with `docker compose up -d`.
3. Install dependencies with `npm install`.
4. Generate Prisma Client and create tables: `npm run db:generate` then `npm run db:push`.
5. Load demo data with `npm run db:seed`.
6. Start the app with `npm run dev` and open `http://localhost:3000`.

Demo accounts use password `DriveRent@2026`: `admin@driverent.com` and `customer@driverent.com`. These are development-only credentials.

## Architecture

Server components read through Prisma. Business rules live in `src/services`, with booking conflict prevention executed in a serializable transaction. Signed HTTP-only session cookies are handled in `src/lib/auth.ts`; API input is validated with Zod. Vehicle browsing is database-backed and paginated through `GET /api/cars`. Booking creation is `POST /api/bookings`.

## Commands

`npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint`, `npm run db:generate`, `npm run db:push`, `npm run db:seed`.

Never commit `.env`. For production, replace the demo payment provider with a hosted provider, use a managed PostgreSQL instance, rotate `AUTH_SECRET`, configure object storage for vehicle images, and add automated browser and integration tests around authorization and booking races.
