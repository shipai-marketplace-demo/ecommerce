import { useMemo } from 'react';
import { products as hardcodedProducts } from '@/lib/data/products';
import { useMixedbreadProducts } from './useMixedbreadProducts';
import type { Product } from '@/types';

interface UseProductsOptions {
  category?: string;
  search?: string;
  includeMixedbread?: boolean;
}

/**
 * Hook to get products from both hardcoded data and Mixedbread store
 */
export function useProducts(options: UseProductsOptions = {}) {
  const { category, search, includeMixedbread = true } = options;

  // Fetch Mixedbread products if enabled
  const {
    products: mixedbreadProducts,
    isLoading: isMixedbreadLoading,
    error: mixedbreadError,
  } = useMixedbreadProducts({
    enabled: includeMixedbread,
    query: search || '',
  });

  // Merge and filter products
  const mergedProducts = useMemo(() => {
    let allProducts: Product[] = [...hardcodedProducts];

    // Add Mixedbread products if available
    if (includeMixedbread && mixedbreadProducts.length > 0) {
      allProducts = [...allProducts, ...mixedbreadProducts];
    }

    // Filter by category
    if (category) {
      allProducts = allProducts.filter((p) => p.category === category);
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      allProducts = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    return allProducts;
  }, [mixedbreadProducts, category, search, includeMixedbread]);

  return {
    products: mergedProducts,
    isLoading: includeMixedbread ? isMixedbreadLoading : false,
    error: mixedbreadError,
    hardcodedCount: hardcodedProducts.length,
    mixedbreadCount: mixedbreadProducts.length,
    totalCount: mergedProducts.length,
  };
}
