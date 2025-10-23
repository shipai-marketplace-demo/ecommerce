import useSWR from 'swr';
import type { MixedbreadSearchResponse, Product } from '@/types';
import { mixedbreadResultsToProducts } from '@/lib/utils/mixedbread';

const fetcher = async (url: string): Promise<MixedbreadSearchResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch from Mixedbread');
  }
  return res.json();
};

interface UseMixedbreadProductsOptions {
  enabled?: boolean;
  query?: string;
}

/**
 * Hook to fetch products from Mixedbread store
 */
export function useMixedbreadProducts(options: UseMixedbreadProductsOptions = {}) {
  const { enabled = true, query = '' } = options;

  const { data, error, isLoading } = useSWR<MixedbreadSearchResponse>(
    enabled ? `/api/mixedbread-search?q=${encodeURIComponent(query)}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
      // Don't retry on error (API key might not be configured)
      shouldRetryOnError: false,
    }
  );

  const products: Product[] = data?.results ? mixedbreadResultsToProducts(data.results) : [];

  return {
    products,
    isLoading,
    error,
    isConfigured: !error || error.message !== 'Failed to fetch from Mixedbread',
  };
}
