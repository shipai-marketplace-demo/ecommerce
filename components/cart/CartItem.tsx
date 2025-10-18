'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200">
      <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.product.image}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="flex-1">
          <Link
            href={`/products/${item.product.id}`}
            className="font-semibold text-gray-900 hover:text-primary-600"
          >
            {item.product.name}
          </Link>
          <p className="text-sm text-gray-600 mt-1">
            {formatPrice(item.product.price)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
              disabled={item.quantity >= item.product.stock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="text-right min-w-[5rem]">
            <p className="font-bold text-gray-900">
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => removeItem(item.product.id)}
            aria-label="Remove item"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
