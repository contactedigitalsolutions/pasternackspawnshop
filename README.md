# Pasternack Pawn — Demo (GitHub + Vercel)

Click-through demo with Broncos theme, Craigslist CTAs, Booking section, and demo mode (no real submissions).

## Quick Start
1) `npm install`
2) Copy `.env.example` → `.env.local` (keep `NEXT_PUBLIC_DEMO=true`)
3) `npm run dev`

## Deploy to Vercel
- Push this folder to a new GitHub repo (e.g. `pasternackpawn-demo`)
- Import the repo in Vercel → Deploy
- Share the preview URL with client

## Move to Production later
- Set `NEXT_PUBLIC_DEMO=false`
- Add HubSpot/Stripe/Calendly env vars in Vercel
- Replace phone/address and Craigslist URL in `app/page.tsx`
