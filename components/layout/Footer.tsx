import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-white text-lg font-bold mb-4">ShopHub</h3>
            <p className="text-sm">
              Your one-stop destination for quality products at great prices.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=electronics"
                  className="hover:text-white transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=clothing"
                  className="hover:text-white transition-colors"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=books"
                  className="hover:text-white transition-colors"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=home-garden"
                  className="hover:text-white transition-colors"
                >
                  Home & Garden
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 text-sm text-center">
          <p>&copy; {currentYear} ShopHub. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
