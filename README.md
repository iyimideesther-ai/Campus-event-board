# Campus Hub

A campus app for discovering events and booking shared rooms, built with Next.js, React, and Tailwind CSS.

## Features

- Discover campus events from the home page with search, category filters, and date sorting
- View event details, countdowns, and save events to My Events
- Browse rooms at `/rooms` and filter by room name, building, or capacity
- View room details at `/rooms/[id]` and reserve a seat with date and time selection
- Enforce a 4-seat limit per time slot and show remaining seats
- Persist saved events and room bookings in localStorage
- Cancel reservations from My Bookings

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Context API

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:8080 in your browser.

## Routes

- `/` - Event Board
- `/events/[id]` - Event details
- `/my-events` - Saved events
- `/rooms` - Room browser and filters
- `/rooms/[id]` - Room details and booking form
- `/my-bookings` - Your room reservations

## Local development configuration

The app is configured to run on port 8080 by default:

- `npm run dev` → http://localhost:8080
- `npm run start` → http://localhost:8080

## Booking rules

- Each room slot holds up to 4 people
- When a slot reaches capacity, it is marked as fully booked
- Bookings persist in the browser so they remain after a refresh
