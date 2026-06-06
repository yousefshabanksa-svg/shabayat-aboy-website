<div align="center">

# شعبيات ابوي — Dad's Delicacies

**Authentic Saudi breakfast restaurant in Qurtubah, Riyadh**

A premium, production-ready restaurant website with an integrated shopping cart and WhatsApp checkout system.

[![Live Site](https://img.shields.io/badge/Live-resturaunt.vercel.app-black?style=for-the-badge&logo=vercel)](https://resturaunt.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

</div>

---

## Overview

شعبيات ابوي (Dad's Delicacies) is a full-featured restaurant website for a Saudi breakfast restaurant in Riyadh. It features a cinematic hero section, interactive menu with tabbed categories, a fully functional shopping cart with quantity management, and WhatsApp-based checkout — all rendered in a premium RTL Arabic layout.

## Features

- **🎨 Premium Design** — Cinematic hero, glassmorphism, smooth animations via Framer Motion
- **🛒 Shopping Cart** — Full add-to-cart flow with quantity controls, live totals, localStorage persistence
- **📱 WhatsApp Checkout** — Cart items formatted as an Arabic order message, sent via wa.me
- **🍳 Interactive Menu** — 5 categories with animated tab switching and category banner images
- **⭐ Testimonials** — Paginated Google review cards with star ratings
- **📍 Location & Map** — Embedded Google Maps, contact info, working hours
- **🌐 RTL Arabic** — Full right-to-left layout with Cairo font
- **📱 Mobile-First** — Responsive across all breakpoints with bottom-sheet modals
- **♿ Accessible** — ARIA labels, keyboard navigation, focus states, reduced-motion support
- **⚡ Static Generation** — Pre-rendered pages for instant load times

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | [TypeScript 5](https://typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animations | [Framer Motion 12](https://motion.dev) |
| Font | [Cairo](https://fonts.google.com/specimen/Cairo) (Google Fonts) |
| Deployment | [Vercel](https://vercel.com) |

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design system — tokens, keyframes, utilities
│   ├── layout.tsx           # Root layout — RTL, CartProvider, metadata
│   └── page.tsx             # Home page — all section components
├── components/
│   ├── ui/
│   │   ├── StarRating.tsx   # Shared star rating display
│   │   └── AnimatedCounter.tsx  # Shared scroll-triggered counter
│   ├── Hero.tsx             # Navbar + hero section
│   ├── MenuBoard.tsx        # Menu categories + item cards
│   ├── OrderModal.tsx       # Add-to-cart quantity selector
│   ├── CartDrawer.tsx       # Slide-out cart panel + WhatsApp checkout
│   ├── WhyChooseUs.tsx      # Story section + stats
│   ├── Testimonials.tsx     # Google review cards
│   ├── CTABanner.tsx        # Call-to-action banner
│   ├── LocationFooter.tsx   # Map, contact, footer
│   └── FloatingWhatsApp.tsx # Fixed WhatsApp button
├── context/
│   └── CartContext.tsx      # Global cart state + localStorage
└── utils/
    └── whatsapp.ts          # WhatsApp URL builder
```

## Shopping Cart Workflow

```
User clicks menu item
  → OrderModal opens (quantity selector)
    → User sets quantity, clicks "أضف إلى السلة"
      → CartContext.addItem() updates global state
        → Cart persisted to localStorage
          → CartDrawer slides open showing items
            → User can adjust quantities or remove items
              → Click "إرسال الطلب عبر واتساب"
                → Formatted Arabic message opens in WhatsApp
                  → Cart cleared automatically
```

## WhatsApp Ordering Workflow

```
Cart checkout triggers message generation:

  السلام عليكم،
  أرغب في طلب:
  1- فول تميس × 2 = 24 ريال
  2- شاي حليب × 3 = 15 ريال
  الإجمالي = 39 ريال
  شكراً.

Message is URL-encoded → opens wa.me/{number}?text={message}
```

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [npm](https://npmjs.com) 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/yousefshabanksa-svg/shabayat-aboy-website.git
cd shabayat-aboy-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

This project is configured for automatic deployment on Vercel:

1. Push to `main` branch triggers automatic production deployment
2. Pull requests create preview deployments
3. No environment variables required — the app is fully static

### Manual Deployment

```bash
npx vercel --prod
```

## License

[MIT](LICENSE) © Yousef Shaban
