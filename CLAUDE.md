# CLAUDE.md - ShopHub E-commerce Project

> Project-specific instructions for Claude Code when working in this Next.js e-commerce codebase.

---

## Project Overview

**ShopHub** - A production-ready e-commerce store built with Next.js 15, TypeScript, and Tailwind CSS.

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **Package Manager:** pnpm

---

## Architecture & Patterns

### Directory Structure

```
app/                          # Next.js App Router pages
├── layout.tsx               # Root layout (header/footer)
├── page.tsx                 # Homepage
├── products/                # Product pages
├── cart/                    # Shopping cart
├── checkout/                # Checkout flow
└── order-confirmation/      # Order success

components/
├── ui/                      # Reusable UI primitives
├── layout/                  # Layout components (Header, Footer, etc.)
├── product/                 # Product-specific components
├── cart/                    # Cart-specific components
└── checkout/                # Checkout-specific components

lib/
├── data/products.ts         # Hardcoded product inventory (27 products)
├── store/cart-store.ts      # Zustand cart state with localStorage
└── utils/                   # Helper functions (formatting, etc.)

types/
└── index.ts                 # Shared TypeScript types
```

### Key Architectural Decisions

1. **Server vs Client Components**
   - Product pages use Server Components for SEO
   - Cart and interactive features use Client Components ('use client')
   - Always check if a component needs interactivity before adding 'use client'

2. **State Management**
   - Cart state: Zustand with localStorage persistence
   - Form state: React Hook Form
   - No global state beyond cart

3. **Data Layer**
   - All products hardcoded in `lib/data/products.ts`
   - No backend/API - this is a frontend-only demo
   - Cart persists to localStorage only

4. **Styling Conventions**
   - Tailwind utility classes only (no CSS modules)
   - Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
   - Custom colors in `tailwind.config.ts` (primary-* scale)

---

## Development Workflow

### Commands

```bash
# Development
pnpm dev              # Start dev server on localhost:3000

# Build & Production
pnpm build           # Production build
pnpm start           # Run production build locally
pnpm type-check      # TypeScript checking

# Linting (use Next.js built-in)
pnpm lint            # ESLint check
```

### Before Making Changes

1. **Read existing code first** - Understand patterns before modifying
2. **Check component location** - UI primitives go in `components/ui/`
3. **Verify Server vs Client** - Don't add 'use client' unnecessarily
4. **Test product data** - Use existing products from `lib/data/products.ts`

### Making Changes

**Adding New Features:**
- Create components in appropriate directory
- Follow existing naming conventions (PascalCase for components)
- Use TypeScript interfaces from `types/index.ts`
- Match existing Tailwind patterns

**Modifying Products:**
- Edit `lib/data/products.ts`
- Keep product structure consistent (id, name, description, price, image, category, stock, featured)
- Categories: 'electronics' | 'clothing' | 'books' | 'home-garden'

**Styling Changes:**
- Use Tailwind utilities (no inline styles)
- Follow responsive patterns: `className="text-sm md:text-base lg:text-lg"`
- Use semantic color names: `text-primary-600`, `bg-gray-100`

---

## Code Conventions

### TypeScript

- **Strict mode enabled** - All types must be explicit
- **No `any`** - Use proper types or `unknown`
- **Interface over type** - Use `interface` for object shapes
- **Export types** - All shared types in `types/index.ts`

### Components

```typescript
// ✅ Good - Server Component (default)
export default function ProductPage() {
  return <div>...</div>
}

// ✅ Good - Client Component (when needed)
'use client';
export function CartBadge() {
  const count = useCartStore(state => state.getItemCount());
  return <span>{count}</span>
}

// ❌ Bad - Unnecessary 'use client'
'use client';
export function StaticContent() {
  return <div>Static text</div>  // No interactivity needed!
}
```

### File Naming

- **Components:** PascalCase - `ProductCard.tsx`, `CartSummary.tsx`
- **Utilities:** camelCase - `format.ts`, `cart-store.ts`
- **Pages:** lowercase - `page.tsx`, `[id]/page.tsx`

### Import Order

```typescript
// 1. External dependencies
import { useState } from 'react';
import Image from 'next/image';

// 2. Internal components
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// 3. Utils & data
import { formatPrice } from '@/lib/utils/format';
import { products } from '@/lib/data/products';

// 4. Types
import { Product, CartItem } from '@/types';
```

---

## Key Files Reference

### Product Data
**Location:** `lib/data/products.ts`
- 27 products across 4 categories
- Helper functions: `getFeaturedProducts()`, `getProductById()`, `searchProducts()`
- **Do not delete products** - only add or modify

### Cart Store
**Location:** `lib/store/cart-store.ts`
- Zustand store with localStorage persistence
- Key methods: `addItem()`, `removeItem()`, `updateQuantity()`, `clearCart()`, `getTotal()`
- **Do not modify store structure** - breaking changes affect localStorage

### Type Definitions
**Location:** `types/index.ts`
- Core types: `Product`, `CartItem`, `Category`, `CheckoutFormData`, `Order`
- **Add new types here** - do not create separate type files

### Utilities
**Location:** `lib/utils/`
- `format.ts` - Price formatting, tax/shipping calculations
- `cn.ts` - Tailwind class merging utility

---

## Common Tasks

### Adding a New Product

```typescript
// In lib/data/products.ts
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Detailed description...',
  price: 99.99,
  image: 'https://images.unsplash.com/...',
  category: 'electronics', // or 'clothing', 'books', 'home-garden'
  stock: 50,
  featured: false,
  rating: 4.5,
  reviews: 100,
}
```

### Adding a New UI Component

```typescript
// components/ui/NewComponent.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface NewComponentProps {
  children: ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
}

export function NewComponent({
  children,
  variant = 'default',
  className
}: NewComponentProps) {
  return (
    <div className={cn('base-styles', variant === 'primary' && 'primary-styles', className)}>
      {children}
    </div>
  );
}
```

### Modifying the Checkout Form

**Location:** `components/checkout/CheckoutForm.tsx`
- Uses React Hook Form with Zod validation
- Schema defined inline with `z.object()`
- **Add fields to both schema and form JSX**

### Changing Tax/Shipping Calculations

**Location:** `lib/utils/format.ts`
- `calculateTax()` - Default 8% tax rate
- `calculateShipping()` - Free over $100, $5.99 over $50, else $9.99
- Used in `CartSummary` and checkout flow

---

## Testing & Validation

### Before Committing

```bash
# 1. Type check
pnpm type-check

# 2. Build test
pnpm build

# 3. Lint
pnpm lint
```

### Manual Testing Checklist

- [ ] Homepage loads with featured products
- [ ] Product search works
- [ ] Category filtering works
- [ ] Product detail page displays correctly
- [ ] Add to cart updates badge count
- [ ] Cart page shows items and totals
- [ ] Quantity updates work
- [ ] Remove from cart works
- [ ] Checkout form validation works
- [ ] Order confirmation page displays
- [ ] Cart persists after browser refresh

---

## Deployment

### Vercel Deployment

This project is optimized for Vercel:

```bash
# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

**Configuration:** `vercel.json` includes build settings

### Environment Variables

**None required** - This is a fully client-side app with hardcoded data.

### Build Output

- Static pages: `/`, `/cart`, `/checkout`, `/order-confirmation`, `/not-found`
- Dynamic pages: `/products`, `/products/[id]`
- First Load JS: ~105-135 kB (optimized)

---

## Known Limitations & Future Enhancements

### Current Limitations

1. **No backend** - All data is hardcoded
2. **No authentication** - No user accounts
3. **No real payments** - Checkout is simulated
4. **No order history** - Orders not persisted
5. **No product variants** - Single SKU per product

### Potential Enhancements

- User authentication (NextAuth.js)
- Backend API (Next.js API routes or separate service)
- Database integration (PostgreSQL, MongoDB)
- Real payment processing (Stripe, PayPal)
- Product reviews system
- Wishlist functionality
- Order tracking
- Admin dashboard
- Product variants (sizes, colors)
- Advanced filtering (price range, ratings)

---

## Troubleshooting

### Build Errors

**Type errors:** Check `types/index.ts` for missing exports

**Lint errors:** Apostrophes must be escaped as `&apos;` in JSX

**Image errors:** Ensure `next.config.ts` includes image domain in `remotePatterns`

### Runtime Errors

**Cart not persisting:** Check localStorage is enabled in browser

**Hydration errors:** Server/client mismatch - ensure 'use client' is used for components with `useState`, `useEffect`, or Zustand

**404 on product pages:** Product ID must match exactly (case-sensitive)

### Development Issues

**Port 3000 in use:** Kill existing process or use different port: `pnpm dev -- -p 3001`

**Slow build:** Clear `.next` folder: `rm -rf .next`

**Type checking slow:** This is normal for TypeScript in strict mode

---

## Code Quality Standards

### Do's ✅

- Use TypeScript interfaces for all component props
- Use Tailwind utilities for all styling
- Follow Server/Client component best practices
- Keep components focused and single-responsibility
- Use semantic HTML elements
- Include alt text for images
- Add ARIA labels for interactive elements
- Use Next.js `<Link>` for navigation
- Use Next.js `<Image>` for images
- Validate forms with Zod schemas

### Don'ts ❌

- Don't use CSS modules or styled-components
- Don't use `any` type
- Don't create new global state stores
- Don't modify the cart store structure
- Don't remove existing products
- Don't add 'use client' without reason
- Don't inline complex logic in components
- Don't forget to escape apostrophes in JSX
- Don't use relative imports (use `@/` alias)
- Don't commit console.logs

---

## Getting Help

### Documentation

- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
- Zustand: https://docs.pmnd.rs/zustand
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev

### Project README

See `README.md` for:
- Project overview
- Installation instructions
- Features list
- Tech stack details

---

## Quick Reference

### Product Categories
- `electronics` - Electronics & Tech
- `clothing` - Fashion & Apparel
- `books` - Books & Media
- `home-garden` - Home & Garden

### Color Palette
- Primary: `primary-{50-950}` (blue scale)
- Gray: `gray-{50-950}`
- Semantic: `red-*` (danger), `green-*` (success), `yellow-*` (warning)

### Breakpoints
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

### Common Patterns

**Button:** `<Button variant="primary" size="lg">Text</Button>`

**Card:** `<Card hover className="p-6">Content</Card>`

**Container:** `<Container size="xl">Content</Container>`

**Badge:** `<Badge variant="success">New</Badge>`

**Input:** `<Input label="Email" error={errors.email?.message} />`

---

*Last updated: Initial project creation*
