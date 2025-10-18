'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice, calculateTotal } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function CartSummary() {
  const subtotal = useCartStore((state) => state.getTotal());
  const { tax, shipping, total } = calculateTotal(subtotal);

  return (
    <Card className="p-6 sticky top-20">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">FREE</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        {subtotal > 0 && subtotal < 100 && (
          <p className="text-sm text-primary-600">
            Add {formatPrice(100 - subtotal)} more for free shipping!
          </p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Link href="/checkout">
        <Button fullWidth size="lg" disabled={subtotal === 0}>
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/products">
        <Button fullWidth variant="outline" className="mt-3">
          Continue Shopping
        </Button>
      </Link>
    </Card>
  );
}
