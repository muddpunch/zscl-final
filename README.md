# ZSCL

## Development

Requires Node.js 24 or newer. Install dependencies and run the local app:

```bash
npm install
npm run dev
```

The site is available at [http://localhost:3000](http://localhost:3000).

## Admin

Open `/admin`. In local development, use **Pomiń logowanie** for the demo session, or set a password in `.env.local`:

```env
ADMIN_PASSWORD=use-a-long-unique-password
ADMIN_SESSION_SECRET=use-a-different-long-random-secret
```

The demo bypass is disabled in production. Set both secrets and use HTTPS before exposing the site publicly.

## Data

Posts, events and gallery photos are stored in `data/zscl.sqlite`. The database is created automatically on first start; there is no separate database service or setup command. Back up this file to preserve content.

Form definitions and responses also live in SQLite. CSV exports use each field's label as the matching column heading. Image uploads are stored under `public/uploads`; back up this directory together with the database.

This file-backed setup is for local development or a persistent Node.js server. It is not suitable for serverless hosting with ephemeral filesystems.
