import { Metadata } from 'next';
import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/product/ProductGrid';
import { CategoryFilter } from '@/components/product/CategoryFilter';
import { SearchBar } from '@/components/product/SearchBar';
import { products, getProductsByCategory, searchProducts } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'All Products - ShopHub',
  description: 'Browse our complete collection of products across all categories.',
};

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ProductsList({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const search = typeof params.search === 'string' ? params.search : undefined;

  let filteredProducts = products;

  if (search) {
    filteredProducts = searchProducts(search);
  } else if (category) {
    filteredProducts = getProductsByCategory(category);
  }

  const title = search
    ? `Search results for "${search}"`
    : category
    ? `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' & ')} Products`
    : 'All Products';

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="mb-8">
        <CategoryFilter />
      </div>

      <ProductGrid products={filteredProducts} />
    </>
  );
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="py-8">
      <Container>
        <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
          <ProductsList searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}
