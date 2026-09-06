# DriveRent Technical Report

## Overview
DriveRent provides a commercial-style vehicle discovery and rental workflow for customers, with a normalized PostgreSQL domain model designed to support staff operations.

## Objectives and requirements
Customers can browse categorized vehicles, inspect pricing, create authenticated bookings, and review completed rentals. Administrators and staff are represented by explicit roles and have a foundation for vehicle, maintenance, payment, driver, reporting, notification, and audit workflows.

## Architecture
Next.js App Router provides server-rendered pages and REST route handlers. Prisma owns relational access and migrations. Services contain pricing and booking invariants. Tailwind supplies responsive presentation. A signed cookie session avoids exposing credentials to client components.

## Database
The schema includes User, Role, Vehicle, VehicleImage, Category, Booking, Payment, Driver, Maintenance, Review, Notification, and AuditLog. Foreign keys, unique constraints, indexes, enums, timestamps, and cascading behavior protect core relationships.

## Booking workflow
The server validates dates, vehicle status, maintenance windows, driver availability, and overlap with pending, confirmed, or active bookings. Price is recalculated from the stored daily rate. A serializable Prisma transaction creates the booking and its payment record together.

## Security and quality
Passwords are hashed with bcrypt. API responses do not expose password hashes. Zod validates input, authorization is checked server-side, and user bookings are scoped to the authenticated user. Production hardening should add CSRF strategy, rate limiting, email verification, hosted payment integration, and automated tests for concurrent booking requests.

## Deployment and future work
Run PostgreSQL with Docker locally and deploy Next.js with a managed database and object storage. The next product increments are the staff dashboard CRUD surfaces, notification read state, completed-rental review endpoint, chart reporting, and Playwright coverage for the end-to-end booking journey.
