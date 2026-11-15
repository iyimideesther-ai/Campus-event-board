# Campus Room Booking

A responsive campus room booking app built with Next.js, React, and Tailwind CSS.

## Features

- Browse rooms across campus on the home page
- Search by room name and filter by building or minimum capacity
- View a detail page for each room and reserve a seat from a booking form
- Choose a date and time slot with seat availability checks
- Enforce a 4-seat limit per slot and block full bookings
- Track bookings in localStorage so they survive refreshes
- Cancel reservations from the My Bookings page
- Empty-state handling for room results and booking history

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

## Local development configuration

The app is configured to run on port 8080 by default:

- `npm run dev` → http://localhost:8080
- `npm run start` → http://localhost:8080

## Booking rules

- Each room slot holds up to 4 people
- When a slot reaches capacity, it is marked as fully booked
- Bookings persist in the browser so they remain after a refresh
