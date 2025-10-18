import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { CartBadge } from './CartBadge';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="text-2xl font-bold text-gray-900">ShopHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              href="/products?category=electronics"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Electronics
            </Link>
            <Link
              href="/products?category=clothing"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Clothing
            </Link>
            <Link
              href="/products?category=books"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Books
            </Link>
            <Link
              href="/products?category=home-garden"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home & Garden
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <CartBadge />
          </div>
        </div>
      </Container>
    </header>
  );
}
