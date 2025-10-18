'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { CartSummary } from '@/components/cart/CartSummary';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { useCartStore } from '@/lib/store/cart-store';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </Container>
    </div>
  );
}
