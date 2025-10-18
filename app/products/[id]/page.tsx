'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useCartStore } from '@/lib/store/cart-store';
import { getProductById, products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils/format';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-8">
      <Container>
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-primary-600">
            Products
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-primary-600"
          >
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1).replace('-', ' & ')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <div className="mb-4">
              {product.featured && <Badge variant="info" className="mb-2">Featured</Badge>}
              {product.stock < 10 && product.stock > 0 && (
                <Badge variant="warning" className="mb-2 ml-2">
                  Only {product.stock} left!
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="error" className="mb-2">
                  Out of Stock
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating!)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 fill-current'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
            </div>

            <Card className="p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </Card>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-6 py-2 border-x border-gray-300 min-w-[4rem] text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addedToCart}
                size="lg"
                className="flex-1"
              >
                {addedToCart ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-2 text-sm text-gray-600">
              <p>
                <strong>Category:</strong>{' '}
                <Link
                  href={`/products?category=${product.category}`}
                  className="text-primary-600 hover:underline"
                >
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1).replace('-', ' & ')}
                </Link>
              </p>
              <p>
                <strong>Stock:</strong> {product.stock} available
              </p>
              <p>
                <strong>SKU:</strong> {product.id.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <Card hover className="h-full">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-primary-600">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
