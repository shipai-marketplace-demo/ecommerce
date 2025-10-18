'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCartStore } from '@/lib/store/cart-store';

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="py-16">
        <Container size="md">
          <div className="text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">
              Add some products to get started
            </p>
            <Link href="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cart Items ({items.length})
              </h2>
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </Container>
    </div>
  );
}
