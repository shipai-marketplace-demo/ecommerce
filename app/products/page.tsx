import { Metadata } from 'next';
import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { ProductsPageContent } from '@/components/product/ProductsPageContent';

export const metadata: Metadata = {
  title: 'All Products - ShopHub',
  description: 'Browse our complete collection of products across all categories, including items from Mixedbread.',
};

export default function ProductsPage() {
  return (
    <div className="py-8">
      <Container>
        <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
          <ProductsPageContent />
        </Suspense>
      </Container>
    </div>
  );
}
