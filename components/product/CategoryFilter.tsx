'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/lib/data/products';
import { Button } from '@/components/ui/Button';

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategoryChange = (category: string | null) => {
    if (category) {
      router.push(`/products?category=${category}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!selectedCategory ? 'primary' : 'outline'}
        size="sm"
        onClick={() => handleCategoryChange(null)}
      >
        All Products
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handleCategoryChange(category.id)}
        >
          {category.name} ({category.count})
        </Button>
      ))}
    </div>
  );
}
