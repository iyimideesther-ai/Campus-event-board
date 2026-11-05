# Campus Event Board

Campus Event Board is a responsive event discovery application built with Next.js, React, and Tailwind CSS.

Students can browse campus events, filter by category, search by title, sort by date, view event details, and save events to a personal schedule.

## Features

- Responsive event card grid
- Tech, Sports, Faith, and Social category filters
- Title search and date sorting
- Dynamic event detail routes at `/events/[id]`
- Live countdown on each event detail page
- Saved events with React Context and local storage
- Dedicated My Events page
- Category badges, hover effects, empty states, and not-found handling

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Context API

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Run the production server
npm run lint   # Run ESLint
```

## Project Structure

```text
app/
  events/[id]/page.tsx  # Dynamic event detail route
  my-events/page.tsx    # Saved events page
  page.tsx              # Event discovery home page
components/             # Shared UI components
context/EventContext.tsx
data.js                 # Campus event data
```

## Data

Event content is stored in `data.js`. Each event includes an ID, title, category, date, time, venue, image, and description.

## Saving Events

Saved event IDs are stored in the browser's local storage. This allows My Events to remain available after refreshing the page.

## GitHub Repository

https://github.com/iyimideesther-ai/Campus-event-board

## License

This project is available for educational use.
