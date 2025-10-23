'use client';

import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/ProductGrid';
import { CategoryFilter } from '@/components/product/CategoryFilter';
import { SearchBar } from '@/components/product/SearchBar';
import { useProducts } from '@/lib/hooks/useProducts';

export function ProductsPageContent() {
  const searchParams = useSearchParams();
  const category = searchParams?.get('category') || undefined;
  const search = searchParams?.get('search') || undefined;

  const {
    products: filteredProducts,
    isLoading,
  } = useProducts({
    category,
    search,
    includeMixedbread: true,
  });

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

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading products from Mixedbread...</p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </>
  );
}
