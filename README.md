# Learning Dashboard

A modern, animated learning platform dashboard built with Next.js, Tailwind CSS, and Framer Motion.

## Project Structure

* `app/page.tsx` - Server Component (fetches data from Supabase)
* `app/layout.tsx` - Root layout with metadata
* `app/globals.css` - Tailwind CSS styles
* `components/HomeClient.tsx` - Client Component (UI & animations)
* `public/` - Static assets

## Features

* Server-side data fetching from Supabase
* Hardcoded fallback data if database fails
* Smooth animations with Framer Motion
* Responsive design (mobile, tablet, desktop)
* Dark mode with gradient accents
* Dynamic course cards with progress bars
* Sidebar navigation with toggle

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Running the App

```bash
npm run dev
```

Open http://localhost:3000

## Tech Stack

* Next.js 16+ (App Router)
* React 19+
* TypeScript
* Tailwind CSS v4
* Framer Motion
* Supabase
* Lucide React Icons

## Architecture

**Server Component (`app/page.tsx`):**
- Fetches course data from Supabase
- Uses hardcoded fallback if connection fails
- Passes data to Client Component

**Client Component (`components/HomeClient.tsx`):**
- Handles all animations and interactivity
- Displays courses, sidebar, progress bars
- Responsive grid layout

## Deployment

This project is deployed on Vercel.

**Live Demo:** https://learning-dashboard-olive.vercel.app


