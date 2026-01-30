# ⚡ QUICK START GUIDE

Get up and running in **5 minutes**!

---

## 🏃‍♂️ Super Fast Setup

### 1. Install Everything (2 minutes)

```bash
cd elites-website
npm install
```

Wait for ~500MB of dependencies to download...

---

### 2. Create Environment File (1 minute)

```bash
cp .env.example .env.local
```

**For Quick Testing** (minimal setup), edit `.env.local`:

```env
# Minimal config to get started
DATABASE_URL="postgresql://localhost:5432/elites_db"
MONGODB_URI="mongodb://localhost:27017/elites_analytics"
REDIS_URL="redis://localhost:6379"
AUTH_SECRET="your-secret-here-change-in-production"
AUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

---

### 3. Start Development Server (1 minute)

```bash
npm run dev
```

Visit: **http://localhost:3000**

You should see:
- ⬛ Black background
- 💛 Gold "The Elites Solutions" text
- 📱 Responsive layout

---

## 🎉 IT WORKS!

If you see the homepage with dark theme and gold text, you're ready to start building!

---

## 🔧 Next Steps

### If You Want to Use Databases

#### Option A: Use Docker (Recommended)

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: elites_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

Then run:
```bash
docker-compose up -d
npm run db:push
```

#### Option B: Use Hosted Services (No Local Setup)

**PostgreSQL**: [Neon](https://neon.tech) (Free tier)
**MongoDB**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier)
**Redis**: [Upstash](https://upstash.com) (Free tier)

Update your `.env.local` with the connection strings from these services.

---

### Option C: Skip Databases for Now

Just start building the UI! The site will work without databases for:
- Homepage
- About page
- Static content

You can add databases later when you need:
- Contact forms
- Admin dashboard
- User authentication

---

## 🎨 Start Building

### Create Your First Component

```bash
# components/hero.tsx
export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="heading-1 text-gold-gradient">
          Run Your Business Smoother
        </h1>
        <p className="text-xl text-gray-300 mt-4">
          Custom websites & software built for YOUR business.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <button className="bg-gold-100 text-black px-8 py-3 rounded-lg font-semibold hover:bg-gold-200">
            Yes, I Want That
          </button>
          <button className="border border-gold-100 text-gold-100 px-8 py-3 rounded-lg font-semibold hover:bg-gold-100/10">
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
```

Use it in `app/page.tsx`:

```tsx
import { Hero } from '@/components/hero';

export default function HomePage() {
  return <Hero />;
}
```

Refresh the page - see your new hero section!

---

## 🌐 Test Multi-Language

Visit:
- http://localhost:3000/en (English)
- http://localhost:3000/fr (French)
- http://localhost:3000/ar (Arabic)

All translations are in `locales/{locale}/common.json`

---

## 🚨 Common Issues

### "npm install" fails
**Try**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Port 3000 in use
**Try**: `npx kill-port 3000` or use different port: `npm run dev -- --port 3001`

### TypeScript errors
**Try**: Delete `.next` folder: `rm -rf .next` and restart dev server

### Can't connect to database
**Skip databases for now** - just build the UI. Add databases later.

---

## 📚 Learn More

- **README.md** - Full documentation
- **WAKE_UP_SUMMARY.md** - What was built
- **IMPLEMENTATION_PROGRESS.md** - Detailed progress

---

## ✅ Checklist

- [ ] Ran `npm install`
- [ ] Created `.env.local`
- [ ] Started dev server with `npm run dev`
- [ ] Saw the homepage at http://localhost:3000
- [ ] Saw dark theme with gold text
- [ ] Ready to start building!

---

**You're all set! Start building amazing things! 🚀**
