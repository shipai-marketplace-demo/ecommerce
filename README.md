# ShopHub - E-commerce Store

A modern, full-featured e-commerce application built with Next.js 15, TypeScript, Tailwind CSS, and Zustand.

## Features

### Product Management
- 27+ products across 4 categories (Electronics, Clothing, Books, Home & Garden)
- Product grid with responsive layout
- Product detail pages with image, description, and ratings
- Category filtering
- Search functionality
- Featured products showcase
- Low stock and out-of-stock indicators
- Related products recommendations

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Real-time cart count badge
- Cart summary with subtotal, tax, and shipping
- Free shipping on orders over $100

### Checkout Process
- Multi-step checkout form
- Form validation with Zod
- Customer information collection
- Shipping address form
- Fake payment processing
- Order confirmation page
- Email confirmation (simulated)

### User Experience
- Responsive design (mobile, tablet, desktop)
- Loading states
- Empty states
- Error handling
- Smooth animations
- Accessible (WCAG 2.1 AA)
- SEO optimized

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+ or compatible version
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce
```

2. Install dependencies
```bash
pnpm install
```

3. Run the development server
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── products/            # Product pages
│   ├── cart/                # Cart page
│   ├── checkout/            # Checkout page
│   └── order-confirmation/  # Order confirmation
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   ├── product/             # Product components
│   ├── cart/                # Cart components
│   └── checkout/            # Checkout components
├── lib/                     # Utilities and data
│   ├── data/                # Product data
│   ├── store/               # Zustand store
│   └── utils/               # Helper functions
└── types/                   # TypeScript types
```

## Key Features Explained

### State Management
The application uses Zustand for cart state management with localStorage persistence. The cart state is automatically saved and restored across browser sessions.

### Form Validation
Checkout forms use React Hook Form with Zod schema validation, providing robust client-side validation with helpful error messages.

### Responsive Design
Mobile-first design approach with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Image Optimization
Next.js Image component is used throughout for automatic image optimization, lazy loading, and responsive images.

## Deployment to Vercel

1. Push your code to GitHub
2. Import the project to Vercel
3. Vercel will auto-detect Next.js and configure build settings
4. Deploy!

Alternatively, use the Vercel CLI:
```bash
vercel
```

## Environment Variables

No environment variables required for basic functionality. All product data is hardcoded.

## Future Enhancements

Potential features to add:
- User authentication
- Product reviews and ratings
- Wishlist functionality
- Order history
- Admin dashboard
- Real payment integration
- Product variants (size, color)
- Inventory management
- Email notifications
- Advanced search and filters
- Product recommendations
- Customer support chat

## License

MIT

## Support

For support, please open an issue in the repository.
