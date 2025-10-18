import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="py-16">
      <Container size="md">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">Browse Products</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
