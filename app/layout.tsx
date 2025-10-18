import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopHub - Quality Products at Great Prices',
  description: 'Discover amazing products across electronics, clothing, books, and home goods. Fast shipping and excellent customer service.',
  keywords: 'ecommerce, shopping, electronics, clothing, books, home goods',
  authors: [{ name: 'ShopHub' }],
  openGraph: {
    title: 'ShopHub - Quality Products at Great Prices',
    description: 'Discover amazing products across electronics, clothing, books, and home goods.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
