# KEN (Single Folder Next.js App)

KEN now runs fully inside Next.js (frontend + auth API in one project).

## Included auth API routes

- `GET /sanctum/csrf-cookie`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/google/redirect`
- `GET /api/v1/auth/google/callback`

## Setup

1. Copy env:
   - `cp .env.local.example .env.local`
2. Set required values in `.env.local`:
   - `NEXT_PUBLIC_APP_URL=http://localhost:3000`
   - `AUTH_SECRET=<long-random-secret>`
3. For Google login, add:
   - `GOOGLE_CLIENT_ID=...`
   - `GOOGLE_CLIENT_SECRET=...`
4. Start app:
   - `npm run dev`

## Google OAuth localhost config

In Google Cloud Console OAuth app:

- **Authorized JavaScript origin**: `http://localhost:3000`
- **Authorized redirect URI**: `http://localhost:3000/api/v1/auth/google/callback`

Without those values, Google login is expected to fail.
