import type { MixedbreadSearchChunk, Product } from '@/types';

/**
 * Convert a Mixedbread search result to our Product format
 */
export function mixedbreadToProduct(chunk: MixedbreadSearchChunk, index: number): Product {
  const metadata = chunk.metadata || chunk.generated_metadata || {};

  return {
    id: `mixedbread-${metadata.filename || index}`,
    name: metadata.name || 'Unknown Product',
    description: metadata.description || metadata.notable_details || 'No description available',
    price: metadata.price || 0,
    image: chunk.image_url?.url || '/placeholder-product.jpg',
    category: 'clothing', // All Mixedbread products are clothing
    stock: 100, // Assume in stock
    featured: false,
    rating: 4.5, // Default rating
    reviews: 0,
  };
}

/**
 * Convert array of Mixedbread search results to Products
 */
export function mixedbreadResultsToProducts(results: MixedbreadSearchChunk[]): Product[] {
  return results.map((chunk, index) => mixedbreadToProduct(chunk, index));
}
