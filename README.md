<h1 align="center">CoonSpace✨📝</h1>

<p align="center">A free and open-source platform for sharing markdown notes instantly. Simply drag and drop your markdown files, get a permalink, and share with anyone.</p>

![CoonSpace Banner](https://i.postimg.cc/pr3DzjLw/109shots-so.png)


## 🚀 Features

- **Drag & Drop** - Upload markdown files with a simple drag and drop
- **Instant Sharing** - Get a permalink immediately to share with anyone
- **Syntax Highlighting** - Beautiful code block highlighting for 100+ languages
- **Custom Slugs** - Create memorable URLs for your important documents
- **Dark Mode** - Easy on the eyes, perfect for developers
- **Mobile Friendly** - View and share on any device

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Clerk** - Authentication and user management
- **Turso** - SQLite database for edge computing
- **UploadThing** - File storage and management
- **PostHog** - Privacy-friendly analytics
- **Upstash** - Rate limiting to prevent abuse

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- bun (recommended) or pnpm/npm/yarn
- Accounts for the following services:
  - [Clerk](https://clerk.dev) (Authentication)
  - [Turso](https://turso.tech) (Database)
  - [UploadThing](https://uploadthing.com) (File Storage)
  - [PostHog](https://posthog.com) (Analytics)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sleepy-gogo/coonspace.git
   cd coonspace
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your service credentials:
   - Clerk API keys
   - Turso database URL and auth token
   - UploadThing API keys
   - PostHog project API key (optional)

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** to see the app running

## 👨‍💻 Admin Panel

For simplicity, the admin panel is integrated under the `/admin` route, protected by Clerk's middleware.

To access it, you need to:

1. Sign in with your account
2. Modify your account's public metadata to include `role:"admin"`
3. This can be done through the Clerk dashboard:
   - Go to User Management
   - Select your user
   - Add public metadata object with `role:"admin"`

For larger applications, a separate admin panel under an `admin.` subdomain would be preferable, but for this project, the integrated approach is simpler to maintain.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

More than a Note taking app, CoonSpace it a tool to quickly share any type of markdown file, whether it's code snippets, documentation, or notes, CoonSpace makes sharing markdown as simple as possible.

The project is and will always remain:
- **100% Free** - No premium tiers or hidden costs
- **Open Source** - Transparent and community-driven

Built with ❤️ by [sleepy-gogo](https://github.com/sleepy-gogo)
