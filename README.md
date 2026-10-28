# Timberline Homes — timber-frame builder website template
React 18 + Vite 5 + React Router 6, plain CSS, optional Supabase. Runs with zero setup in demo mode (localStorage).

## Quick start
`npm ci && npm run dev` — leave `.env` empty for demo mode.

## Go live with Supabase
1. Create a project. 2. Run `npm run build:sql`, paste `supabase/setup.sql` into the SQL Editor. 3. Put Project URL + anon key in `.env` (never the service_role key). 4. First account to sign up becomes admin. 5. Disable "Allow new users to sign up".

## Deploy to Vercel
Import the repo, add env vars BEFORE deploying, redeploy after changes, set the Supabase Site URL to your domain.

## Content
All text/images live in `src/lib/defaults.js` (sections + collections). Add a field there, then use it in a page and rerun `build:sql`.

## Not yet included
Admin dashboard (`/admin`), blog/detail pages, Playwright tests. Demo photos are from Unsplash — replace before selling.
