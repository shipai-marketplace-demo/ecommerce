import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'Shipping Information | ShopHub',
  description: 'Learn about our shipping options, delivery times, and rates.',
};

export default function ShippingPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-xl text-primary-100">
            Fast, reliable delivery to your doorstep
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Shipping Rates</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Standard Shipping</h3>
                  <p className="text-gray-600 mb-1">$9.99 - Orders under $50</p>
                  <p className="text-gray-600 mb-1">$5.99 - Orders $50-$100</p>
                  <p className="text-green-600 font-semibold">FREE - Orders over $100</p>
                  <p className="text-sm text-gray-500 mt-2">Estimated delivery: 5-7 business days</p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Express Shipping</h3>
                  <p className="text-gray-600 mb-1">$19.99 - Orders under $100</p>
                  <p className="text-gray-600">$14.99 - Orders over $100</p>
                  <p className="text-sm text-gray-500 mt-2">Estimated delivery: 2-3 business days</p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Overnight Shipping</h3>
                  <p className="text-gray-600">$29.99 - All orders</p>
                  <p className="text-sm text-gray-500 mt-2">Estimated delivery: 1 business day</p>
                  <p className="text-sm text-gray-500">Order by 2 PM EST for next-day delivery</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Processing Time</h3>
                  <p className="text-gray-600">
                    Orders are typically processed within 1-2 business days. You&apos;ll receive a confirmation email once your order ships.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Tracking Your Order</h3>
                  <p className="text-gray-600">
                    Once shipped, you&apos;ll receive a tracking number via email. Track your package in real-time through our carrier partners.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Delivery Areas</h3>
                  <p className="text-gray-600">
                    We currently ship to all 50 US states and territories. International shipping coming soon!
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Shipping Restrictions</h3>
                  <p className="text-gray-600">
                    Some items cannot be shipped to PO boxes or APO/FPO addresses. Restrictions will be noted on product pages.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-primary-50">
            <h2 className="text-2xl font-bold mb-4">Shipping FAQs</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Can I change my shipping address after placing an order?</h3>
                <p className="text-gray-600">
                  If your order hasn&apos;t shipped yet, we can update the address. Contact customer service immediately with your order number.
                </p>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">What if I&apos;m not home for delivery?</h3>
                <p className="text-gray-600">
                  The carrier will leave a notice with instructions for redelivery or pickup. Most packages can be held at a local facility.
                </p>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">Do you offer weekend delivery?</h3>
                <p className="text-gray-600">
                  Weekend delivery is available for Express and Overnight shipping options in select areas. Standard shipping typically delivers Monday-Friday.
                </p>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">What carriers do you use?</h3>
                <p className="text-gray-600">
                  We partner with UPS, FedEx, and USPS to ensure reliable delivery. The carrier is selected based on your location and shipping method.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
}
