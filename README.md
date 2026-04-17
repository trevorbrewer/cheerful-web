# 🌱 Cheerful

> Make life full.

Cheerful is a round-up giving app that lets users link a card and automatically
donate their spare change to a nonprofit of their choice — every single purchase.

## Live Demo

[cheerful-web.vercel.app](https://cheerful-web.vercel.app)

## Features

- **Round-up giving** — every purchase rounds up to the nearest dollar
- **1.5M+ nonprofits** — search and browse via the Every.org API
- **Secure card linking** — powered by Plaid with read-only access
- **Monthly payouts** — automated donations sent on the 1st of each month
- **Donation receipts** — beautiful email receipts via Resend
- **Admin dashboard** — internal metrics for users, cards, and donations
- **Full auth flow** — signup, login, onboarding, and protected routes

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Auth & Database | Supabase (Postgres + RLS) |
| Card Linking | Plaid |
| Charity Data & Giving | Every.org API |
| Email | Resend |
| Analytics | PostHog |
| Deployment | Vercel |
| Cron Jobs | Vercel Cron |

## Architecture

- **`src/app/(marketing)`** — public landing, legal pages
- **`src/app/(auth)`** — login and signup
- **`src/app/(onboarding)`** — 3-step onboarding flow
- **`src/app/(dashboard)`** — protected user dashboard
- **`src/app/admin`** — admin-only overview
- **`src/app/api`** — Plaid sync, payout, and webhook routes
- **`src/lib`** — Supabase, Plaid, Every.org, email, and analytics helpers
- **`src/components`** — reusable UI, layout, dashboard, charity, and admin components

## Getting Started

```bash
npm install
npm run dev
```

### Required Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_EVERY_ORG_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
CRON_SECRET=
RESEND_API_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Status

✅ v1.0 — Beta launch

## License

MIT
