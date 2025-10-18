import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getFeaturedProducts, categories } from '@/lib/data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="space-y-16 py-8">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to ShopHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover amazing products at unbeatable prices. Shop the latest in
              electronics, fashion, books, and home goods.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" variant="secondary">
                  Shop All Products
                </Button>
              </Link>
              <Link href="/products?category=electronics">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Browse Electronics
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-lg border border-gray-200 hover:border-primary-500 transition-all hover:shadow-lg"
              >
                <div className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {category.count} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked items just for you
            </p>
          </div>

          <ProductGrid products={featuredProducts} />

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </section>
      </Container>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600">
                On orders over $100
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600">
                100% secure transactions
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Returns
              </h3>
              <p className="text-gray-600">
                30-day return policy
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
