# Opura Admin Dashboard

This is a [Next.js](https://nextjs.org) project that provides an admin interface for managing the Opura chatbot platform. It connects to a Node.js backend API for authentication and data management.

## Prerequisites

- Node.js 18+ and npm
- A running Node.js backend API (default: `http://localhost:4000`)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment (Optional)

For local development with default settings (backend on port 4000), no configuration needed!

If your backend runs on a different port:

```bash
# Create .env.local
cp .env.local.example .env.local

# Edit .env.local and change the port
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Configuration

This project uses different environment files for different scenarios:

- **`.env.development`** - Used during `npm run dev` (default: `http://localhost:4000`)
- **`.env.production`** - Used during `npm run build` (update this for production deployments)
- **`.env.local`** - Personal overrides (gitignored, optional)

### Quick Setup Examples

**Default (backend on port 4000):**
```bash
npm run dev  # No setup needed!
```

**Backend on different port:**
```bash
echo "NEXT_PUBLIC_BASE_URL=http://localhost:5000" > .env.local
npm run dev
```

**Connect to remote API:**
```bash
echo "NEXT_PUBLIC_BASE_URL=https://dev-api.yourdomain.com" > .env.local
npm run dev
```

📖 **Detailed Guide:** See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for complete documentation.

## Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── frontend/(admin)/    # Admin pages
│   └── backend/api/         # API routes (proxied)
├── components/              # React components
│   ├── admin-config/       # Configuration UI
│   ├── auth/              # Authentication forms
│   ├── dashboard/         # Dashboard widgets
│   └── ui/                # Reusable UI components
├── lib/
│   └── api.ts            # Central API configuration & JWT handling
└── config/               # Configuration schemas
```

## Key Features

- **Centralized API Configuration:** All API calls use `src/lib/api.ts`
- **JWT Authentication:** Automatic token management for authenticated requests
- **Environment-based URLs:** Easy switching between dev/staging/production
- **TypeScript:** Full type safety
- **Tailwind CSS:** Utility-first styling with dark mode support
- **Biome:** Fast linting and formatting

## Available Scripts

```bash
npm run dev       # Start development server with Turbopack
npm run build     # Build for production with Turbopack
npm start         # Start production server
npm run lint      # Run Biome linter
npm run format    # Format code with Biome
```

## Authentication

The app expects a Node.js backend with the following endpoint:

**Login:** `POST /api/users/login`
```json
// Request
{
  "email": "user@example.com",
  "password": "password"
}

// Response
{
  "token": "jwt-token-here"
}
```

All subsequent API calls automatically include the JWT token in the `Authorization` header.

## API Integration

The frontend connects to your Node.js backend API. All API calls are centralized in `src/lib/api.ts`:

```typescript
import { apiFetch } from '@/lib/api';

// Authenticated request (JWT token auto-included)
const response = await apiFetch('/api/endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

📖 **API Guide:** See [API_CONFIGURATION.md](./API_CONFIGURATION.md) for detailed API integration docs.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
