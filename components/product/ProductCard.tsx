import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils/format';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card hover className="h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform hover:scale-105"
          />
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-2 right-2">
              <Badge variant="warning">Low Stock</Badge>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-2 right-2">
              <Badge variant="error">Out of Stock</Badge>
            </div>
          )}
          {product.featured && product.stock > 0 && (
            <div className="absolute top-2 left-2">
              <Badge variant="info">Featured</Badge>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.rating && (
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-yellow-400 fill-current mr-1"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span>{product.rating}</span>
                {product.reviews && (
                  <span className="ml-1">({product.reviews})</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
