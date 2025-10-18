'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [orderId] = useState(() =>
    `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
  );

  useEffect(() => {
    const data = sessionStorage.getItem('lastOrder');
    if (!data) {
      router.push('/');
      return;
    }
    setOrderData(JSON.parse(data));
    sessionStorage.removeItem('lastOrder');
  }, [router]);

  if (!orderData) {
    return null;
  }

  return (
    <div className="py-16">
      <Container size="md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We&apos;ve received it and will process it shortly.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Details</h2>
            <p className="text-gray-600">
              Order Number: <span className="font-mono font-bold">{orderId}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              A confirmation email has been sent to {orderData.email}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Shipping Address</h3>
              <p className="text-gray-600">
                {orderData.firstName} {orderData.lastName}<br />
                {orderData.address}<br />
                {orderData.city}, {orderData.state} {orderData.zipCode}<br />
                {orderData.country}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Contact Information</h3>
              <p className="text-gray-600">
                Email: {orderData.email}<br />
                Phone: {orderData.phone}
              </p>
            </div>
          </div>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">What&apos;s Next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You&apos;ll receive an order confirmation email shortly</li>
                <li>• We&apos;ll send you shipping updates via email</li>
                <li>• Estimated delivery: 3-5 business days</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/products" className="flex-1">
            <Button fullWidth variant="outline">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button fullWidth>
              Back to Home
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
