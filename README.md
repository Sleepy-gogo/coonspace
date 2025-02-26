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

# Database (Turso or any other sqlite database)
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

## Admin Panel

For simplicity, the admin panel is currently integrated under the `/admin` route, protected by clerk's middleware.

To access it, you may need to manually modify your account's public metadata to include `role:"admin"` and customize your session token. Don't worry as this is read-only, and cannot be modified by users. Further instructions can be found [here](https://clerk.com/docs/references/nextjs/basic-rbac).

In larger, more scalable applications, it might be preferable to separate the admin panel into its own build, hosted under an `admin.` subdomain. However, for this simple side project, maintaining two separate builds would be a bit overkill.
