# CoonSpace

A free and open-source platform for sharing markdown notes.

## Features

- 📝 Markdown editor with live preview
- 🎨 Syntax highlighting for code blocks
- 🔗 Shareable links for your notes
- 👤 User authentication via Clerk
- 📊 Analytics with PostHog

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Clerk (Authentication)
- Turso (Database)
- UploadThing (File Storage)
- PostHog (Analytics)

## Development

### Prerequisites

- Node.js 18+
- pnpm
- Clerk account
- Turso database
- UploadThing account
- PostHog account

### Environment Variables

```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_SIGNING_SECRET=

# Database (Turso)
DATABASE_URL=
DATABASE_AUTH_TOKEN=

# File Storage (UploadThing)
UPLOADTHING_TOKEN=

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=`
```

### Getting Started

1. Clone the repository
2. Install dependencies: pnpm install
3. Set up environment variables
4. Run development server: pnpm dev
