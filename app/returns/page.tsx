import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'Returns & Exchanges | ShopHub',
  description: 'Learn about our hassle-free return and exchange policy.',
};

export default function ReturnsPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Returns &amp; Exchanges</h1>
          <p className="text-xl text-primary-100">
            We want you to love your purchase - hassle-free returns within 30 days
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">30-Day Return Window</h3>
                  <p className="text-gray-600">
                    You have 30 days from the date of delivery to return most items for a full refund. Items must be unused and in original packaging.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Free Return Shipping</h3>
                  <p className="text-gray-600">
                    Returns are free for all orders over $50. For orders under $50, a $6.99 return shipping fee will be deducted from your refund.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Refund Processing</h3>
                  <p className="text-gray-600">
                    Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Non-Returnable Items</h3>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    <li>Opened software or digital products</li>
                    <li>Personal care items (opened)</li>
                    <li>Final sale items</li>
                    <li>Gift cards</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">How to Return an Item</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-start mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Initiate Your Return</h3>
                      <p className="text-gray-600 text-sm">
                        Log into your account and go to Order History. Select the item(s) you want to return and the reason.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Print Your Return Label</h3>
                      <p className="text-gray-600 text-sm">
                        You&apos;ll receive a prepaid return shipping label via email. Print it out or show it at a carrier location.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Pack Your Item</h3>
                      <p className="text-gray-600 text-sm">
                        Securely pack the item in its original packaging if possible. Include all accessories and documentation.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Ship Your Return</h3>
                      <p className="text-gray-600 text-sm">
                        Drop off your package at any UPS, FedEx, or USPS location. Keep your receipt as proof of shipment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">How Exchanges Work</h3>
                  <p className="text-gray-600">
                    Want a different size or color? We make it easy! Simply return your original item and place a new order for the item you want.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Price Adjustments</h3>
                  <p className="text-gray-600">
                    If the item you want is now on sale, you&apos;ll pay the current price. If it&apos;s more expensive, you&apos;ll only pay the difference.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Defective Items</h3>
                  <p className="text-gray-600">
                    Received a damaged or defective item? Contact us immediately. We&apos;ll expedite a replacement at no extra charge.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary-50">
              <h2 className="text-2xl font-bold mb-4">Return FAQs</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I return a gift?</h3>
                  <p className="text-gray-600">
                    Yes! Gift recipients can return items for store credit. Original purchase receipts are not required.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">What if I lost my packing slip?</h3>
                  <p className="text-gray-600">
                    No problem! Just include a note with your order number and email address. You can also initiate the return online.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-2">Can I return sale items?</h3>
                  <p className="text-gray-600">
                    Yes, most sale items can be returned within 30 days. Items marked as &quot;Final Sale&quot; cannot be returned.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-gray-50 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Our customer service team is here to help with any return or exchange inquiries.
            </p>
            <p className="text-gray-600">
              Email: <span className="font-semibold text-primary-600">returns@shophub.com</span>
              <br />
              Phone: <span className="font-semibold text-primary-600">1-800-SHOP-HUB</span>
              <br />
              Hours: Monday-Friday, 9AM-6PM EST
            </p>
          </Card>
        </Container>
      </section>
    </main>
  );
}
