# The Elites Solutions Website

A modern, full-stack business website with admin dashboard, multi-language support, and custom analytics.

## 🚀 Features

### Public Website
- ✅ Multi-language support (English, French, Arabic)
- ✅ Dark theme with gold accents
- ✅ Responsive design (mobile-first)
- 🚧 Custom booking system
- 🚧 Contact forms with validation
- 🚧 Portfolio/case studies showcase
- 🚧 Services pages

### Admin Dashboard
- 🚧 Content management (services, projects, blog)
- 🚧 Lead management (inquiries, bookings)
- 🚧 Custom analytics with heatmap visualization
- 🚧 User management (admin/editor roles)
- 🚧 Email automation
- 🚧 SEO settings

### Technical Features
- ✅ Next.js 15 with App Router
- ✅ TypeScript (strict mode)
- ✅ PostgreSQL (structured data) + MongoDB (analytics)
- ✅ Redis caching
- ✅ Drizzle ORM
- 🚧 Auth.js authentication
- ✅ Tailwind CSS + shadcn/ui
- ✅ next-intl for internationalization

**Legend**: ✅ Complete | 🚧 In Progress | ⏳ Planned

---

## 📋 Prerequisites

- Node.js 18+ or 20+
- PostgreSQL 14+
- MongoDB 6+
- Redis 7+
- npm or pnpm

---

## 🛠️ Installation

### 1. Clone and Install Dependencies

\`\`\`bash
cd elites-website
npm install
\`\`\`

### 2. Set Up Environment Variables

Copy the example environment file:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and fill in your values:

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/elites_db"
MONGODB_URI="mongodb://localhost:27017/elites_analytics"
REDIS_URL="redis://localhost:6379"

# Authentication
AUTH_SECRET="your-secure-random-string-here"  # Generate with: openssl rand -base64 32
AUTH_URL="http://localhost:3000"

# Email (choose your provider)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# AI Services (for email automation - Phase 4)
OPENAI_API_KEY="sk-..."
# OR
ANTHROPIC_API_KEY="sk-ant-..."

# Feature Flags
ENABLE_CUSTOM_ANALYTICS="true"
ENABLE_HEATMAP="true"
\`\`\`

### 3. Set Up Databases

**PostgreSQL**:
\`\`\`bash
# Create database
createdb elites_db

# Generate and run migrations
npm run db:generate
npm run db:push
\`\`\`

**MongoDB** (will auto-create on first connection)

**Redis** (no setup needed if running locally)

### 4. Seed Initial Data (Optional)

\`\`\`bash
# Create seed script or manually insert admin user
# TODO: Add seed script
\`\`\`

### 5. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

\`\`\`
elites-website/
├── src/                      # Main source directory
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/         # Multi-language routes
│   │   │   ├── (public)/     # Public pages
│   │   │   └── admin/        # Admin dashboard
│   │   ├── api/              # API routes
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   │
│   ├── components/           # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Layout components
│   │   ├── forms/            # Form components
│   │   └── admin/            # Admin-specific components
│   │
│   ├── db/                   # Database layer
│   │   └── schema/           # Database schemas
│   │       ├── postgres/     # PostgreSQL schemas
│   │       └── mongodb/      # MongoDB schemas (types)
│   │
│   ├── i18n/                 # Internationalization
│   │   ├── routing.ts        # Route configuration
│   │   └── request.ts        # Request handler
│   │
│   ├── lib/                  # Utility functions
│   │   ├── auth/             # Authentication utilities
│   │   ├── database/         # Database connections
│   │   ├── email/            # Email utilities
│   │   └── utils.ts          # Helper functions
│   │
│   ├── locales/              # Translation files
│   │   ├── en/               # English
│   │   ├── fr/               # French
│   │   └── ar/               # Arabic
│   │
│   ├── types/                # TypeScript types
│   └── middleware.ts         # Next.js middleware
│
├── public/                   # Static assets (images, fonts)
├── .env.example              # Environment variables template
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript configuration
```

---

## 🎨 Design System

### Colors

- **Dark Theme**: Black backgrounds (#000000 to #1a1a1a)
- **Gold Accents**: Primary gold (#ffd700), shades for hover/active states
- **Text**: Light gray on dark backgrounds

### Typography

- **Headings**: Montserrat (bold, tracking-tight)
- **Body**: Inter (regular, comfortable line-height)
- **Code**: Fira Code (monospace)

### Components

All components follow the shadcn/ui design system with custom dark/gold theming.

---

## 🗄️ Database Schemas

### PostgreSQL Tables

- **users**: Admin users with roles (admin/editor)
- **services**: Multi-language service offerings
- **projects**: Portfolio case studies
- **inquiries**: Contact form submissions
- **bookings**: Consultation bookings
- **blog_posts**: Blog content (optional)
- **newsletter_subscribers**: Email list

### MongoDB Collections

- **analytics_events**: User events (clicks, pageviews, etc.)
- **heatmap_data**: Aggregated heatmap data
- **visitor_sessions**: Session tracking

---

## 🔐 Authentication

### Roles

- **Admin**: Full access to all features
- **Editor**: Content management only (no user management, no settings)

### Default Credentials

⚠️ **Create your own admin user** - No default credentials for security.

\`\`\`sql
-- Example SQL to create admin user (replace with your secure password hash)
INSERT INTO users (email, password_hash, name, role) VALUES (
  'admin@theelitessolutions.com',
  '$2a$10$your_bcrypt_hash_here',
  'Admin User',
  'admin'
);
\`\`\`

---

## 🌐 Multi-Language Support

Supported languages:
- 🇬🇧 English (en) - Default
- 🇫🇷 French (fr)
- 🇸🇦 Arabic (ar)

### Adding Translations

1. Add translations to `locales/{locale}/common.json`
2. Use `useTranslations` hook in components:

\`\`\`tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations();

  return <h1>{t('nav.home')}</h1>;
}
\`\`\`

---

## 📊 Analytics

### Custom Heatmap

The application includes a custom analytics system that tracks:
- Click positions and heatmap
- Scroll depth
- Page views and duration
- Visitor demographics (location, device, browser)
- Conversion tracking

Data is stored in MongoDB for flexible querying and visualization.

---

## 🚀 Deployment

### Vercel (Recommended for Frontend)

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Hosting

- **PostgreSQL**: Neon, Supabase, or traditional VPS
- **MongoDB**: MongoDB Atlas (free tier available)
- **Redis**: Upstash, Redis Cloud, or VPS

### Environment Variables

Ensure all production environment variables are set:
- Strong AUTH_SECRET (minimum 32 characters)
- Production database URLs
- Email service credentials
- API keys for external services

---

## 📝 Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run db:generate  # Generate database migrations
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Drizzle Studio (database GUI)
\`\`\`

---

## 🔧 Development Workflow

1. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. **Make changes and test**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Run linting and formatting**
   \`\`\`bash
   npm run lint
   npm run format
   \`\`\`

4. **Commit with conventional commits**
   \`\`\`bash
   git commit -m "feat: add booking form validation"
   \`\`\`

5. **Push and create pull request**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

---

## 🐛 Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check PostgreSQL is running: `pg_isready`
- Check MongoDB is running: `mongosh --eval "db.version()"`
- Check Redis is running: `redis-cli ping`

### Translation Not Working

- Verify locale files exist in `locales/{locale}/common.json`
- Check middleware is configured correctly
- Clear Next.js cache: `rm -rf .next`

### Build Errors

- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`
- Verify all dependencies are installed
- Check TypeScript errors: `npx tsc --noEmit`

---

## 📚 Documentation

- [Implementation Progress](./IMPLEMENTATION_PROGRESS.md) - Current development status
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [next-intl Documentation](https://next-intl-docs.vercel.app)

---

## 📄 License

Proprietary - © 2025 The Elites Solutions. All rights reserved.

---

## 🤝 Support

For questions or issues:
- Email: contact@theelitessolutions.com
- Website: https://theelitessolutions.com

---

**Built with ❤️ by The Elites Solutions**
