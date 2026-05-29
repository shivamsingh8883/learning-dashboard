
### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/page.tsx` - Main dashboard component
- `app/layout.tsx` - Root layout
- `public/` - Static assets

## Key Implementation Details

### Server Components vs Client Components
- Used client components (`'use client'`) for real-time data fetching with `useEffect`
- Supabase client initialized in the component for secure API access

### Animation Strategy
- **Stagger Animation:** Tiles animate in sequence with spring physics
- **Hover Effects:** Cards scale and elevate on interaction
- **Progress Bars:** Animated from 0% to actual progress value

### Responsive Design
- Sidebar toggles on mobile
- Grid adapts: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- Smooth transitions on all size changes

## Live Demo

[View Dashboard](https://learning-dashboard-4tj6.vercel.app/)

## Author

Shivam Singh

## License

MIT