# KLOSET - Authentic Luxury Fashion Marketplace

A Next.js marketplace platform for buying and selling authenticated luxury fashion items.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl (es, en, fr, zh)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Payments**: Stripe Connect
- **Fonts**: Fraunces (serif), Outfit (sans-serif), Noto Sans SC (Chinese)

## 📁 Project Structure

```
kloset/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Localized routes
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── explore/        # Product catalog
│   │   │   ├── product/[id]/   # Product detail
│   │   │   ├── sell/           # Sell flow
│   │   │   ├── auth/           # Authentication
│   │   │   └── dashboard/      # User dashboard
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── layout/             # Layout components (Navbar, Footer)
│   │   ├── product/            # Product-specific components
│   │   └── auth/               # Auth components
│   ├── lib/
│   │   ├── supabase/           # Supabase clients
│   │   ├── utils.ts            # Utility functions
│   │   └── stripe.ts           # Stripe integration
│   ├── i18n/                   # i18n configuration
│   ├── types/                  # TypeScript type definitions
│   └── middleware.ts           # Next.js middleware
├── messages/                    # Translation files (es, en, fr, zh)
├── supabase/
│   └── schema.sql              # Database schema
└── public/
```

## 🛠 Setup

1. **Clone the repository**

```bash
git clone https://github.com/mozzistudio/kloset.git
cd kloset
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up Supabase**

- Create a new Supabase project
- Run the SQL schema in `supabase/schema.sql` in the Supabase SQL editor
- Create a storage bucket named `products`

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌍 Internationalization

The app supports 4 locales:
- **Spanish (es)** - Default
- **English (en)**
- **French (fr)**
- **Simplified Chinese (zh)**

All user-facing text is translated using next-intl. Translation files are in `/messages/`.

## 📦 Features

### Current
- ✅ Multi-language support (4 locales)
- ✅ Responsive design
- ✅ Product catalog with filters
- ✅ Product detail pages
- ✅ Multi-step sell flow
- ✅ Authentication pages
- ✅ User dashboard
- ✅ Supabase integration setup

### Coming Soon
- 🔄 Stripe Connect integration
- 🔄 Real-time messaging
- 🔄 Email notifications
- 🔄 Admin panel
- 🔄 Mobile app
- 🔄 SEO optimization
- 🔄 Analytics
- 🔄 WhatsApp integration
- 🔄 Physical authentication workflow
- 🔄 E2E testing
- 🔄 AI features (auto-categorization, price suggestions)
- 🔄 Social features

## 🚢 Deployment

The app is designed to be deployed on Vercel:

```bash
vercel
```

Make sure to set up your environment variables in the Vercel dashboard.

## 📝 License

All rights reserved © 2026 Kloset

## 🤝 Contributing

This is a private project. For questions or support, contact the development team.
